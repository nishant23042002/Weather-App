const searchField = document.querySelector("#default-search");
const searchBtn = document.querySelector("#search-btn");
const apiKEY = "&appid=5d6a4554cfbbef26f96f4b9361fc3e28"
const apiURL = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q="
//Circle animation
const loading = document.querySelector("#loading");
//Skeleton animation
const loader2 = document.querySelector("#loader2");
const loader3 = document.querySelector("#loader3");
const loader4 = document.querySelector("#loader4");
const loader5 = document.querySelector("#loader5");
const loader6 = document.querySelector("#loader6");

//circle animation for small cards
const loader01 = document.querySelector("#loader01")
const loader02 = document.querySelector("#loader02")
const loader03 = document.querySelector("#loader03")
const loader04 = document.querySelector("#loader04")
const loader05 = document.querySelector("#loader05")
const loader06 = document.querySelector("#loader06")
const loader07 = document.querySelector("#loader07")



function loadingAnimation() {

    //circle animation class
    loading.classList.add("display");

    //skeleton animation display property
    loader2.style.display = "block";
    loader3.style.display = "block";
    loader4.style.display = "block";
    loader5.style.display = "block";
    loader6.style.display = "block";

    //animation for small cards
    loader01.style.display = "block"
    loader02.style.display = "block"
    loader03.style.display = "block"
    loader04.style.display = "block"
    loader05.style.display = "block"
    loader06.style.display = "block"
    loader07.style.display = "block"

    //hiding element to show circle animation
    document.getElementById("weather-info").style.visibility = "hidden"
    document.getElementById("weather-info2").style.visibility = "hidden"

    //hiding the element to show the skeleton animation
    document.getElementById("box-info").style.visibility = "hidden"
    document.getElementById("box-info2").style.visibility = "hidden"
    document.getElementById("box-info3").style.visibility = "hidden"
    document.getElementById("box-info4").style.visibility = "hidden"
    document.getElementById("box-info5").style.visibility = "hidden"

    //hiding elements from small cards to show circle animation
    document.getElementById("box1").style.visibility = "hidden"
    document.getElementById("box2").style.visibility = "hidden"
    document.getElementById("box3").style.visibility = "hidden"
    document.getElementById("box4").style.visibility = "hidden"
    document.getElementById("box5").style.visibility = "hidden"
    document.getElementById("box6").style.visibility = "hidden"
    document.getElementById("box7").style.visibility = "hidden"


    setTimeout(() => {
        //removing class after fethching
        loading.classList.remove("display")

        // removing display property after fetching 
        loader2.style.display = "none"
        loader3.style.display = "none"
        loader4.style.display = "none"
        loader5.style.display = "none"
        loader6.style.display = "none"

        //removing display property of small cards
        loader01.style.display = "none"
        loader02.style.display = "none"
        loader03.style.display = "none"
        loader04.style.display = "none"
        loader05.style.display = "none"
        loader06.style.display = "none"
        loader07.style.display = "none"
    }, 2000)
}
function hideLoading() {
    //hiding animation after fetching
    loading.classList.remove("display")
    loader2.style.display = "none"
    loader3.style.display = "none"
    loader4.style.display = "none"
    loader5.style.display = "none"
    loader6.style.display = "none"

    //hiding animation for small cards
    loader01.style.display = "none"
    loader02.style.display = "none"
    loader03.style.display = "none"
    loader04.style.display = "none"
    loader05.style.display = "none"
    loader06.style.display = "none"
    loader07.style.display = "none"
}

async function checkWeather(city) {
    loadingAnimation();
    try {
        //fetching api
        const response = await fetch(apiURL + city + apiKEY);
        //error message if data failed to fetch 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTimeout(() => {
            hideLoading();
            console.log(data)
            //displaying hidden elements after fetching 
            document.querySelector("#weather-info").style.visibility = "visible";
            document.querySelector("#weather-info2").style.visibility = "visible";
            document.querySelector("#box-info").style.visibility = "visible";
            document.querySelector("#box-info2").style.visibility = "visible";
            document.querySelector("#box-info3").style.visibility = "visible";
            document.querySelector("#box-info4").style.visibility = "visible";
            document.querySelector("#box-info5").style.visibility = "visible";

            //displaying hidden elements after fetching 
            document.querySelector("#box1").style.visibility = "visible";
            document.querySelector("#box2").style.visibility = "visible";
            document.querySelector("#box3").style.visibility = "visible";
            document.querySelector("#box4").style.visibility = "visible";
            document.querySelector("#box5").style.visibility = "visible";
            document.querySelector("#box6").style.visibility = "visible";
            document.querySelector("#box7").style.visibility = "visible";









            //adding data to respective tags dynamically
            document.querySelector("#city").innerHTML = `${data.city.name}, ${data.city.country}`;



            //insides left-side container
            document.querySelector("#temperature").innerHTML = `${Math.round(data.list[0].main.temp)} &deg;C`;
            document.querySelector("#cloud").innerHTML = `Cloud : ${data.list[3].clouds.all} %`;
            document.querySelector("#rain").innerHTML = `Rain : ${data.list[3].weather[0].description}`;


            //Day format
            document.querySelector("#day1").innerHTML = data.list[3].dt_txt.toString().slice(0, 11)
            document.querySelector("#day2").innerHTML = data.list[11].dt_txt.toString().slice(0, 11)
            document.querySelector("#day3").innerHTML = data.list[19].dt_txt.toString().slice(0, 11)
            document.querySelector("#day4").innerHTML = data.list[27].dt_txt.toString().slice(0, 11)
            document.querySelector("#day5").innerHTML = data.list[35].dt_txt.toString().slice(0, 11)
            //inside card temperature for 5 days
            document.querySelector("#temp_day1").innerHTML = `Temp : <span class="font-medium">${Math.round(data.list[3].main.temp)} &deg;C</span>`;
            document.querySelector("#temp_day2").innerHTML = `Temp : <span class="font-medium">${Math.round(data.list[11].main.temp)} &deg;C</span>`;
            document.querySelector("#temp_day3").innerHTML = `Temp : <span class="font-medium">${Math.round(data.list[19].main.temp)} &deg;C</span>`;
            document.querySelector("#temp_day4").innerHTML = `Temp : <span class="font-medium">${Math.round(data.list[27].main.temp)} &deg;C</span>`;
            document.querySelector("#temp_day5").innerHTML = `Temp : <span class="font-medium">${Math.round(data.list[35].main.temp)} &deg;C</span>`;
            //wind-status for 5 days
            document.querySelector("#wind-status1").innerHTML = `Wind : <span class="font-medium">${data.list[3].wind.speed} Kph</span>`;
            document.querySelector("#wind-status2").innerHTML = `Wind : <span class="font-medium">${data.list[11].wind.speed} Kph</span>`;
            document.querySelector("#wind-status3").innerHTML = `Wind : <span class="font-medium">${data.list[19].wind.speed} Kph</span>`;
            document.querySelector("#wind-status4").innerHTML = `Wind : <span class="font-medium">${data.list[27].wind.speed} Kph</span>`;
            document.querySelector("#wind-status5").innerHTML = `Wind : <span class="font-medium">${data.list[35].wind.speed} Kph</span>`;
            //humidity for 5 days
            document.querySelector("#humidity1").innerHTML = `Humidity : <span class="font-medium">${data.list[3].main.humidity} %rh</span>`;
            document.querySelector("#humidity2").innerHTML = `Humidity : <span class="font-medium">${data.list[11].main.humidity} %rh</span>`;
            document.querySelector("#humidity3").innerHTML = `Humidity : <span class="font-medium">${data.list[19].main.humidity} %rh</span>`;
            document.querySelector("#humidity4").innerHTML = `Humidity : <span class="font-medium">${data.list[27].main.humidity} %rh</span>`;
            document.querySelector("#humidity5").innerHTML = `Humidity : <span class="font-medium">${data.list[35].main.humidity} %rh</span>`;





            //small cards
            //visibility
            const visMeter = data.list[0].visibility;
            const visKM = visMeter / 1000;
            document.querySelector("#visibility").innerHTML = `${visKM} km`

            //sea level
            document.querySelector("#sea_level").innerHTML = `${data.list[0].main.sea_level} hPa`

            //wind gust
            document.querySelector("#wind_gust").innerHTML = `${data.list[0].wind.gust} m/s`

            //Feels like
            document.querySelector("#feels-like1").innerHTML = `${Math.round(data.list[0].main.feels_like)} &deg;C`

            //sunrise / sunset
            let unix = data.city.sunrise;
            let unix2 = data.city.sunset;
            let sunrise = new Date(unix * 1000);
            let sunset = new Date(unix2 * 1000);
            //displaying only time by slicing
            document.querySelector("#sunrise").innerHTML = `${sunrise.toString().slice(15, 24)}`
            document.querySelector("#sunset").innerHTML = `${sunset.toString().slice(15, 24)}`

            //weather description
            document.querySelector("#weather").innerHTML = data.list[0].weather[0].main


            //time converting
            const dt = data.list[0].dt;
            var day = new Date(dt * 1000);
            var finalRes = day.toUTCString().slice(0, 16)
            document.querySelector("#time").innerHTML = finalRes;


        }, 2000)
    }
    //throwing error message if fails to fetch the data
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}









searchBtn.addEventListener("click", (e) => {
    //preventing browser's default behaviour
    e.preventDefault();
    //taking input of the user
    checkWeather(searchField.value);
});