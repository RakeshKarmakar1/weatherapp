import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const apiKey = '8380cb2c4ec44f858a494123242307';

  const searchLocation = () => {
    const URL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    axios.get(URL)
      .then((res) => {
        setData(res.data);
        setLocation(''); // Clear input after search
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setData({}); // Reset data if there's an error
      });
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          name="search"
          id="search"
          placeholder='Enter location'
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          />
        <button id='btn' onClick={searchLocation}>Search</button>
      </div>

      <div className="container">
        {data.location && (
          <div className="top">
            <div className="location">
              <p>{data.location.name}</p>
            </div>
            <div className="temp">
              <h1>{data.current.temp_c.toFixed(1)}°C</h1>
            </div>
            <div className="description">
              <p>{data.current.condition.text}</p>
            </div>
          </div>
        )}

        {data.current && (
          <div className="bottom">
            <div className="feels">
              <p className='bold'>{data.current.feelslike_c.toFixed(1)}°C</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className='bold'>{data.current.humidity.toFixed(1)}%</p>
              <p> Humidity</p>
            </div>
            <div className="wind">
              <p className='bold'>{data.current.wind_mph.toFixed(1)} MPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
