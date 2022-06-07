"use strict";
const api_key = "0d32655573f280eaa5d85c7e6fa638a5";

//Setting Greeting
// To add in Timezone and changing to local time
let timeNow = new Date();
timeNow = timeNow.getHours();

const morning = [4, 5, 6, 7, 8, 9, 10, 11];
const afternoon = [12, 13, 14, 15, 16, 17, 18, 19];
const evening = [20, 21, 22, 23, 0, 1, 2, 3];

if (morning.includes(timeNow)) {
  document.querySelector("h1").innerHTML = "Good Morning!";
} else if (afternoon.includes(timeNow)) {
  document.querySelector("h1").innerHTML = "Good Afternoon!";
} else {
  document.querySelector("h1").innerHTML = "Good Evening!";
}

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

//Retrieve data from API
document.querySelector("#search").addEventListener("click", function () {
  let city_name = document.querySelector("#query").value;

  // Current weather forecast
  async function getLocationWeather() {
    try {
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

      document.getElementById("search_location").innerHTML =
        locationData[0]["name"] + ", " + locationData[0]["country"];

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
      let forecast_table = document.getElementById("hour_forecast");
      forecast_table.innerHTML = "";

      for (let i = 0; i < 12; i++) {
        let forecast_div = document.createElement("div");
        forecast_div.className = `hour_${i}`;

        let forecast_time = document.createElement("td");
        let forecast_temp = document.createElement("td");
        let forecast_weather = document.createElement("td");

        // Time is stored as Unix
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
        forecast_temp.innerHTML = `${Math.ceil(
          weatherData["hourly"][i]["temp"]
        )}&#176C`;
        forecast_weather.innerHTML =
          weatherData["hourly"][i]["weather"][0]["main"];

        forecast_div.append(forecast_time, forecast_weather, forecast_temp);
        forecast_table.appendChild(forecast_div);
      }
      //Easy way to add toggle to 7-day forecast would be to add the toggle button to the getLocationWeather() function.
      //Toggle button only appears after user has searched
      let day_forecast = document.getElementById("day_forecast");
      day_forecast.innerHTML = "";

      for (let i = 1; i < weatherData["daily"].length; i++) {
        let day_forecast_div = document.createElement("div");
        day_forecast_div.className = `day_${i}`;

        let day_forecast_date = document.createElement("td");
        let day_forecast_temp = document.createElement("td");
        let day_forecast_weather = document.createElement("td");

        // Time is stored as Unix
        let weatherTime = weatherData["daily"][i]["dt"];
        //Convert from Unix by inputting milliseconds into new Date() method. Convert by multiplying by 1000
        weatherTime = weatherTime * 1000;
        weatherTime = new Date(weatherTime);
        weatherTime = weatherTime.toLocaleTimeString([], {
          month: "long",
          day: "2-digit",
          //   hour: "numeric",
          //   minute: "numeric",
        });

        day_forecast_date.innerHTML = weatherTime;
        day_forecast_temp.innerHTML = `${Math.ceil(
          weatherData["hourly"][i]["temp"]
        )}&#176C`;
        day_forecast_weather.innerHTML =
          weatherData["hourly"][i]["weather"][0]["main"];

        day_forecast_div.append(
          day_forecast_date,
          day_forecast_weather,
          day_forecast_temp
        );
        day_forecast.appendChild(day_forecast_div);
      }

      document.getElementById("day_forecast").classList.add("hidden");

      //Adding event listener to button to toggle
      const toggle_button = document.getElementById("toggle_hour_day");
      toggle_button.addEventListener("click", function () {
        if (toggle_button.innerText === "7-Day Forecast") {
          toggle_button.innerText = "12-Hour Forecast";
          document.getElementById("query_type").innerText = "7-Day Forecast";
          day_forecast.classList.remove("hidden");
          forecast_table.classList.add("hidden");
        } else {
          forecast_table.classList.remove("hidden");
          day_forecast.classList.add("hidden");
          document.getElementById("query_type").innerText = "12-Hour Forecast";
          toggle_button.innerText = "7-Day Forecast";
        }
      });
    } catch (err) {
      alert(err);
    }
  }
  getLocationWeather();
});
