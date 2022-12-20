const supertest = require('supertest');
const {getKnex, tables} = require("../../src/data");
const {withServer} = require('../helpers');
const { config } = require('config');

const data = {
  spelers: [
    {
      spelerId: 1, 
    naam: config.get('auth.testUser.username'), 
    gewicht: 73.2, 
    lengte: 183, 
    positie: 'shooting guard', 
    geboortedatum: new Date(2002, 8, 27),
    teamId: 5,
    auth0id: config.get('auth.testUser.spelerId')
    },
    {
      spelerId: 2, 
		naam: 'Aiko Delbaere', 
		gewicht: 79, 
		lengte: 194, 
		positie: 'guard', 
		geboortedatum: new Date(2002, 5, 16), 
    teamId: 5
    },
    {
      spelerId: 3, 
    naam: 'Ivan Sugira', 
    gewicht: 83, 
    lengte: 183, 
    positie: 'forward', 
    geboortedatum: new Date(2002, 2, 18),
    teamId: 6
    }
  ],
  teams: [
    {
      teamId: 5,
      naam: 'Test Team 5',
      clubId: 5
    },
    {
      teamId: 6,
      naam: 'Test Team 6',
      clubId: 6
    }
  ],
  clubs: [
    {
      clubId: 5,
      naam: 'Test Club 5',
      hoofdsponsor: 'Amon',
      voorzitter: 'papa Gentson',
      locatie: 'Henleykaai 83, Gent'
    },
    {
      clubId: 6,
      naam: 'Test Club 6',
      hoofdsponsor: 'Tegels',
      voorzitter: 'papa Donza',
      locatie: 'OCP, Deinze'
    }
  ]
};

const dataToDelete = {
  spelers: [1, 2, 3],
  teams: [5, 6],
  clubs: [5, 6]
};

describe('spelers', () => {
  let request;
  let knex;
  let authHeader;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
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
      const response = await request.get(url).set('Authorization', authHeader);
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
      await knex(tables.speler).where('spelerId', dataToDelete.spelers[0]).delete();
      await knex(tables.team).whereIn('teamId', dataToDelete.teams).delete();
      await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
    });

    it('it should return 200 and return the requested player', async () => {
      const response = await request.get(`${url}/${data.spelers[0].spelerId}`)
      .set('Authorization', authHeader);
      expect(response.status).toBe(200);
    });
  });

  describe('POST /api/spelers', () => {
    const spelersToDelete = [];

    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert(data.teams);
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
      .set('Authorization', authHeader)
      .send({ 
        naam: 'Test Player', 
        gewicht: 73.2, 
        lengte: 183, 
        positie: 'shooting guard', 
        geboortedatum: new Date(2002, 8, 27),
        teamId: 5
      });

      expect(response.status).toBe(201);
      expect(response.body.spelerId).toBeTruthy();
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
        spelerId: 5, 
        naam: 'Test Player 5', 
        gewicht: 73.2, 
        lengte: 183, 
        positie: 'shooting guard', 
        geboortedatum: new Date(2002, 8, 27),
        teamId: 5
      }]);
    });

      afterAll(async () => {
        await knex(tables.speler).where('spelerId', 5).delete();
        await knex(tables.team).whereIn('teamId', dataToDelete.teams).delete();
        await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
      });

      it('should return 200 and return the updated speler', async () => {
        const response = await request.put(`${url}/5`)
        .set('Authorization', authHeader)
        .send({
        naam: 'Test Player 5.1', 
        gewicht: 73.2, 
        lengte: 183, 
        positie: 'shooting guard', 
        geboortedatum: new Date(2002, 8, 27),
        teamId: 5
        });

        expect(response.status).toBe(200);
      expect(response.body.spelerId).toBeTruthy();
      expect(response.body.gewicht).toBe(73.2);
      expect(response.body.lengte).toBe(183);
      expect(response.body.positie).toBe('shooting guard');
        expect(response.body.naam).toBe("Test Player 5.1");
        expect(response.body.team).toEqual({
          teamId: 5,
          naam: 'Test Team 5'
        });
      });
    });

  describe('DELETE /api/spelers/:id', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert(data.teams);
      await knex(tables.speler).insert([{
        spelerId: 6, 
        naam: 'Test Player 6', 
        gewicht: 73.2, 
        lengte: 183, 
        positie: 'shooting guard', 
        geboortedatum: new Date(2002, 8, 27),
        teamId: 5
      }]);
    });

      afterAll(async () => {
        await knex(tables.team).whereIn('teamId', dataToDelete.teams).delete();
        await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
      });

      it('should respond 204 and return nothing', async () => {
        const response = await request.delete(`${url}/6`).set('Authorization', authHeader);
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
      });
  });
});