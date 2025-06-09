document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const weatherDiv = document.getElementById('weatherResult');
  weatherDiv.innerHTML = '';

  if (!city) {
    weatherDiv.innerHTML = '<p style="color:red">Please enter a city name.</p>';
    return;
  }

  const apiKey = 'f0b31fa333694bf294d180008250906'; // Replace with your WeatherAPI.com key
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found or API error.');

    const data = await response.json();

    const html = `
      <h3>Weather in ${data.location.name}, ${data.location.country}</h3>
      <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
    `;

    weatherDiv.innerHTML = html;
  } catch (error) {
    weatherDiv.innerHTML = `<p style="color:red">${error.message}</p>`;
  }
}
