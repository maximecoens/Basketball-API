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
    geboortedatum: '2002-08-27',
    teamId: 1
  },
  {
		spelerId: 2, 
		naam: 'Aiko Delbaere', 
		gewicht: 79, 
		lengte: 194, 
		positie: 'guard', 
		geboortedatum: '2002-05-16', 
    teamId: 1
  },
  {
    spelerId: 3, 
    naam: 'Ivan Sugira', 
    gewicht: 83, 
    lengte: 183, 
    positie: 'forward', 
    geboortedatum: '2002-05-08',
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
],
games: [
  {
    gameId: 1,
    locatie: 'Henleykaai, Gent',
    thuisTeamId: 1,
    uitTeamId: 2,
    scoreThuis: 99,
    scoreUit: 55,
    datum: '2022-05-08'
  }
]
};

const dataToDelete = {
  clubs: [1, 2],
  teams: [1, 2],
  spelers: [1, 2, 3],
  games: [1]
};

describe('clubs', () => {
  let server;
  let request;
  let knex;
  beforeAll(async () => {
    server = await createServer();
    request = supertest(server.getApp().callback()); // callback zorgt voor request te kunnen sturen
    knex = getKnex();
  })

  afterAll(async () => {
    await server.stop();
  })

  const url = '/api/clubs'
  describe('GET /api/clubs', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
      await knex(tables.team).insert(data.teams);
      await knex(tables.speler).insert(data.spelers);
      await knex(tables.game).insert(data.games);
    })

    afterAll(async () => {
      await knex(tables.game).whereIn('gameId', dataToDelete.games).delete();
      await knex(tables.speler).whereIn('spelerId', dataToDelete.spelers).delete();
      await knex(tables.team).whereIn('teamId', dataToDelete.teams).delete();
      await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
    }) 
    it('should return 200 and all clubs', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(2);
    });
  })
});