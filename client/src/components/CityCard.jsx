import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CityCard = ({ city, unitIsCelsius }) => {
  const [weatherData, setWeatherData] = useState({
    location: '',
    region: '',
    country: '',
    tempC: 0,
    feelsLikeC: 0,
    tempF: 0,
    feelsLikeF: 0,
    condition: 0,
    icon: '',
    uv: 0,
    humidity: 0,
    isDay: ''
  })

  useEffect(async () => {
    const {data} = await axios.get(
      `https://weatherwatcher.herokuapp.com/api?q=${city}`
    );
    setWeatherData({...weatherData,
    location: data.weatherInfo.location?.name,
    isDay: data.weatherInfo.current?.is_day,
    region: data.weatherInfo.location?.region,
    country: data.weatherInfo.location?.country,
    tempC: data.weatherInfo.current?.temp_c,
    feelsLikeC: data.weatherInfo.current?.feelslike_c,
    tempF: data.weatherInfo.current?.temp_f,
    feelsLikeF: data.weatherInfo.current?.feelslike_f,
    condition: data.weatherInfo.current?.condition?.text,
    icon: data.weatherInfo.current?.condition?.icon,
    uv: data.weatherInfo.current?.uv,
    humidity: data.weatherInfo.current?.humidity,
  })
  }, [city]);

  return (
    <div className="city-card-wrapper">
      <div className="city-card-upper">
        <div className="card-upper-one">
          <span className="location">{weatherData.location} { weatherData.isDay === 1 ? <i className="fa fa-solid fa-sun"></i> : <i className="fa fa-solid fa-moon"></i>}</span>
          <span className="country">
            {weatherData.region}{weatherData.region !== '' && ','} {weatherData.country}
          </span>
        </div>
        <div className="card-upper-two">
          <div className="upper-two-left">
            <span>{unitIsCelsius ? weatherData.tempC : weatherData.tempF}</span>
            {unitIsCelsius ? (
              <span className="temp-1">&deg;C</span>
            ) : (
              <span className="temp-1">&deg;F</span>
            )}
          </div>
          <div className="upper-two-right">
            <span>{weatherData.condition}</span>
            <span>
              <img src={weatherData.icon} />
            </span>
          </div>
        </div>
      </div>
      <div className="city-card-lower">
        <h2 className="feels-like">
          <span className="char-1">F</span>
          <span className="char-2">e</span>
          <span className="char-3">e</span>
          <span className="char-4">l</span>
          <span className="char-5">s</span>
          <span className="char-6"> </span>
          <span className="char-7">l</span>
          <span className="char-8">i</span>
          <span className="char-9">k</span>
          <span className="char-10">e</span>
        </h2>
        <span className="round-data">
          {unitIsCelsius ? Math.round(weatherData.feelsLikeC) : Math.round(weatherData.feelsLikeF)}
          {unitIsCelsius ? (
            <span className="temp-2">&deg;C</span>
          ) : (
            <span className="temp-2">&deg;F</span>
          )}
        </span>
        <h2 className="humidity">
          <span className="char-1">H</span>
          <span className="char-2">u</span>
          <span className="char-3">m</span>
          <span className="char-4">i</span>
          <span className="char-5">d</span>
          <span className="char-6">i</span>
          <span className="char-7">t</span>
          <span className="char-8">y</span>
        </h2>
        <span className="round-data">
          {weatherData.humidity}
          <span className="temp-2">%</span>
        </span>
        <h2 className="uv-index">
          <span className="char-1">U</span>
          <span className="char-2">V</span>
          <span className="char-3"> </span>
          <span className="char-4">I</span>
          <span className="char-5">n</span>
          <span className="char-6">d</span>
          <span className="char-7">e</span>
          <span className="char-8">x</span>
        </h2>
        <span
          className={`round-data radiation-level-text ${
            weatherData.uv <= 2
              ? 'radiation-low'
              : weatherData.uv <= 5
              ? 'radiation-moderate'
              : weatherData.uv <= 7
              ? 'radiation-high'
              : weatherData.uv <= 10
              ? 'radiation-vhigh'
              : 'radiation-extreme'
          }`}
        >
          {weatherData.uv}
          <span className="radiation-classification-text">
            {weatherData.uv <= 2
              ? 'Low'
              : weatherData.uv <= 5
              ? 'Moderate'
              : weatherData.uv <= 7
              ? 'High'
              : weatherData.uv <= 10
              ? 'Very High'
              : 'Extreme'}
          </span>
        </span>
      </div>
    </div>
  );
};

export default CityCard;
