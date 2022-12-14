const createServer = require("../../src/createServer");
const supertest = require('supertest');
const {getKnex, tables} = require("../../src/data");

const data = {
  teams: [
    {
      teamId: 1,
      naam: 'Amon Jeugd Gentson U21',
      clubId: 1
    },
    {
      teamId: 2,
      naam: 'LDP Donza U21',
      clubId: 2
    }
  ],
  clubs: [
    {
      clubId: 1,
      naam: 'Amon jeugd Gentson',
      hoofdsponsor: 'Amon',
      voorzitter: 'papa Gentson',
      locatie: 'Henleykaai 83, Gent'
    },
    {
      clubId: 2,
      naam: 'LDP Donza',
      hoofdsponsor: 'Tegels',
      voorzitter: 'papa Donza',
      locatie: 'OCP, Deinze'
    }
  ]
};

const dataToDelete = {
  teams: [1, 2],
  clubs: [1, 2]
};

describe('teams', () => {
  let server;
  let request;
  let knex;

  beforeAll(async () => {
    server = await createServer();
    request = supertest(server.getApp().callback()); // callback zorgt voor request te kunnen sturen
    knex = getKnex();
  });

  afterAll(async () => {
    await server.stop();
  });

  const url = '/api/teams';

  describe('GET /api/teams', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert(data.teams);
    });

    afterAll(async () => {
      await knex(tables.team).whereIn('teamId', dataToDelete.teams).delete();
      await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
    });

    it('should return 200 and return all teams', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(2);
      expect(response.body.items[1]).toEqual({
        teamId: 2,
      naam: 'LDP Donza U21',
      clubnaam: 'LDP Donza', // door in repository/team => select statement ook met clubnaam
      clubId: 2
      });
      
    });
  });
  describe('GET /api/teams/:id', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert(data.teams[0]);
    });

    afterAll(async () => {
      await knex(tables.team).whereIn('teamId', dataToDelete.teams[0]).delete();
      await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
    });

    it('it should return 200 and return the requested team', async () => {
      const response = await request.get(`${url}/${data.teams[0].teamId}`);
      expect(response.status).toBe(200);
    });
  });

  describe('POST /api/teams', () => {
    const teamsToDelete = [];

    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
    });

    afterAll(async () => {
      await knex(tables.team)
        .whereIn('teamId', teamsToDelete)
        .delete();

      await knex(tables.club)
        .whereIn('clubId', dataToDelete.clubs)
        .delete();
    });

    it('should return 201 and return the newly created team', async () => {
      const response = await request.post(url)
      .send({
      naam: 'Amon Jeugd Gentson U18',
      clubId: 1
      });

      expect(response.status).toBe(201);
      expect(response.body.teamId).toBeTruthy();
      expect(response.body.naam).toBe('Amon Jeugd Gentson U18');
      expect(response.body.place).toEqual({
        clubId: 1,
      naam: 'Amon jeugd Gentson',
      hoofdsponsor: 'Amon',
      voorzitter: 'papa Gentson',
      locatie: 'Henleykaai 83, Gent'
      });
      teamsToDelete.push(response.body.teamId);
    });
  });

  describe('PUT /api/teams/:id', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert([{
        teamId: 3,
        naam: "Amon Jeugd Gentson Heren A",
        clubId: 1
      }]);
    });

      afterAll(async () => {
        await knex(tables.team).where('teamId', 3).delete();
        await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
      });

      it('should return 200 and return the updated team', async () => {
        const response = await request.put(`${url}/3`).send({
          teamId: 3,
          naam: "Amon Jeugd Gentson Heren B",
          clubId: 1
        });

        expect(response.status).toBe(200);
        expect(response.body.teamId).toBeTruthy();
        expect(response.body.naam).toBe("Amon Jeugd Gentson Heren B");
        expect(response.body.club).toEqual({
          clubId: 1,
          naam: 'Amon jeugd Gentson',
          hoofdsponsor: 'Amon',
          voorzitter: 'papa Gentson',
          locatie: 'Henleykaai 83, Gent'
        });
      });
    });

  describe('DELETE /api/teams/:id', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);

      await knex(tables.team).insert([{
        teamId: 3,
        naam: "Amon Jeugd Gentson Heren C",
        clubId: 1
      }]);
    });

      afterAll(async () => {
        await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
      });

      it('should respond 204 and return nothing', async () => {
        const response = await request.delete(`${url}/3`);
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
      });
  });
});