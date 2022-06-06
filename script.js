"use strict";

const api_key = "0d32655573f280eaa5d85c7e6fa638a5";

/*
Current forecast - https://openweathermap.org/current#data
5 day forecast - https://openweathermap.org/forecast5
*/

document.querySelector("button").addEventListener("click", function () {
  let city_name = document.querySelector("#query").value;
  console.log(city_name);
  // Current weather forecast
  async function getLocationWeather() {
    const searchLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${api_key}`;
    /*http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    State code only for US. 
    Country code to use ISO3166. Disabled for now and limited to 1 search term */

    const res = await fetch(searchLocation);
    const locationData = await res.json();
    //response = wait for fetch data from url
    // location data = parse the data in json format

    let lat = locationData[0].lat;
    let lon = locationData[0].lon;

    //Get lat and lon from user input
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const weatherRes = await fetch(currentWeatherURL);
    const weatherData = await weatherRes.json();
    console.log(currentWeatherURL);

    console.log(weatherData);
  }

  getLocationWeather();
});
