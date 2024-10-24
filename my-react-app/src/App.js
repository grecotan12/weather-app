import logo from './logo.svg';
import './App.css';
import React from 'react';

var cityKey = config.CITY_KEY;
var weatherKey = config.WEATHER_KEY;

const checkCity = async (url) => {
  let options = {
    method: 'GET',
    headers: {
      'x-api-key': cityKey
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
    const city = cityObj[0]["name"].toLowerCase();
    let isCityGood = false;
    if (city === this.state.input.toLowerCase()) {
      isCityGood = true;
    } else { 
      alert('No city found. Please enter correct city. Case is ignored.'); 
      return;
    }
    if (isCityGood) {
      const allContainers = document.getElementsByClassName("weather-info");
      document.getElementById("container").hidden = false;
      const location = await fetchWeather(`https://api.openweathermap.org/geo/1.0/direct?q=${this.state.input}&limit=5&appid=ec3c55e16c1a877d14b0b59f018d6438`);
      const locationObj = {
        lat: location[0]["lat"],
        long: location[0]["lon"]
      }
      const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${locationObj.lat}&lon=${locationObj.long}&exclude=current,minutely,hourly,alerts&units=imperial&appid=${weatherKey}`;
      const weather = await fetchWeather(weatherUrl);
      allContainers[0].textContent = weather["daily"].length;
    }
  }

  clearContainer() {
    this.setState({
      input: "",
    });
    document.getElementById("container").hidden = true;
    const allContainers = document.getElementsByClassName("weather-info");
    for (let i = 0; i < allContainers.length; i++) {
      allContainers[i].textContent = "";
    }
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
          <div className="weather-info">lmao</div>
          <div className="weather-info"></div>
          <div className="weather-info"></div>
          <div className="weather-info"></div>
          <div className="weather-info"></div>
          <div className="weather-info"></div>
          <div className="weather-info"></div>
          <div className="weather-info"></div>
          <div className="weather-info"></div>
          <div className="weather-info"></div>
          <div className="weather-info"></div>
          <div className="weather-info"></div>
          <div className="weather-info"></div>
          <div className="weather-info"></div>
        </div>
      </div>
    );
  }
}

export default App;