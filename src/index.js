let celsiusTemp = null;

function formatDate() {
    let date = new Date();
    let num = date.getDate();
    let month = date.getMonth();
    let months = ["January",
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
        "December"
    ];
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${num} ${months[month]}, ${days[day]} ${hours}:${minutes}`;
}

function displayTemperature(response) {
    let cityName = document.querySelector("#city-name");
    cityName.innerHTML = response.data.name;
    let currTemp = document.querySelector("#current-temperature");
    celsiusTemp = response.data.main.temp;
    currTemp.innerHTML = Math.round(celsiusTemp);
    let skyCondition = document.querySelector("#sky-condition");
    skyCondition.innerHTML = response.data.weather[0].description;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    let date = document.querySelector("#date");
    date.innerHTML = formatDate();
    let icon = document.querySelector("#icon");
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", response.data.weather[0].description);


}
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitting);

function search(city) {
    let apiKey = "ef6474d7c06b8fcbb3388c0963600854";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function submitting(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    search(searchInput.value);
}

let fahrTemp = document.querySelector("#fahrenheit");
let celTemp = document.querySelector("#celsius");

function showFahrTemp(event) {
    event.preventDefault();
    let temperature = document.querySelector("#current-temperature");
    let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
    temperature.innerHTML = Math.round(fahrenheitTemperature);
    fahrTemp.classList.add("active");
    celTemp.classList.remove("active");
}

function showCel(event) {
    event.preventDefault();
    let temperature = document.querySelector("#current-temperature");
    temperature.innerHTML = Math.round(celsiusTemp);
    fahrTemp.classList.remove("active");
    celTemp.classList.add("active");
}
fahrTemp.addEventListener("click", showFahrTemp);

celTemp.addEventListener("click", showCel);

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHTML = `<div class="row">`;
    days.forEach(function(day) {
        forecastHTML = forecastHTML +
            `<div class="col-2">
    <span class="day">${day}</span>
    <span><img src="img/5729380_cloudy_snow_winter_cloud_snowflake_icon.svg" alt="" class="weather-image"></span>
    <span class="test">
    <span><img src="img/temperature-svgrepo-com.svg" alt="" class="temp-sign"></span>
    <span class="temps">
        <span class="future-temp-max">18&deg;</span>
    <span class="future-temp-min">12&deg;</span>
    </span>
    </span>
    </div>`;
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;

}
search("London");
displayForecast();