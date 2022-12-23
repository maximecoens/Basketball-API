module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('teams').delete();

		await knex('teams').insert([
		{teamId: 1, naam: 'Amon jeugd Gentson U21', clubId: 1},
    {teamId: 2, naam: 'LDP Donza U21', clubId: 2}
	]);
	},
};