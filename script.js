"use strict";
const api_key = "0d32655573f280eaa5d85c7e6fa638a5";
//Mapping taken from https://github.com/erikflowers/weather-icons/issues/204
const wiToOWM = {
  200: "thunderstorm",
  201: "thunderstorm",
  202: "thunderstorm",
  210: "lightning",
  211: "lightning",
  212: "lightning",
  221: "lightning",
  230: "thunderstorm",
  231: "thunderstorm",
  232: "thunderstorm",
  300: "sprinkle",
  301: "sprinkle",
  302: "rain",
  310: "rain-mix",
  311: "rain",
  312: "rain",
  313: "showers",
  314: "rain",
  321: "sprinkle",
  500: "sprinkle",
  501: "rain",
  502: "rain",
  503: "rain",
  504: "rain",
  511: "rain-mix",
  520: "showers",
  521: "showers",
  522: "showers",
  531: "storm-showers",
  600: "snow",
  601: "snow",
  602: "sleet",
  611: "rain-mix",
  612: "rain-mix",
  615: "rain-mix",
  616: "rain-mix",
  620: "rain-mix",
  621: "snow",
  622: "snow",
  701: "showers",
  711: "smoke",
  721: "day-haze",
  731: "dust",
  741: "fog",
  761: "dust",
  762: "dust",
  771: "cloudy-gusts",
  781: "tornado",
  800: "day-sunny",
  801: "cloudy-gusts",
  802: "cloudy-gusts",
  803: "cloudy-gusts",
  804: "cloudy",
  900: "tornado",
  901: "storm-showers",
  902: "hurricane",
  903: "snowflake-cold",
  904: "hot",
  905: "windy",
  906: "hail",
  957: "strong-wind",
  "day-200": "day-thunderstorm",
  "day-201": "day-thunderstorm",
  "day-202": "day-thunderstorm",
  "day-210": "day-lightning",
  "day-211": "day-lightning",
  "day-212": "day-lightning",
  "day-221": "day-lightning",
  "day-230": "day-thunderstorm",
  "day-231": "day-thunderstorm",
  "day-232": "day-thunderstorm",
  "day-300": "day-sprinkle",
  "day-301": "day-sprinkle",
  "day-302": "day-rain",
  "day-310": "day-rain",
  "day-311": "day-rain",
  "day-312": "day-rain",
  "day-313": "day-rain",
  "day-314": "day-rain",
  "day-321": "day-sprinkle",
  "day-500": "day-sprinkle",
  "day-501": "day-rain",
  "day-502": "day-rain",
  "day-503": "day-rain",
  "day-504": "day-rain",
  "day-511": "day-rain-mix",
  "day-520": "day-showers",
  "day-521": "day-showers",
  "day-522": "day-showers",
  "day-531": "day-storm-showers",
  "day-600": "day-snow",
  "day-601": "day-sleet",
  "day-602": "day-snow",
  "day-611": "day-rain-mix",
  "day-612": "day-rain-mix",
  "day-615": "day-rain-mix",
  "day-616": "day-rain-mix",
  "day-620": "day-rain-mix",
  "day-621": "day-snow",
  "day-622": "day-snow",
  "day-701": "day-showers",
  "day-711": "smoke",
  "day-721": "day-haze",
  "day-731": "dust",
  "day-741": "day-fog",
  "day-761": "dust",
  "day-762": "dust",
  "day-781": "tornado",
  "day-800": "day-sunny",
  "day-801": "day-cloudy-gusts",
  "day-802": "day-cloudy-gusts",
  "day-803": "day-cloudy-gusts",
  "day-804": "day-sunny-overcast",
  "day-900": "tornado",
  "day-902": "hurricane",
  "day-903": "snowflake-cold",
  "day-904": "hot",
  "day-906": "day-hail",
  "day-957": "strong-wind",
  "night-200": "night-alt-thunderstorm",
  "night-201": "night-alt-thunderstorm",
  "night-202": "night-alt-thunderstorm",
  "night-210": "night-alt-lightning",
  "night-211": "night-alt-lightning",
  "night-212": "night-alt-lightning",
  "night-221": "night-alt-lightning",
  "night-230": "night-alt-thunderstorm",
  "night-231": "night-alt-thunderstorm",
  "night-232": "night-alt-thunderstorm",
  "night-300": "night-alt-sprinkle",
  "night-301": "night-alt-sprinkle",
  "night-302": "night-alt-rain",
  "night-310": "night-alt-rain",
  "night-311": "night-alt-rain",
  "night-312": "night-alt-rain",
  "night-313": "night-alt-rain",
  "night-314": "night-alt-rain",
  "night-321": "night-alt-sprinkle",
  "night-500": "night-alt-sprinkle",
  "night-501": "night-alt-rain",
  "night-502": "night-alt-rain",
  "night-503": "night-alt-rain",
  "night-504": "night-alt-rain",
  "night-511": "night-alt-rain-mix",
  "night-520": "night-alt-showers",
  "night-521": "night-alt-showers",
  "night-522": "night-alt-showers",
  "night-531": "night-alt-storm-showers",
  "night-600": "night-alt-snow",
  "night-601": "night-alt-sleet",
  "night-602": "night-alt-snow",
  "night-611": "night-alt-rain-mix",
  "night-612": "night-alt-rain-mix",
  "night-615": "night-alt-rain-mix",
  "night-616": "night-alt-rain-mix",
  "night-620": "night-alt-rain-mix",
  "night-621": "night-alt-snow",
  "night-622": "night-alt-snow",
  "night-701": "night-alt-showers",
  "night-711": "smoke",
  "night-721": "day-haze",
  "night-731": "dust",
  "night-741": "night-fog",
  "night-761": "dust",
  "night-762": "dust",
  "night-781": "tornado",
  "night-800": "night-clear",
  "night-801": "night-alt-cloudy-gusts",
  "night-802": "night-alt-cloudy-gusts",
  "night-803": "night-alt-cloudy-gusts",
  "night-804": "night-alt-cloudy",
  "night-900": "tornado",
  "night-902": "hurricane",
  "night-903": "snowflake-cold",
  "night-904": "hot",
  "night-906": "night-alt-hail",
  "night-957": "strong-wind",
};

/*
const getDayNight = (sunrise, sunset) => {
      const now = Date.now();
      if (now> sunrise && now< sunset) {
        return "day-";
      } else {
        return "night-";
      }
    };
*/

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
