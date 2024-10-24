import logo from './logo.svg';
import './App.css';
import React from 'react';

const fetchCity = async (url) => {
  const apiKey = `lqvRzZoD0+4ebK430HBokw==7D9TitOUZ4VoYZGO`;
  try {
    const res = await fetch(url, {
      headers: {
        'x-api-key': apiKey
        }
      }
    );
    const data = await res.json();
    return data[0]["name"];
  } catch (e) {
    alert("Please enter a correct city");
    return;
  }
}

const fetchLocation = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const lat = data[0]["lat"];
    const long = data[0]["lon"];
    return {
      lat: lat,
      long: long
    };
  } catch (e) {
    alert("Please enter a correct city");
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

  showContainer() {
    if (!this.state.input) {
      alert("Please enter city");
      return;
    }
    const allContainers = document.getElementsByClassName("weather-info");
    for (let i = 0; i < allContainers.length; i++) {
      allContainers[i].textContent = fetchCity("https://api.api-ninjas.com/v1/city?name=San Francisco");
    }
    document.getElementById("container").hidden = false;
    // const location = fetchLocation(`https://api.openweathermap.org/geo/1.0/direct?q=${this.state.input}&limit=5&appid=ec3c55e16c1a877d14b0b59f018d6438`);
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
        <div hidden id="container" className="info-container">
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
          <div className="weather-info"></div>
        </div>
      </div>
    );
  }
}

export default App;