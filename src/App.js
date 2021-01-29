import React, { useState } from 'react';
import './App.css';
import backgroundImage from "./components/Utils";
import Switch from "./components/Switch";

function App() {
  const[city, setCity] = useState('')
  const[weather, setWeather] = useState({})

  const search = e => {
    if (e.key === "Enter") {
      fetch(`${process.env.REACT_APP_API_URL}weather?q=${city}&APPID=${process.env.REACT_APP_API_KEY}&units=imperial`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setCity('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`
  }

  const [isToggled, setIsToggled] = useState(true);

  return (
    <div className={ (typeof weather.main != "undefined") ? backgroundImage(weather.weather[0].main) : 'App'}>
      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search for a city"
          onChange={e => setCity(e.target.value)}
          value={city}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {isToggled ? <span>{Math.round(weather.main.temp)}&deg;F</span> : 
                            <span>{Math.round((weather.main.temp - 32) * 5 /9)}&deg;C</span>}
         
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
          </div>
          <div className="toggle-box">
            <div className="toggle">
              <Switch 
                rounded={true}
                isToggled={isToggled}
                onToggle={() => setIsToggled(!isToggled)}
                />
            </div>
          </div>
          <div className='text-box'>
            <p>&deg;C | &deg;F</p>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
