const createServer = require("../../src/createServer");
const supertest = require('supertest');
const {getKnex, tables} = require("../../src/data");

const data = {
  spelers: [
    {
      spelerId: 1, 
    naam: 'Maxime Coens', 
    gewicht: 73.2, 
    lengte: 183, 
    positie: 'shooting guard', 
    geboortedatum: new Date(2002, 8, 27),
    teamId: 1
    },
    {
      spelerId: 2, 
		naam: 'Aiko Delbaere', 
		gewicht: 79, 
		lengte: 194, 
		positie: 'guard', 
		geboortedatum: new Date(2002, 5, 16), 
    teamId: 1
    },
    {
      spelerId: 3, 
    naam: 'Ivan Sugira', 
    gewicht: 83, 
    lengte: 183, 
    positie: 'forward', 
    geboortedatum: new Date(2002, 2, 18),
    teamId: 2
    }
  ],
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
  spelers: [1, 2, 3],
  teams: [1, 2],
  clubs: [1, 2]
};

describe('spelers', () => {
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

  const url = '/api/spelers';

  describe('GET /api/spelers', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert(data.teams);
      await knex(tables.speler).insert(data.spelers);
    });

    afterAll(async () => {
      await knex(tables.speler).whereIn('spelerId', dataToDelete.spelers).delete();
      await knex(tables.team).whereIn('teamId', dataToDelete.teams).delete();
      await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
    });

    it('should return 200 and return all players', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(3);
    });
  });
  describe('GET /api/spelers/:id', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert(data.teams);
      await knex(tables.speler).insert(data.spelers[0]);
    });

    afterAll(async () => {
      await knex(tables.speler).whereIn('spelerId', dataToDelete.spelers[0]).delete();
      await knex(tables.team).whereIn('teamId', dataToDelete.teams).delete();
      await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
    });

    it('it should return 200 and return the requested player', async () => {
      const response = await request.get(`${url}/${data.spelers[0].spelerId}`);
      expect(response.status).toBe(200);
    });
  });

  describe('POST /api/spelers', () => {
    const spelersToDelete = [];

    beforeAll(async () => {
      await knex(tables.team).insert(data.teams);
      await knex(tables.club).insert(data.clubs);
    });

    afterAll(async () => {
      await knex(tables.speler)
        .whereIn('spelerId', spelersToDelete)
        .delete();
      await knex(tables.team)
        .whereIn('teamId', dataToDelete.teams)
        .delete();

      await knex(tables.club)
        .whereIn('clubId', dataToDelete.clubs)
        .delete();
    });

    it('should return 201 and return the newly created player', async () => {
      const response = await request.post(url)
      .send({ 
        naam: 'Test Player', 
        gewicht: 73.2, 
        lengte: 183, 
        positie: 'shooting guard', 
        geboortedatum: new Date(2002, 8, 27),
        teamId: 1
      });

      expect(response.status).toBe(201);
      expect(response.body.teamId).toBeTruthy();
      expect(response.body.naam).toBe('Test Player');
      expect(response.body.gewicht).toBe(73.2);
      expect(response.body.lengte).toBe(183);
      expect(response.body.positie).toBe('shooting guard');
      // kijken voor object team to equal
      spelersToDelete.push(response.body.spelerId);
    });
  });

  describe('PUT /api/spelers/:id', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert(data.teams);
      await knex(tables.speler).insert([{
        spelerId: 4, 
        naam: 'Test Player', 
        gewicht: 73.2, 
        lengte: 183, 
        positie: 'shooting guard', 
        geboortedatum: new Date(2002, 8, 27),
        teamId: 1
      }]);
    });

      afterAll(async () => {
        await knex(tables.speler).where('spelerId', 4).delete();
        await knex(tables.team).whereIn('teamId', dataToDelete.teams).delete();
        await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
      });

      it('should return 200 and return the updated speler', async () => {
        const response = await request.put(`${url}/4`).send({
        naam: 'Test Player 2', 
        gewicht: 73.2, 
        lengte: 183, 
        positie: 'shooting guard', 
        geboortedatum: new Date(2002, 8, 27),
        teamId: 1
        });

        expect(response.status).toBe(200);
      expect(response.body.teamId).toBeTruthy();
      expect(response.body.gewicht).toBe(73.2);
      expect(response.body.lengte).toBe(183);
      expect(response.body.positie).toBe('shooting guard');
        expect(response.body.naam).toBe("Test Player 2");
        expect(response.body.team).toEqual({
          teamId: 1,
          naam: 'Amon Jeugd Gentson U21',
          clubId: 1
        });
      });
    });

  describe('DELETE /api/spelers/:id', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert(data.teams);
      await knex(tables.speler).insert([{
        spelerId: 4, 
        naam: 'Test Player', 
        gewicht: 73.2, 
        lengte: 183, 
        positie: 'shooting guard', 
        geboortedatum: new Date(2002, 8, 27),
        teamId: 1
      }]);
    });

      afterAll(async () => {
        await knex(tables.team).whereIn('teamId', dataToDelete.teams).delete();
        await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
      });

      it('should respond 204 and return nothing', async () => {
        const response = await request.delete(`${url}/4`);
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
      });
  });
});
