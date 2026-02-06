const apiKey = "YOUR_API_KEY";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherResult = document.getElementById("weatherResult");

  if (city === "") {
    weatherResult.innerHTML = "❌ Please enter a city name";
    return;
  }
weatherResult.innerHTML = `<p class="loading">⏳ Fetching weather...</p>`;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        weatherResult.innerHTML = "❌ City not found";
      } else {
        weatherResult.innerHTML = `
          <h3>${data.name}</h3>
          <p>🌡️ Temperature: ${data.main.temp} °C</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>🌬️ Wind: ${data.wind.speed} m/s</p>
        `;
      }
    })
    .catch(error => {
      weatherResult.innerHTML = "⚠️ Error fetching data";
    });
}
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
          weatherResult.innerHTML = `
            <h3>${data.name}</h3>
            <p>🌡️ ${data.main.temp} °C</p>
          `;
        });
    });
  } else {
    alert("Geolocation not supported");
  }
}
