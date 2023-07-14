function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  let temperatureElement = document.querySelector("#temperature");
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  let searchForm = document.querySelector("#search-bar");
  let currentLocationButton = document.querySelector("#current-location-btn");
  let iconElement = document.querySelector("#icon");
  
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#icon").innerHTML = response.data.weather;
  
  currentLocationButton.addEventListener("click", getCurrentLocation);
  searchForm.addEventListener("submit", handleSubmit);
  dateElement.innerHTML = formatDate(currentTime);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  iconElement.setAttribute("alt", response.data.weather[0].description);

}
function searchCity(city) {
  let APIKey = "8cd9be374c7c96c39a9fe73f4bf2f055";
  let APIUrl = `https://API.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
  axios.get(APIUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let APIKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let APIUrl = `https://API.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${APIKey}&units=metric`;

  axios.get(APIUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Hong Kong");
