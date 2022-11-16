let SPELERS = [
  {
    id: 1, 
    naam: 'Maxime Coens', 
    gewicht: 73.2, 
    lengte: 183, 
    positie: 'shooting guard', 
    geboortedatum: '27-08-2002',
    team: {id: 1, leeftijdscategorie: 'U21'}
  },
  {
		id: 2, 
		naam: 'Aiko Delbaere', 
		gewicht: 79, 
		lengte: 194, 
		positie: 'guard', 
		geboortedatum: '02-05-2002', 
    team: {id: 1, leeftijdscategorie: 'U21'}
  },
  {
    id: 3, 
    naam: 'Ivan Sugira', 
    gewicht: 83, 
    lengte: 183, 
    positie: 'forward', 
    geboortedatum: '21-02-2002',
    team: {id: 2, leeftijdscategorie: 'U21'}
  }
];

let TEAMS = [
  {
    id: 1,
    leeftijdscategorie: 'U21',
    club: {
      id: 1,
      naam: 'Amon jeugd Gentson'
    }
  },
  {
    id: 1,
    leeftijdscategorie: 'U21',
    club: {
      id: 2,
      naam: 'Donza'
    }
  }
];

let CLUBS = [
  {
    id: 1,
    naam: 'Amon jeugd Gentson',
    hoofdsponsor: 'Amon',
    voorzitter: 'papa Gentson',
    locatie: 'Henleykaai 83, Gent'
  },
  {
    id: 2,
    naam: 'LDP Donza',
    hoofdsponsor: 'Tegels',
    voorzitter: 'papa Donza',
    locatie: 'OCP, Deinze'
  }
];

let GAMES = [
  {
    id: 1,
    datum: '20-10-2022',
    locatie: 'Henleykaai, Gent',
    score: 'Gentson 99 - Donza'
  }
];

module.exports = {
  SPELERS, TEAMS, CLUBS, GAMES
};