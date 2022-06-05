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
    let currTemp = document.querySelector("#current-temperature");
    currTemp.innerHTML = Math.round(response.data.main.temp);
    let skyCondition = document.querySelector("#sky-condition");
    skyCondition.innerHTML = response.data.weather[0].description;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    let date = document.querySelector("#date");
    date.innerHTML = formatDate();
    console.log(response.data);
}
let apiKey = "ef6474d7c06b8fcbb3388c0963600854";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);