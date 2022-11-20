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

  let apiKey = "68d9294ce0177d4e103687e1c45ba1ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let cityHeader = document.querySelector("#city-form");
cityHeader.addEventListener("submit", city);

function showTemperature(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#display-temperature");
  let descriptionElement = document.querySelector("#display-description");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#display-wind");
  temperatureElement.innerHTML = celsiusTemp;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
