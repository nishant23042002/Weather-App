const searchField = document.querySelector("#default-search");
const searchBtn = document.querySelector("#search-btn");
const apiKEY = "&appid=5d6a4554cfbbef26f96f4b9361fc3e28"
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const loading = document.querySelector("#loading");
const loader2 = document.querySelector("#loader2");


function loadingAnimation(){
    loading.classList.add("display");
    loader2.style.display = "block";
    document.getElementById("weather-info").style.visibility = "hidden"
    document.getElementById("weather-info2").style.visibility = "hidden"
    document.getElementById("box-info").style.visibility = "hidden"
    setTimeout(()=>{
        loading.classList.remove("display")
        loader2.style.display = "none"
    }, 2000)
}
function hideLoading(){
    loading.classList.remove("display")
    loader2.style.display = "none"
}

async function checkWeather(city) {
    loadingAnimation();
    try {
        const response = await fetch(apiURL + city + apiKEY);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTimeout(()=>{
            hideLoading();
            console.log(data)
            document.querySelector("#weather-info").style.visibility = "visible"
            document.getElementById("weather-info2").style.visibility = "visible"
            document.querySelector("#box-info").style.visibility = "visible"









            document.querySelector("#city").innerHTML = `${data.name}, ${data.sys.country}`;
            document.querySelector("#feels-like").innerHTML = `<span class="font-bold">Feels Like : </span> ${Math.round(data.main.feels_like)} &deg;C`
            document.querySelector("#temperature").innerHTML = `${Math.round(data.main.temp)}&deg;C`;
            document.querySelector("#cloud").innerHTML = `Cloud : ${data.clouds.all} %`;
            document.querySelector("#rain").innerHTML = `Rain : ${data.weather[0].description}`;
            document.querySelector("#sea-level").innerHTML = `${data.main.sea_level} hPa`;
            document.querySelector("#wind-status").innerHTML = `${data.wind.speed} Kph`;
            document.querySelector("#humidity").innerHTML = `${data.main.humidity} %rh`;
            document.querySelector("#visibility").innerHTML = `${data.visibility / 1000} km`;
            document.querySelector("#max_temp").innerHTML = `${Math.round(data.main.temp_max)} &deg;C`;
            let unix = data.sys.sunrise;
            let unix2 = data.sys.sunset;
            let sunrise = new Date(unix * 1000);
            let sunset = new Date(unix2 * 1000);
            document.querySelector("#sunrise-sunset").innerHTML = `${sunrise.toString().slice(15, 24)} / ${sunset.toString().slice(15, 24)}`
        }, 2000)
    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}









searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkWeather(searchField.value);
})