module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('games').delete();

		// then add the fresh places
		await knex('games').insert([
		{gameId: 1, locatie: 'Henleykaai 83, Gent', scoreThuis: 99, scoreUit: 54, datum: '2022-11-05', thuisTeamId: 1, uitTeamId: 2}
	]);
	},
};