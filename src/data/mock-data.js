let SPELERS = [
  {
    spelerId: 1, 
    naam: 'Maxime Coens', 
    gewicht: 73.2, 
    lengte: 183, 
    positie: 'shooting guard', 
    geboortedatum: '2002-08-27T00:00:00.000Z',
    teamId: 1
  },
  {
		spelerId: 2, 
		naam: 'Aiko Delbaere', 
		gewicht: 79, 
		lengte: 194, 
		positie: 'guard', 
		geboortedatum: '2002-05-16T00:00:00.000Z', 
    teamId: 1
  },
  {
    spelerId: 3, 
    naam: 'Ivan Sugira', 
    gewicht: 83, 
    lengte: 183, 
    positie: 'forward', 
    geboortedatum: '2002-05-08T00:00:00.000Z',
    teamId: 2
  }
];

let TEAMS = [
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
];

let CLUBS = [
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
];

let GAMES = [
  {
    gameId: 1,
    locatie: 'Henleykaai, Gent',
    thuisTeamId: 1,
    uitTeamId: 2,
    scoreThuis: 99,
    scoreUit: 55,
    datum: '2022-05-08T00:00:00.000Z'
  }
];

module.exports = {
  SPELERS, TEAMS, CLUBS, GAMES
};