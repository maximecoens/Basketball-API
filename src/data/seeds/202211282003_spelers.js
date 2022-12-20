module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('spelers').delete();

		// then add the fresh places
		await knex('spelers').insert([
		{spelerId: 1, naam: 'Maxime Coens', gewicht: 73.4, lengte: 183, positie: 'shooting guard', geboortedatum: '2002-08-27', teamId: 1, auth0id: 'auth0|63a0e0751568a9f370017b19'},
    {spelerId: 2, naam: 'Aiko Delbaere', gewicht: 80.4, lengte: 194, positie: 'guard', geboortedatum: '2002-05-09', teamId: 1, auth0id: 'unknown'},
    {spelerId: 3, naam: 'Han Stockman', gewicht: 81, lengte: 199, positie: 'forward', geboortedatum: '2002-01-20', teamId: 1, auth0id: 'unknown'},
    {spelerId: 4, naam: 'Ivan Sugira', gewicht: 86.4, lengte: 182, positie: 'forward', geboortedatum: '2002-02-14', teamId: 2, auth0id: 'unknown'}
	]);
	},
};