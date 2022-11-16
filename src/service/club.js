let {TEAMS, CLUBS} = require('../data/mock-data');
// moet TEAMS hierbij
const getAll = () => {
  return {items: CLUBS, count: CLUBS.length};
}

const getById = (id) => {
  return CLUBS.find(c => c.id === parseInt(id));
}

const create = ({naam, hoofdsponsor, voorzitter, locatie}) => {
  const newClub = {
    id: Math.max(...SPELERS.map(s => s.id)) + 1,
    naam,
    hoofdsponsor, 
    voorzitter,
    locatie
  };

  CLUBS = [...CLUBS, newClub];
  return newClub;
}

const updateById = (id, {naam, hoofdsponsor, voorzitter, locatie}) => {
  let club = CLUBS.find(c => c.id === parseInt(id));
  if (!club) {
    throw new Error("club does not exist");
  }
  club.id = id;
  club.naam = naam;
  club.hoofdsponsor = hoofdsponsor;
  club.voorzitter = voorzitter;
  club.locatie = locatie;
  return club;
}

const deleteById = (id) => {
  CLUBS = CLUBS.filter(c => c.id !== parseInt(id));
}

module.exports = {getAll, getById, updateById, create, deleteById};