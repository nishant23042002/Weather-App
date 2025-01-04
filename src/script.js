const apiKEY = "&appid=5d6a4554cfbbef26f96f4b9361fc3e28";
const apiURL = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const searchField = document.querySelector("#default-search")
const searchBtn = document.querySelector("#search-btn")
const loading = document.querySelector("#loading")
const recentCitiesSearch = 5;

function cityToLocalStorage(city){
    const formattedCity = city.trim().toLowerCase();
    let recentCites = JSON.parse(localStorage.getItem("recentCities")) || [];
    if(!recentCites.includes(formattedCity)){
        recentCites.unshift(formattedCity)
        if(recentCites.length > recentCitiesSearch){
            recentCites.pop();
        }
        localStorage.setItem("recentCities", JSON.stringify(recentCites));
    }
    dropDown()
}
function dropDown(){
    const recentCity = JSON.parse(localStorage.getItem("recentCities")) || [];
    const dropdown = document.getElementById("recent-cities");

    dropdown.innerHTML = `<option value="">Select City</option>`;

    recentCity.forEach(city =>{
        const option = document.createElement("option");
        option.value = city
        option.textContent = city;
        dropdown.appendChild(option)
    })
}


async function checkWeather(city) {
    loadingAnimation();
    try {
        //fetching api
        const response = await fetch(apiURL + city + apiKEY);
        //error message if data failed to fetch 
        if (!response.ok) {
            throw new Error('City Not Found');
        }
        const data = await response.json();
        displayWeather(data)
        cityToLocalStorage(city)
        
    }
    //throwing error message if fails to fetch the data
    catch (error) {
        displayError(error.message);
    }
}

function displayWeather(data){
    setTimeout(() => {
        hideLoading();

        document.querySelector("#weather-info").style.visibility = "visible";
        document.querySelector("#weather-info1").style.visibility = "visible";
        document.querySelector("#weather-info2").style.visibility = "visible";

        const temperature = document.querySelector("#temperature")
        temperature.innerHTML = `${Math.round(data.list[0].main.temp)} &degC`
        const cityName = document.getElementById("city")
        cityName.innerHTML = `${data.city.name}, ${data.city.country} `

        const weatherIcon = document.querySelector("#weather-icon")
        if (data.list[0].weather[0].main == "Clear") {
            weatherIcon.src = "../images/clear_weather.png"
        } else if (data.list[0].weather[0].main == "Snow") {
            weatherIcon.src = "../images/snow_weather.png"
        } else if (data.list[0].weather[0].main == "Mist") {
            weatherIcon.src = "../images/sunny_weather.png"
        } else if (data.list[0].weather[0].main == "Clouds") {
            weatherIcon.src = "../images/cloudy_weather.png"
        } else if (data.list[0].weather[0].main == "Rain") {
            weatherIcon.src = "../images/rainy_weather.png"
        } else if (data.list[0].weather[0].main == "Drizzle") {
            weatherIcon.src = "../images/rainy_weather.png"
        }

        const dt = data.list[0].dt;
        var day = new Date(dt * 1000);
        var finalRes = day.toUTCString().slice(0, 11)
        document.querySelector("#time").innerHTML = finalRes;

        const cloud = document.querySelector("#cloud")
        const rain = document.querySelector("#rain")
        cloud.innerHTML = `<span class="font-bold">Clouds - </span> ${data.list[0].clouds.all} %`
        rain.innerHTML = `<span class="font-bold">Rain - </span> ${data.list[0].weather[0].description}`


        //for small cards
        const visibility = document.querySelector("#visibility")
        visibility.innerHTML = `${data.list[0].visibility / 1000} Km`
        const seaLevel = document.querySelector("#sea_level")
        seaLevel.innerHTML = `${data.list[0].main.sea_level} hPa`
        const windGust = document.querySelector("#wind_gust")
        windGust.innerHTML = `${data.list[0].wind.gust} m/s`
        const feelsLike = document.querySelector("#feels_like")
        feelsLike.innerHTML = `${Math.round(data.list[0].main.feels_like)} &deg;C`
        let unix = data.city.sunrise;
        let unix2 = data.city.sunset;
        let sunrise = new Date(unix * 1000);
        let sunset = new Date(unix2 * 1000);
        document.querySelector("#sunrise").innerHTML = `${sunrise.toString().slice(15, 21)} AM`         
        document.querySelector("#sunset").innerHTML = `${sunset.toString().slice(15, 21)} PM`
        const weatherStatus = document.querySelector("#weather_status")
        weatherStatus.innerHTML = data.list[0].weather[0].main

        // for big cards 
        const foreCastList = data.list
        const dailyForecast = foreCastList.filter(item => item.dt_txt.includes("12:00:00"))
        const cardInfo = document.querySelector("#box-info");
        cardInfo.innerHTML = ""

        dailyForecast.forEach((data, index) => {
            if (index < 5) {
                const dt = data.dt
                const dayFormat = new Date(dt * 1000)
                const localTime = dayFormat.toUTCString().slice(0, 3)
                const day = data.dt_txt
                const fiveDayForecast = day.slice(0, 10);
                const temp = `${Math.round(data.main.temp)} &deg;C`;
                const wind = `${data.wind.speed} kph`;
                const humidity = `${data.main.humidity} %`;
                const weatherIconCode = data.weather[0].icon;
                const weatherIconURL = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
                const card = document.createElement("div");
                card.innerHTML = `<div class="w-52 h-66 p-3 rounded-3xl bg-blue-100 border-2 border-blue-600 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-x-3"
                            id="boxes">
                            <h1 class="font-bold" id="day1">${fiveDayForecast}</h1>
                            <h1 class="font-light">${localTime}</h1>                            
                            <div class="flex flex-col gap-2 items-center justify-center" id="box-info">                                
                                <img src="${weatherIconURL}" alt="#">
                                <h1 class="font-bold">Temp : ${temp}</h1>
                                <h1 class="font-bold">Wind : ${wind}</h1>
                                <h1 class="font-bold">Humidity : ${humidity}</h1>                                    
                            </div>
                        </div>`
                cardInfo.appendChild(card);
            }
        });
    }, 2000)
}

function loadingAnimation(){
    //circle animation class
    loading.classList.add("display");
    
    //hiding element to show circle animation
    document.getElementById("weather-info").style.visibility = "hidden"
    document.getElementById("weather-info1").style.visibility = "hidden"
    document.getElementById("weather-info2").style.visibility = "hidden"
    
    setTimeout(()=>{
        //removing class after fethching
        loading.classList.remove("display")
    },2000)
}

function hideLoading(){
    //hiding animation after fetching
    loading.classList.remove("display")
}


function displayError(message){
    const errorDiv = document.getElementById("error")
    errorDiv.innerHTML = `<h1 class="font-bold text-center">${message}</h1>`
    errorDiv.style.color = "red";
}
function clearError(){
    const errorDiv = document.getElementById("error");
    errorDiv.innerHTML = ""
}
document.getElementById("default-search").addEventListener("input", clearError)


searchBtn.addEventListener("click", (e) => {
    //preventing browser's default behaviour
    e.preventDefault();
    //taking input of the user
    if(!searchField.value && searchField.value === ""){
        displayError("Invalid input")
    }else{
        checkWeather(searchField.value);
    }
    const cityInput = document.getElementById("default-search").value.trim();
    if(cityInput){
        checkWeather(cityInput)
    }else{
        displayError("Please enter city name");
    }
});

document.getElementById("recent-cities").addEventListener("change", (e)=>{
    const selectedCity = e.target.value;
    if(selectedCity){
        checkWeather(selectedCity)
        searchField.value = selectedCity
    }
})
window.onload = dropDown;