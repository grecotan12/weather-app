import logo from './logo.svg';
import './App.css';
import React from 'react';
import config from './config';
import weatherCode from './weather';

const checkCity = async (url) => {
  let options = {
    method: 'GET',
    headers: {
      'x-api-key': config.CITY_KEY
    }
  }
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (e) {
    alert(e);
    return;
  }
}

const fetchWeather = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    alert(e);
    return;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: "",
    }
    this.showContainer = this.showContainer.bind(this);
    this.clearContainer = this.clearContainer.bind(this);
    this.setVal = this.setVal.bind(this);
  }

  setVal(event) {
    this.setState({
      input: event.target.value
    });
  }

  async showContainer() {
    if (!this.state.input) {
      alert("Please enter city");
      return;
    }
    const cityObj = await checkCity(`https://api.api-ninjas.com/v1/city?name=${this.state.input}`);
    const city = cityObj[0].name.toLowerCase();
    let isCityGood = false;
    if (city === this.state.input.toLowerCase()) {
      isCityGood = true;
    } else { 
      alert('No city found. Please enter correct city. Case is ignored.'); 
      return;
    }
    if (isCityGood) {
      document.getElementById("container").hidden = false;
      document.getElementById("container").innerHTML = "";
      const location = await fetchWeather(`https://api.openweathermap.org/geo/1.0/direct?q=${this.state.input}&limit=5&appid=${config.WEATHER_KEY}`);
      const locationObj = {
        lat: location[0].lat,
        long: location[0].lon
      }
      const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${locationObj.lat}&lon=${locationObj.long}&exclude=current,minutely,hourly,alerts&units=imperial&appid=${config.WEATHER_KEY}`;
      const weather = await fetchWeather(weatherUrl);
      for (let i = 0; i < weather.daily.length; i++) {
        const dateObj = new Date(weather.daily[i].dt * 1000);
        const date = `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()}`
        const summary = weather.daily[i].summary;
        const weatherInfo = weather.daily[i].weather[0].id;
        
        document.getElementById("container").innerHTML += 
        `<div class="weather-info">
          <h2>${date}</h2>
          <p>${summary}</p>
          ${weatherCode[weatherInfo.toString()]}
        </div>`;
      }
    }
  }

  clearContainer() {
    this.setState({
      input: "",
    });
    document.getElementById("container").hidden = true;
    document.getElementById("container").innerHTML = "";
  }

  render() {
    return (
      <div className="App">
        <h1>Weather App</h1>
        <label for="user-input">Enter city to look for weather: </label>
        <input onChange={this.setVal} value={this.state.input} id="user-input" type="text"></input>
        <div className='row button-container'>
          <button onClick={this.showContainer} className="col btn btn-lg btn-primary">Check</button>
          <button onClick={this.clearContainer} className="col btn btn-lg btn-primary">Clear</button>
        </div>
        <div id="container" className="info-container">
        </div>
      </div>
    );
  }
}

export default App;