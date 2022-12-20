const supertest = require('supertest');
const {getKnex, tables} = require("../../src/data");
const {withServer} = require('../helpers');

const data = {
  teams: [
    {
      teamId: 7,
      naam: 'Test team 7',
      clubId: 7
    },
    {
      teamId: 8,
      naam: 'Test team 8',
      clubId: 8
    }
  ],
  clubs: [
    {
      clubId: 7,
      naam: 'Test club 7',
      hoofdsponsor: 'Amon',
      voorzitter: 'papa Gentson',
      locatie: 'Henleykaai 83, Gent'
    },
    {
      clubId: 8,
      naam: 'Test club 8',
      hoofdsponsor: 'Tegels',
      voorzitter: 'papa Donza',
      locatie: 'OCP, Deinze'
    }
  ],
  games: [
    {
      gameId: 1,
      locatie: 'Henleykaai, Gent',
      thuisTeamId: 7,
      uitTeamId: 8,
      scoreThuis: 99,
      scoreUit: 55,
      datum: new Date(2022, 5, 12)
    }
  ]
};

const dataToDelete = {
  teams: [7, 8],
  clubs: [7, 8],
  games: [1]
};

describe('games', () => {
  let request;
  let knex;
  let authHeader;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = '/api/games';

  describe('GET /api/games', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert(data.teams);
      await knex(tables.game).insert(data.games);
    });

    afterAll(async () => {
      await knex(tables.game).whereIn('gameId', dataToDelete.games).delete();
      await knex(tables.team).whereIn('teamId', dataToDelete.teams).delete();
      await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
    });

    it('should return 200 and return all games', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(1);
    });
  });
  describe('GET /api/games/:id', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert(data.teams);
      await knex(tables.game).insert(data.games[0]);
    });

    afterAll(async () => {
      await knex(tables.game).where('gameId', dataToDelete.games[0]).delete();
      await knex(tables.team).whereIn('teamId', dataToDelete.teams).delete();
      await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
    });

    it('it should return 200 and return the requested game', async () => {
      const response = await request.get(`${url}/${data.games[0].gameId}`)
      .set('Authorization', authHeader);
      expect(response.status).toBe(200);
    });
  });

  describe('POST /api/games', () => {
    const gamesToDelete = [];

    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert(data.teams);
    });

    afterAll(async () => {
      await knex(tables.game)
        .whereIn('gameId', gamesToDelete)
        .delete();
      await knex(tables.team)
        .whereIn('teamId', dataToDelete.teams)
        .delete();

      await knex(tables.club)
        .whereIn('clubId', dataToDelete.clubs)
        .delete();
    });

    it('should return 201 and return the newly created game', async () => {
      const response = await request.post(url)
      .set('Authorization', authHeader)
      .send({
        locatie: 'OCP, Deinze',
        thuisTeamId: 8,
        uitTeamId: 7,
        scoreThuis: 99,
        scoreUit: 55,
        datum: '2022-05-12T13:00:00.000Z'
      });

      expect(response.status).toBe(201);
      expect(response.body.gameId).toBeTruthy();
      expect(response.body.locatie).toBe('OCP, Deinze');
      expect(response.body.scoreThuis).toBe(99);
      expect(response.body.scoreUit).toBe(55);
      gamesToDelete.push(response.body.gameId);
    });
  });

  describe('PUT /api/games/:id', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert(data.teams);
      await knex(tables.game).insert([{
        gameId: 2,
        locatie: 'OCP, Deinze',
        thuisTeamId: 8,
        uitTeamId: 7,
        scoreThuis: 99,
        scoreUit: 55,
        datum: new Date(2022, 5, 12)
      }]);
    });

      afterAll(async () => {
        await knex(tables.game).where('gameId', 2).delete();
        await knex(tables.team).whereIn('teamId', dataToDelete.teams).delete();
        await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
      });

      it('should return 200 and return the updated game', async () => {
        const response = await request.put(`${url}/2`)
        .set('Authorization', authHeader)
        .send({
          locatie: 'OCP, Deinze',
          thuisTeamId: 8,
          uitTeamId: 7,
          scoreThuis: 40,
          scoreUit: 55,
          datum: '2022-05-12T13:00:00.000Z'
        });

        expect(response.status).toBe(200);
        expect(response.body.gameId).toBeTruthy();
        expect(response.body.locatie).toBe('OCP, Deinze');
        expect(response.body.scoreThuis).toBe(40);
        expect(response.body.scoreUit).toBe(55);
      });
    });

  describe('DELETE /api/games/:id', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert(data.teams);
      await knex(tables.game).insert([{
        gameId: 2,
        locatie: 'OCP, Deinze',
        thuisTeamId: 7,
        uitTeamId: 8,
        scoreThuis: 99,
        scoreUit: 55,
        datum: new Date(2022, 12, 5)
      }]);
    });

      afterAll(async () => {
        await knex(tables.team).whereIn('teamId', dataToDelete.teams).delete();
        await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
      });

      it('should respond 204 and return nothing', async () => {
        const response = await request.delete(`${url}/2`).set('Authorization', authHeader);
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
      });
  });
});