const apiKey = "3b262d47b59bd545719e9c175f9b09b0";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const weatherCard = document.getElementById("weatherCard");
const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const condition = document.getElementById("condition");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);
    } catch (error) {
        weatherCard.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
}

function displayWeather(data) {
    errorMessage.classList.add("hidden");
    weatherCard.classList.remove("hidden");

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    condition.textContent = `Condition: ${data.weather[0].main}`;

    changeBackground(data.weather[0].main);
}

function changeBackground(weatherCondition) {
    const body = document.body;

    switch (weatherCondition) {
        case "Clear":
            body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
            break;
        case "Clouds":
            body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
            break;
        case "Rain":
            body.style.background = "linear-gradient(to right, #4e73df, #1cc88a)";
            break;
        case "Snow":
            body.style.background = "linear-gradient(to right, #e6dada, #274046)";
            break;
        default:
            body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
    }
}