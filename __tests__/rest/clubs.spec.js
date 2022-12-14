const createServer = require("../../src/createServer");
const supertest = require('supertest');
const {getKnex, tables} = require("../../src/data");

const data = {
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
  clubs: [1, 2]
};

describe('clubs', () => {
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

  const url = '/api/clubs'
  describe('GET /api/clubs', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
    });

    afterAll(async () => {
      await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
    }); 
    it('should return 200 and all clubs', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(2);
      expect(response.body.items[1]).toEqual({
        clubId: 2,
      naam: 'LDP Donza',
      hoofdsponsor: 'Tegels',
      voorzitter: 'papa Donza',
      locatie: 'OCP, Deinze',
      kampioenschappen: null
      });
    });
  });

  describe('GET /api/clubs/:id', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs[0]);
    });

    afterAll(async () => {
      await knex(tables.club).where('clubId', data.clubs[0].clubId).delete();
    });

    it('it should return 200 and return the requested club', async () => {
      const response = await request.get(`${url}/${data.clubs[0].clubId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(data.clubs[0]);
    });
  });

  describe('POST /api/clubs', () => {
    let clubsToDelete = [];

    afterAll(async () => {
      // delete alles in db
      await knex(tables.club).whereIn('clubId', clubsToDelete).delete();
    });

    it('should return 201 and the newly created club', async () => {
      const response = await request.post(url).send({
        clubId: 3,
        naam: "Antwerp Giants",
        voorzitter: "Filou",
        hoofdsponsor: "Filou",
        locatie: 'Antwerpen'
      });
      expect(response.status).toBe(201);
      expect(response.body.clubId).toBeTruthy();
      expect(response.body.naam).toBe('Antwerp Giants');
      expect(response.body.hoofdsponsor).toBe('Filou');
      expect(response.body.voorzitter).toBe('Filou');
      expect(response.body.locatie).toBe('Antwerpen');
      
      clubsToDelete.push(response.body.clubId);
    });
  });

  describe('PUT /api/clubs/:id', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs);
    });

    afterAll(async () => {
      await knex(tables.club).whereIn('clubId', dataToDelete.clubs).delete();
    });

    it('it should return 200 and return the updated club', async () => {
      const response = await request.put(`${url}/${data.clubs[0].clubId}`)
      .send({
        naam: "Changed name",
        locatie: "Changed location",
        voorzitter: "Changed voorzitter",
        hoofdsponsor: "Changed hoofdsponsor"
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        clubId: data.clubs[0].clubId,
        naam: "Changed name",
        locatie: "Changed location",
        voorzitter: "Changed voorzitter",
        hoofdsponsor: "Changed hoofdsponsor"
      });
    });
  });

  describe('DELETE /api/clubs/:id', () => {
    beforeAll(async () => {
      await knex(tables.club).insert(data.clubs[0]);
    });

    it('it should return 204 and return nothing', async () => {
      const response = await request.delete(`${url}/${data.clubs[0].clubId}`);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});