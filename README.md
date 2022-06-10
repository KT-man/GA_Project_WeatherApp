# GA_Project_WeatherApp

> **_NOTE:_**  The note content.

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
