let SPELERS = [
  {
    spelerId: 1, 
    naam: 'Maxime Coens', 
    gewicht: 73.2, 
    lengte: 183, 
    positie: 'shooting guard', 
    geboortedatum: '2002-08-27T00:00:00.000Z',
    team: {
      teamId: 1,
      leeftijdscategorie: 'U21',
      club: {
        clubId: 1,
        naam: 'Amon jeugd Gentson',
        hoofdsponsor: 'Amon',
        voorzitter: 'papa Gentson',
        locatie: 'Henleykaai 83, Gent'
      }
    }
  },
  {
		spelerId: 2, 
		naam: 'Aiko Delbaere', 
		gewicht: 79, 
		lengte: 194, 
		positie: 'guard', 
		geboortedatum: '2002-05-16T00:00:00.000Z', 
    team: {
      teamId: 1,
      leeftijdscategorie: 'U21',
      club: {
        clubId: 1,
        naam: 'Amon jeugd Gentson',
        hoofdsponsor: 'Amon',
        voorzitter: 'papa Gentson',
        locatie: 'Henleykaai 83, Gent'
      }
    }
  },
  {
    spelerId: 3, 
    naam: 'Ivan Sugira', 
    gewicht: 83, 
    lengte: 183, 
    positie: 'forward', 
    geboortedatum: '2002-05-08T00:00:00.000Z',
    team: {
      teamId: 2,
      leeftijdscategorie: 'U21',
      club: {
        clubId: 2,
        naam: 'LDP Donza',
        hoofdsponsor: 'Tegels',
        voorzitter: 'papa Donza',
        locatie: 'OCP, Deinze'
      }
    }
  }
];

let TEAMS = [
  {
    teamId: 1,
    leeftijdscategorie: 'U21',
    club: {
      clubId: 1,
      naam: 'Amon jeugd Gentson',
      hoofdsponsor: 'Amon',
      voorzitter: 'papa Gentson',
      locatie: 'Henleykaai 83, Gent'
    }
  },
  {
    teamId: 2,
    leeftijdscategorie: 'U21',
    club: {
      clubId: 2,
      naam: 'LDP Donza',
      hoofdsponsor: 'Tegels',
      voorzitter: 'papa Donza',
      locatie: 'OCP, Deinze'
    }
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
    thuisTeam: {
      teamId: 1,
      leeftijdscategorie: 'U21',
      club: {
        clubId: 1,
        naam: 'Amon jeugd Gentson',
        hoofdsponsor: 'Amon',
        voorzitter: 'papa Gentson',
        locatie: 'Henleykaai 83, Gent'
      }
    },
    uitTeam: {
      teamId: 2,
      leeftijdscategorie: 'U21',
      club: {
        clubId: 2,
        naam: 'LDP Donza',
        hoofdsponsor: 'Tegels',
        voorzitter: 'papa Donza',
        locatie: 'OCP, Deinze'
      }
    },
    scoreThuis: 99,
    scoreUit: 55,
    datum: '2022-05-08T00:00:00.000Z'
  }
];

module.exports = {
  SPELERS, TEAMS, CLUBS, GAMES
};