"use strict";

const api_key = "0d32655573f280eaa5d85c7e6fa638a5";

//Getting user location
// let user_location = document.querySelector("#user_current_location");
// function geoLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     alert("Geolocation is not supported, please enable location services!");
//   }
// }

// function showPosition(position) {
//   user_location.innerHTML = `Latitude: ${position.coords.latitude} \nLongitude: ${position.coords.longitude}`;
// }

/*
Current forecast - https://openweathermap.org/api/one-call-api
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

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${api_key}&units=metric`;
    const weatherRes = await fetch(currentWeatherURL);
    const weatherData = await weatherRes.json();

    console.log(currentWeatherURL);
    //Current weather data
    let current_temp = Math.ceil(Number(weatherData.current.temp));
    let current_feels_like = Math.ceil(
      Number(weatherData["current"]["feels_like"])
    );
    let current_weather = weatherData["current"]["weather"][0]["main"];

    document.getElementById("current_weather").innerHTML = current_weather;
    document.getElementById("current_temp").innerHTML = current_temp;
    document.getElementById("feels_like").innerHTML = current_feels_like;

    //12 Hour Forecast
    for (let i = 0; i < 12; i++) {
      let forecast_div = document.createElement("div");
      forecast_div.className = `hour_${i}`;

      let forecast_time = document.createElement("td");
      let forecast_temp = document.createElement("td");
      let forecast_weather = document.createElement("td");

      //   forecast_time.innerHTML = weatherData["hourly"][i]["dt"]; // Time is stored as Unix
      let weatherTime = weatherData["hourly"][i]["dt"];
      //Convert from Unix by inputting milliseconds into new Date() method. Convert by multiplying by 1000
      weatherTime = weatherTime * 1000;
      weatherTime = new Date(weatherTime);
      weatherTime = weatherTime.toLocaleTimeString([], {
        month: "long",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      });

      forecast_time.innerHTML = weatherTime;
      forecast_temp.innerHTML = Math.ceil(weatherData["hourly"][i]["temp"]);
      forecast_weather.innerHTML =
        weatherData["hourly"][i]["weather"][0]["main"];

      let forecast_table = document.getElementById("hour_forecast");
      forecast_div.append(forecast_time, forecast_weather, forecast_temp);
      forecast_table.appendChild(forecast_div);
    }
  }
  getLocationWeather();
});
