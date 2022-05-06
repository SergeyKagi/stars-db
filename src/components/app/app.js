import React from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import Spinner from '../spinner';

import './app.css';

const App = () => {
  return (
    <div>
      <Header />
      <RandomPlanet />
      <div>
        <div>
          <ItemList />
        </div>
        <div>
          <PersonDetails />
        </div>
      </div>
    </div>
  );
};

export default App;
