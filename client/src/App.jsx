import React, { useState } from 'react';
import CityCard from './components/CityCard';
import TempToggleButton from './components/TempToggleButton';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [chosenCity, setChosenCity] = useState('Peru');
  const [unitIsCelsius, setUnit] = useState(true);

  const inputCityHandler = (event) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  const submitCityHandler = (event) => {
    event.preventDefault();
    setChosenCity(city);
    document.getElementById('city-input').value = '';
  };

  return (
    <div className="main-wrapper">
      <h1 className="app-name"><strong>Weather</strong>Watcher</h1>
      <form className="input-form-wrapper">
        <input
          id="city-input"
          type="text"
          onChange={inputCityHandler}
          autoComplete="off"
        ></input>
        <button type="submit" onClick={submitCityHandler}>
          Submit
        </button>
      </form>
      <TempToggleButton unitIsCelsius={unitIsCelsius} setUnit={setUnit} />
      <CityCard city={chosenCity} unitIsCelsius={unitIsCelsius} />
    </div>
  );
};

export default App;
