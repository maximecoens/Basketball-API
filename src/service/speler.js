let {SPELERS, TEAMS} = require('../data/mock-data');

const getAll = () => {
  return {items: SPELERS, count: SPELERS.length};
}

const getById = (id) => {
  return SPELERS.find(s => parseInt(id) === s.id);
}

const create = ({naam, gewicht, lengte, positie, geboortedatum, teamid}) => {
  let existingTeam;
  if (teamid) {
    existingTeam = TEAMS.find(t => teamid === t.id);
  }
  if (!existingTeam) {
    throw new Error(`team ${teamid} does not exist`);

  }

  const newSpeler = {
    id: Math.max(...SPELERS.map(s => s.id)) + 1,
    naam,
    gewicht,
    lengte,
    positie,
    geboortedatum,
    team: existingTeam
  };

  SPELERS = [...SPELERS, newSpeler];
  return newSpeler;
}

const updateById = (id, {spelerid, naam, gewicht, lengte, positie, geboortedatum, teamid}) => {
  let existingTeam;
  if (teamid) {
    existingTeam = TEAMS.find(t => teamid === t.id);
  }
  if (!existingTeam) {
    throw new Error(`team ${teamid} does not exist`);

  }
  let speler = SPELERS.find(s => s.id === parseInt(id));
  if (!speler) {
    throw new Error("player does not exist");
  }
  speler.id = spelerid;
  speler.naam = naam;
  speler.gewicht = gewicht;
  speler.lengte = lengte;
  speler.positie = positie;
  speler.geboortedatum = geboortedatum;
  speler.team = existingTeam;
  return speler;
}

const deleteById = (id) => {
  SPELERS = SPELERS.filter(s => s.id !== parseInt(id));
}

// kijk naar place en placeid voor team en speler te doen adhv teamid

module.exports={getAll, getById, create, updateById, deleteById};

