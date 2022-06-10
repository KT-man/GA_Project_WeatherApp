# GA_Project_WeatherApp

## IMPORTANT
> **_NOTE:_**  The app is not able to function properly because of Cross-Origin Resource Sharing issues, where the page is hosted securely on github (https) but the free OpenWeatherMap API does not provide SSL support (unsecured). 

As such, the page will not load weather data properly. A hotfix is available through the heroku CORS-anywhere project, but will require manual intervention to get it to work. To enable CORS, you will have to manually enable the heroku app by visiting https://cors-anywhere.herokuapp.com/ to enable it to work on your browser. Then, reload the weather app page for data to be pulled from the OpenWeatherMap API.

## Weather Application in HTML, CSS, JS
- Weather application that pulls data from the Open Weather Map API, available here - https://openweathermap.org/api/one-call-api
- Application also pulls location data by utilizing the AbstractAPI for IP Geolocation, available here - https://app.abstractapi.com/api/ip-geolocation/documentation

## What does the app do? 
- Application pulls weather information from the Open Weather Map OneCall API and includes weather data for **CITIES** 
- Weather data includes current weather information, as well as hourly forecasts for up to 12 hours and daily forecasts for up to 7 days 


## How to use 
- Enter your search query into the search box and click on the "Search" button 
- Ensure that the search query is for a **CITY** and not a country, as that may lead to confusing results. For example, searching for "Sweden" will end up searching for the town Sweden, located in USA. https://en.wikipedia.org/wiki/Sweden,_New_York
- Double check search result by checking the search query displayed to ensure search has provided the correct country 

### Future development goals 
- Include additional search terms to provide for additional specifications in the search query. For example, searching for "Perth" now will only return weather data for the City of Perth in Australia. It is not possible to search for the City of Perth in Scotland for instance. 
- Include dynamic backgrounds to switch to the corresponding weather condition of the search query
- Include a favorites list to store past search results 
- Media queries to cater for mobile users 
