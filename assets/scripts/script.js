const apiKey = `7816d9f235c88adc096427a68ca872f2`;
const units = "metric";
const apiFunction = "forecast";

const cityNameElement = document.getElementById("city-name");
const temperatureElement = document.getElementById("temperature");
const imageElement = document.getElementById("image");
const conditionElement = document.getElementById("condition");
const humidityElement = document.getElementById("humidity");
const inputElement = document.getElementById("input");
const buttonElement = document.getElementById("button");
const forecastAreaElement = document.getElementById("forecast-area");


buttonElement.addEventListener('click', function() {
    const location = inputElement.value;
    const apiURL = `https://api.openweathermap.org/data/2.5/${apiFunction}?q=${location}&appid=${apiKey}&units=${units}`;
    fetch(apiURL)                        // retrieve all data from this url
    .then(function (response) {          // this gets called when the fetch function returns its data
        return response.json();          // convert the relevant part of the page to a JS object
    }).then(function (object) {          // this gets called when the conversion is complete
        showCurrentWeather(object);
    });
})

function showCurrentWeather(obj) {
    forecastAreaElement.innerHTML = "";

    cityNameElement.innerText = obj.city.name;
    temperatureElement.innerText = obj.list[0].main.temp
    const imageCode = obj.list[0].weather[0].icon;
    const conditionImage = `https://openweathermap.org/img/wn/${imageCode}@2x.png`;
    imageElement.src = conditionImage;
    conditionElement.innerText = obj.list[0].weather[0].main;
    humidityElement.innerText = obj.list[0].main.humidity;


    for (let i = 7; i < obj.list.length; i+=8) {
        const temp = obj.list[i].main.temp;
        const fcImageCode = obj.list[i].weather[0].icon;
        const fcConditionImage = `https://openweathermap.org/img/wn/${fcImageCode}@2x.png`;
        const condition = obj.list[i].weather[0].main;
        const humidity = obj.list[i].main.humidity;

        const timeStamp = obj.list[i].dt;
        const dateTime = new Date(timeStamp * 1000);
        const dayOfWeek = dateTime.toLocaleDateString("en-GB", { weekday: 'long' });

        let htmlString = `
            <div class="col">
                <h4>${dayOfWeek}</h4>
                <h3>${temp}°C</h3>
                <h4>${humidity}%</h4>
                <img src="${fcConditionImage}" alt="">
                <h5>${condition}</h5>
            </div>
        `;
        forecastAreaElement.innerHTML += htmlString;
    }
}