const apiKey = 'YOUR_API_KEY'; // <-- Replace with your real API key

document.getElementById("cityInput").addEventListener("keydown",(e)=>{
    if(e.key === "Enter")
    {
        getWeather();
    }
});

function getWeather() // Get weather data for particular city
{
  const city = document.getElementById('cityInput').value.trim();
  console.log("City = ", city);

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  if (navigator.onLine)
    {
        fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(data => {
        // Store in localStorage
            localStorage.setItem('weather_' + city.toLowerCase(), JSON.stringify(data));
            displayWeather(data);
        })
        .catch(err => {
            document.getElementById('weatherResult').innerText = err.message;
        });
    }
   else 
   {
        const cached = localStorage.getItem('weather_' + city.toLowerCase());
        if (cached) 
        {
            displayWeather(JSON.parse(cached));
        }
        else 
        {
            document.getElementById('weatherResult').innerText = "No internet and no cached data available.";
        }
    }
}

function displayWeather(data) 
{
  const html = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>🌡️ Temperature: ${data.main.temp} °C</p>
    <p>☁️ Weather: ${data.weather[0].description}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬️ Wind: ${data.wind.speed} m/s</p>
  `;
  document.getElementById('weatherResult').innerHTML = html;
}