function formatDate() {
  let now = new Date();
  let date = now.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let year = now.getFullYear();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 5) {
    minutes = `0${minutes}`;
  }

  let rightNow = document.querySelector("#current-date");
  rightNow.innerHTML = `${day} ${hours}:${minutes}, ${month} ${date}, ${year}`;
}

formatDate();

function city(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-search").value;
  let currentCity = document.querySelector("#city-label");
  currentCity.innerHTML = cityName;

  let apiKey = "t7041aa32678be3f33of6c64c71d3530";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let cityHeader = document.querySelector("#city-form");
cityHeader.addEventListener("submit", city);

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
    <div class="weather-forecast-day">${formatForecastDay(
      forecastDay.time
    )}</div>
    <img src = ${forecastDay.condition.icon_url} style = "width: 60px;"
    />
    <br />
    <div class="weather-forecast-temperatures">
      <span class="temperature-forecast-max">${Math.round(
        forecastDay.temperature.maximum
      )}°C</span>
      <span class="temperature-forecast-min">${Math.round(
        forecastDay.temperature.minimum
      )}°C</span>
    </div>
  </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "t7041aa32678be3f33of6c64c71d3530";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast);
}

function showTemperature(response) {
  celsiusTemp = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#display-temperature");
  let descriptionElement = document.querySelector("#display-description");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#display-wind");
  temperatureElement.innerHTML = celsiusTemp;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.condition.description;
  iconElement.setAttribute("src", response.data.condition.icon_url);

  getForecast(response.data.coordinates);
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#display-temperature");
  temperatureElement.innerHTML = fahrenheitTemp;
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#display-temperature");
  temperatureElement.innerHTML = celsiusTemp;
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

let celsiusTemp = null;
