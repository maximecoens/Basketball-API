const supertest = require('supertest');
const {getKnex, tables} = require("../../src/data");
const {withServer} = require('../helpers');


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
  let request;
  let knex;
  let authHeader;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
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
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBeGreaterThanOrEqual(2);
      expect(response.body.items[0]).toEqual({
        clubId: 1,
        naam: 'Amon jeugd Gentson',
        hoofdsponsor: 'Amon',
        voorzitter: 'papa Gentson',
        locatie: 'Henleykaai 83, Gent',
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
      const response = await request.get(`${url}/${data.clubs[0].clubId}`)
      .set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(data.clubs[0]);
    });
  });

  describe('POST /api/clubs', () => {
    let clubsToDelete = [];

    afterAll(async () => {
      await knex(tables.club).whereIn('clubId', clubsToDelete).delete();
    });

    it('should return 201 and the newly created club', async () => {
      const response = await request.post(url)
      .set('Authorization', authHeader)
      .send({
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
      .set('Authorization', authHeader)
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
      const response = await request.delete(`${url}/${data.clubs[0].clubId}`)
      .set('Authorization', authHeader);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});