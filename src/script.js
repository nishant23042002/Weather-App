const searchBtn = document.getElementById("search-btn");
// const apiKEY = "5d6a4554cfbbef26f96f4b9361fc3e28";
// const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Roha";

async function checkWeather() {
    const response = await fetch("https://api.weatherapi.com/v1/current.json?key=229a2845ab234ada9c1195246242512&q=Roha");
    const data = await response.json();
    console.log(data)
    document.querySelector("#city").innerHTML = `${data.location.name}, ${data.location.region}`;
    document.querySelector("#day-time").innerHTML = `<span class="font-bold">Time : </span> ${data.location.localtime.slice(10)}`
    document.querySelector("#temperature").innerHTML = `${data.current.temp_c}&deg;C`;
    // document.querySelector("#weather-icon").src = data.current.condition.icon
    document.querySelector("#cloud").innerHTML = `Cloud : ${data.current.cloud}`;
    document.querySelector("#rain").innerHTML = `Rain : ${data.current.precip_in}%`;
    document.querySelector("#uv-index").innerHTML = data.current.uv;
    document.querySelector("#wind-status").innerHTML = `${data.current.wind_kph} Kph`;
    document.querySelector("#humidity").innerHTML = `${data.current.humidity} %rh`;
    document.querySelector("#visibility").innerHTML = `${data.current.vis_km} km`;
    document.querySelector("#heatindex_c").innerHTML = `${data.current.heatindex_c} &deg;C`;
    document.querySelector("#pressure_in").innerHTML = `${data.current.pressure_in} in Hg`;
}

checkWeather();
searchBtn.addEventListener("click", function () {
    console.log("clicked")
})