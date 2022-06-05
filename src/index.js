function displayTemperature(response) {
    let currTemp = document.querySelector("#current-temperature");
    currTemp.innerHTML = Math.round(response.data.main.temp);
    let skyCondition = document.querySelector("#sky-condition");
    skyCondition.innerHTML = response.data.weather[0].description;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    console.log(response.data);
}
let apiKey = "ef6474d7c06b8fcbb3388c0963600854";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);