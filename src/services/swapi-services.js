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
    return res.results;
  }
  getPerson(id) {
    return this.getResourse(`/people/${id}/`);
  }

  async getAllPlanets() {
    const res = await this.getResourse(`/planets/`);
    return res.results;
  }
  getPlanet(id) {
    return this.getResourse(`/planets/${id}/`);
  }

  async getAllStarships() {
    const res = await this.getResourse(`/starships/`);
    return res.results;
  }
  getStarship(id) {
    return this.getResourse(`/starships/${id}/`);
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
