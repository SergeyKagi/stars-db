/* 
-- Прямой метод, тоже рабочий но менее читабельный --
fetch('https://swapi.dev/api/people/1/')
  .then((res) => {
    return res.json();
  })
  .then((body) => {
    console.log(body);
  });

  */
/*
 -- Тренировка отлова ошибок Fetch --
const getResponse = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`My Error from ${url}` + `, recived ${res.status}`);
  }
  const body = await res.json();
  return body;
};

getResponse('https://swapi.dev/api/people/1/')
  .then((body) => {
    console.log(body);
  })
  .catch((err) => {
    console.error('My Error', err);
  });

  */

// -- Создаем клиент API класс-сервис --

export default class SwapiService {
  _apiBase = 'https://swapi.dev/api';

  async getResourse(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`My Error from ${url}` + `, recived ${res.status}`);
    }
    return await res.json();
  }
  async getAllPeople() {
    const res = await this.getResourse(`/people/`);
    return res.results.map(this._transformPerson);
  }
  async getPerson(id) {
    const person = await this.getResourse(`/people/${id}/`);
    return this._transformPerson(person);
  }

  async getAllPlanets() {
    const res = await this.getResourse(`/planets/`);
    return res.results.map(this._transformPlanet);
  }
  async getPlanet(id) {
    const planet = await this.getResourse(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResourse(`/starships/`);
    return res.results.map(this._transformStarship);
  }
  async getStarship(id) {
    const starship = await this.getResourse(`/starships/${id}/`);
    return this._transformStarship(starship);
  }

  _extractId(item) {
    const idRegEx = /\/([0-9]*)\/$/;
    return item.url.match(idRegEx)[1];
  }

  _transformPlanet(planet) {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      diameter: planet.diameter,
      rotationPeriod: planet.rotation_period,
    };
  }
  _transformStarship(starship) {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      constInCredits: starship.constInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity,
    };
  }

  _transformPerson(person) {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
    };
  }
}

const swapi = new SwapiService();

swapi.getAllPeople().then((people) => {
  people.forEach((p) => {
    console.log(p.name);
  });
});

swapi.getPerson(1).then((person) => {
  console.log(`Get Person - ${person.name}`);
});

swapi.getAllPlanets().then((planets) => {
  planets.forEach((p) => {
    console.log(p.name);
  });
});

swapi.getPlanet(1).then((p) => {
  console.log(`Get Planet - ${p.name}`);
});

swapi.getAllStarships().then((starships) => {
  starships.forEach((s) => {
    console.log(s.name);
  });
});

swapi.getStarship(3).then((s) => {
  console.log(`Get starship - ${s.name}`);
});
