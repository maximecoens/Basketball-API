module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('clubs').delete();

		// then add the fresh places
		await knex('clubs').insert([
		{clubId: 1, naam: 'Amon jeugd Gentson', hoofdsponsor: 'Amon', voorzitter: 'papa Gentson', locatie: 'Henleykaai 83, Gent'},
		{clubId: 2, naam: 'LDP Donza', hoofdsponsor: 'Tegels Kristoff', voorzitter: 'papa Donza', locatie: 'OCP Deinze'}
	]);
	},
};