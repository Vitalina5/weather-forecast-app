let cityInput = getIP(); 

const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "834b38664995d2986361a79b2709bfa6"
}

const input = document.querySelector("input");
input.addEventListener("keydown", enter);

function enter(e) {
    if(e.keyCode === 13) {
        getInfo(input.value);
    }
}

async function getIP() {
  const resIP = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=5e2b03856f914c659306ca2898726f36&fields=city`); 
  const resultIP = await resIP.json();
  getInfo(resultIP.city);
  cityInput = resultIP.city;
}

async function getInfo(data) {
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
    const result = await res.json();
    displayResult(result);
}

function displayResult(result) {
    let city = document.querySelector("#city");
    let country = document.querySelector("#country");
    country.src = `https://flagcdn.com/h40/${(result.sys.country).toLowerCase()}.jpg`;
    city.innerHTML = `${result.name}`;
    let condIcon = document.querySelector("#condIcon");
    condIcon.src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;

    getOurDate();

    let temp = document.querySelector("#temp");
    temp.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;

    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML = `Feels like: ${Math.round(result.main.feels_like)}<span>°</span>`;

    let conditions = document.querySelector("#conditions");
    conditions.textContent = `${result.weather[0].main}`;

      if(conditions.textContent === "Clouds") {
        document.body.style.backgroundImage = 
        "linear-gradient(to top, rgba(82, 55, 78, 0.6), rgba(104, 104, 98, 0.9)), url(clouds.jpg)";
      }

      if(conditions.textContent === "Rain" || conditions.textContent === "Drizzle") {
        document.body.style.backgroundImage = 
        "linear-gradient(to top, rgba(82, 55, 78, 0.6), rgba(104, 104, 98, 0.6)), url(rain.jpg)";
      }

      if(conditions.textContent === "Mist" || conditions.textContent === "Fog" || conditions.textContent === "Haze") {
        document.body.style.backgroundImage = 
        "linear-gradient(to top, rgba(82, 55, 78, 0.6), rgba(104, 104, 98, 0.8)), url(fog.jpg)";
      }
      
      if(conditions.textContent === "Thunderstorm") {
        document.body.style.backgroundImage = 
        "linear-gradient(to top, rgba(82, 55, 78, 0.6), rgba(104, 104, 98, 0.9)), url(thunderstorm.jpg)";
      }

      if(conditions.textContent === "Snow") {
        document.body.style.backgroundImage = 
        "linear-gradient(to top, rgba(82, 55, 78, 0.6), rgba(104, 104, 98, 0.9)), url(snow.jpg)";
      }

      if(conditions.textContent === "Clear") {
        document.body.style.backgroundImage = 
        "linear-gradient(to top, rgba(82, 55, 78, 0.6), rgba(104, 104, 98, 0.6)), url(clear.jpg)";
      }

      if(conditions.textContent === "Sand" || conditions.textContent === "Dust") {
        document.body.style.backgroundImage = 
        "linear-gradient(to top, rgba(82, 55, 78, 0.6), rgba(104, 104, 98, 0.8)), url(sand.jpg)";
      }

    let variation = document.querySelector("#variation");
    variation.innerHTML = `Min: ${Math.round(result.main.temp_min)}<span>°</span> |  Max: ${Math.round(result.main.temp_max)}<span>°</span>`;
}

function getOurDate() {
    const myDate = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   
    let day = days[myDate.getDay()];
    let todayDate = myDate.getDate();
    let month = months[myDate.getMonth()];
    let year = myDate.getFullYear();

    let showDate = document.querySelector("#date");
    showDate.textContent = `${day} ${todayDate} ${month} ${year}`;
 }