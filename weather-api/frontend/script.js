async function getWeather() {
  const city = document.getElementById("city").value;
  const response = await fetch(`http://localhost:3000/weather?city=${city}`);
  const data = await response.json();

  document.getElementById("result").innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Nhiệt độ: ${data.main.temp}°C</p>
    <p>Thời tiết: ${data.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
  `;
}
