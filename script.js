const ip_api =
  "https://ipgeolocation.abstractapi.com/v1/?api_key=19716e399e41408c897fc4b541160cf8";
//API documentation for abstract IP geolocation - https://app.abstractapi.com/api/ip-geolocation/tester

const api_key = "0d32655573f280eaa5d85c7e6fa638a5";
//API documentation for openweathermap https://openweathermap.org/api/one-call-api

//Mapping taken from https://github.com/erikflowers/weather-icons/issues/204
//https://github.com/erikflowers/weather-icons/issues/250 NOT AN ISSUE
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
};

//Button toggle function for switching between forecasts
let query_header = document.getElementById("query_header");
let forecast_table = document.getElementById("hourly_forecast");
let day_forecast = document.getElementById("daily_forecast");

function toggleButton(toggle_button) {
  if (this.innerText === "7-Day Forecast") {
    this.innerText = "12-Hour Forecast";
    query_header.innerText = "7-Day Forecast";
    day_forecast.classList.remove("hidden");
    forecast_table.classList.add("hidden");
  } else if (this.innerText === "12-Hour Forecast") {
    forecast_table.classList.remove("hidden");
    day_forecast.classList.add("hidden");
    query_header.innerText = "12-Hour Forecast (Local Time)";
    this.innerText = "7-Day Forecast";
  } else {
    this.innerText = "12-Hour Forecast";
    query_header.innerText = "7-Day Forecast";
    day_forecast.classList.remove("hidden");
    forecast_table.classList.add("hidden");
  }
}

//Loading animation
//Function taken from https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
// Don't really get the math but it works, basically will have to pass in a number, "number", with the first range of numbers (0 - 100) and another range of numbers (1 - 0 for opacity )
function scale(number, loadMin, loadMax, opacityMin, opacityMax) {
  return (
    ((number - loadMin) * (opacityMax - opacityMin)) / (loadMax - loadMin) +
    opacityMin
  );
}

let load = 0;
let initialize = setInterval(blurring, 15);
let loadingText = document.querySelector(".loading-text");
let bg = document.querySelector(".bg");

function blurring() {
  load++;
  loadingText.innerText = `${load}%`;
  loadingText.style.opacity = scale(load, 0, 100, 1, 0);
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;

  if (load > 99) {
    clearInterval(initialize);
    bg.replaceWith(...document.querySelector(".bg").childNodes);
    loadingText.remove();
  }
}

// Pinging user location from IP
// Fetch data from the api first, which returns a response. Response then needs to be parsed into json with .json() method

async function getUserIP() {
  try {
    await fetch(ip_api)
      .then((response) => response.json())
      .then((json) => {
        const data = json;

        const userLocation = document.getElementById("geolocation");
        userLocation.innerHTML = `${data.city}, ${data.country}`;
        // If returns undefined, check error code. Probably error code 429 which represents that the API has rate limited user request

        //Setting constants for greeting message later
        const morning = [4, 5, 6, 7, 8, 9, 10, 11];
        const afternoon = [12, 13, 14, 15, 16, 17, 18, 19];
        const evening = [20, 21, 22, 23, 0, 1, 2, 3];

        //Add clock. Needs to be with userlocation as it uses api data
        const clockTable = document.createElement("table");
        const dateRow = document.createElement("tr");
        const timeRow = document.createElement("tr");

        clockTable.append(dateRow);
        clockTable.append(timeRow);
        userLocation.append(clockTable);

        setInterval(myClock, 1000);

        function myClock() {
          let timeNow = new Date();
          // Cannot just reuse timeNow previously declared because need to keep updating time

          timeNow.toISOString().split("T")[0];

          let hours = timeNow.getHours();
          hours = hours < 10 ? `0${hours}` : hours;
          let min = timeNow.getMinutes();
          min = min < 10 ? `0${min}` : min;
          let second = timeNow.getSeconds();
          second = second < 10 ? `0${second}` : second;
          timeRow.innerHTML = `${hours}:${min}:${second}, GMT ${data["timezone"]["abbreviation"]}`;

          // Setting greeting. Benefit of putting this here is that it will change from afternoon -> evening if timing changes
          if (morning.includes(hours)) {
            document.querySelector("h1").innerHTML = "Good Morning!";
          } else if (afternoon.includes(hours)) {
            document.querySelector("h1").innerHTML = "Good Afternoon!";
          } else {
            document.querySelector("h1").innerHTML = "Good Evening!";
          }
        }
      });
  } catch (err) {
    console.log(err);
    alert("You're going too fast! Slow down and refresh");
  }
}

getUserIP();

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

      const currentWeatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${api_key}&units=metric`;
      const weatherRes = await fetch(currentWeatherURL);
      const weatherData = await weatherRes.json();

      console.log(currentWeatherURL);
      let gmtZone = weatherData["timezone_offset"] / 3600;

      document.getElementById("search_location").innerHTML = `${
        locationData[0]["name"]
      }, ${locationData[0]["country"]}, GMT ${
        gmtZone > 0 ? `+${gmtZone}` : gmtZone
      }`;
      // Ternary Operator. If gmtZone is more than 0, add a + sign in front. Otherwise negative numbers will show negative sign anyway

      //Current weather data
      let current_temp = Math.ceil(Number(weatherData.current.temp));
      let current_feels_like = Math.ceil(
        Number(weatherData["current"]["feels_like"])
      );
      let current_weather = weatherData["current"]["weather"][0]["description"];
      let icon = document.createElement("i");

      document.getElementById("current_weather").innerHTML = current_weather;
      document.getElementById(
        "current_temp"
      ).innerHTML = `Current Temperature: ${current_temp}&#176C`;
      document.getElementById(
        "feels_like"
      ).innerHTML = `Feels Like: ${current_feels_like}&#176C`;

      let iconType = "";
      let current_weather_id = weatherData["current"]["weather"][0]["id"];
      document.getElementById("weather_icon").innerHTML = "";
      iconType = `wi-${wiToOWM[current_weather_id]}`;

      icon.classList.add("wi", iconType);
      document.getElementById("weather_icon").append(icon);

      //12 Hour Forecast
      forecast_table.innerHTML = "";

      let forecast_body = document.createElement("tbody");
      for (let i = 0; i < 12; i++) {
        let forecast_row = document.createElement("tr");
        forecast_row.className = `hour_${i}`;

        let forecast_time = document.createElement("td");
        let forecast_temp = document.createElement("td");
        let forecast_weather = document.createElement("td");
        let icon = document.createElement("i");

        // Time is stored as Unix
        let weatherTime =
          weatherData["hourly"][i]["dt"] + weatherData["timezone_offset"];
        //Convert from Unix by inputting milliseconds into new Date() method. Convert by multiplying by 1000
        weatherTime = weatherTime * 1000;
        weatherTime = new Date(weatherTime);
        weatherTime = weatherTime.toLocaleString([], {
          timeZone: "UTC",
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
          weatherData["hourly"][i]["weather"][0]["description"];

        let iconType = "";
        let hourly_weather_id = weatherData["hourly"][i]["weather"][0]["id"];

        iconType = `wi-${wiToOWM[hourly_weather_id]}`;

        icon.classList.add("wi", iconType);
        forecast_weather.append(icon);

        forecast_row.append(forecast_time, forecast_weather, forecast_temp);
        forecast_body.appendChild(forecast_row);
      }
      forecast_table.appendChild(forecast_body);

      // 7 Day Forecast
      day_forecast.innerHTML = "";

      let day_forecast_body = document.createElement("tbody");
      for (let i = 1; i < weatherData["daily"].length; i++) {
        let day_forecast_row = document.createElement("tr");
        day_forecast_row.className = `day_${i}`;

        let day_forecast_date = document.createElement("td");
        let day_forecast_temp = document.createElement("td");
        let day_forecast_weather = document.createElement("td");
        let icon = document.createElement("i");

        // Time is stored as Unix
        let weatherTime = weatherData["daily"][i]["dt"];
        //Convert from Unix by inputting milliseconds into new Date() method. Convert by multiplying by 1000
        weatherTime = weatherTime * 1000;
        weatherTime = new Date(weatherTime);
        weatherTime = weatherTime.toLocaleString([], {
          day: "numeric",
          month: "long",
        });

        day_forecast_date.innerHTML = weatherTime;
        day_forecast_temp.innerHTML = `Min:${Math.ceil(
          weatherData["daily"][i]["temp"]["min"]
        )}&#176C, Max:${Math.ceil(
          weatherData["daily"][i]["temp"]["max"]
        )}&#176C`;
        day_forecast_weather.innerHTML =
          weatherData["daily"][i]["weather"][0]["description"];

        let iconType = "";
        let daily_weather_id = weatherData["daily"][i]["weather"][0]["id"];
        iconType = `wi-${wiToOWM[daily_weather_id]}`;

        icon.classList.add("wi", iconType);
        day_forecast_weather.append(icon);

        day_forecast_row.append(
          day_forecast_date,
          day_forecast_weather,
          day_forecast_temp
        );
        day_forecast_body.appendChild(day_forecast_row);
      }
      day_forecast.appendChild(day_forecast_body);

      //Adding event listener to button to toggle
      const tog_button = document.getElementById("toggle_hour_day");

      //Making it default such that every new search will display 12h forecast
      query_header.innerText = "12-Hour Forecast (Local Time)";
      day_forecast.classList.add("hidden");
      forecast_table.classList.remove("hidden");
      tog_button.innerText = "Toggle Forecast";

      //Enable button
      tog_button.removeAttribute("disabled");
      tog_button.classList.remove("btn-secondary");
      tog_button.classList.add("btn-primary");

      //Removes any event listener if there were any previously before adding.
      tog_button.removeEventListener("click", toggleButton);
      tog_button.addEventListener("click", toggleButton);

      // ---------SPACE-----------
      //Add favorites button
      //Commit the current search value (key) and api data(value) into localstorage.
      //Append to a sidebar list "favorites" for anchor link
      //Anchor tags should then redirect back to the search data

      //Adding event listener to favorites button and adding favorites list
    } catch (err) {
      console.log(err);
      alert("Please ensure your search term is for a City!");
    }
  }
  getLocationWeather();
});

// Not useful to use geolocation to get user location if only interested in getting country, seems like pinging it from IP is sufficient

function setFavorite() {
  localStorage.setItem(city_name, weatherData);
}
