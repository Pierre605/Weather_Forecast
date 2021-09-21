const openCageApi = "https://api.opencagedata.com/geocode/v1/json";
const openCageApiKey = "76b7b12b3b8b458f9b6f6308db634f5b";
const openOpenWeather = "https://api.openweathermap.org/data/2.5/onecall";
const openOpenWeatherKey = "21cb797121376a89cb5374b1548539f5";
const exclude = "minutely,hourly,alerts";
const units = "metric";
const openOpenWeatherPicto = "http://openweathermap.org/img/wn/"

document.getElementById("city-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const myNode = document.getElementsByClassName("weather");
    console.log(myNode);
    while (myNode[0].firstChild) {
        myNode[0].removeChild(myNode[0].lastChild)
    }
    var coord = httpGet(document.getElementById("city-name").value);
})


function displayData2(data2) {
    console.log(data2);
    var nb_days = document.getElementById("nb-days").value;

        var current_time = data2.current.dt;
        current_time = new Date(current_time * 1000);
        console.log("temps actuel:", current_time);

        var sunrise_today = data2.current.sunrise;
        sunrise_today = new Date(sunrise_today * 1000);
        console.log("levé:", sunrise_today);

        var sunset_today = data2.current.sunset;
        sunset_today = new Date(sunset_today * 1000);
        console.log("couché:", sunset_today);

        var backG = document.getElementsByTagName("body");
        if (current_time < sunrise_today || current_time > sunset_today) {
            backG[0].classList.add("nightBackground")
        }
        else {
            backG[0].classList.remove("nightBackground")
        }

        temperatures = []
        rawWeekDays = []
        for (var i = 0; i <= nb_days; i++) {
            rawWeekDays.push(data2.daily[i].dt);
            temperatures.push(data2.daily[i].temp.day);
        }
        console.log(temperatures)

        for (var j = 0; j < rawWeekDays.length; j++) {
            rawWeekDays[j] = new Date(rawWeekDays[j] * 1000);
            rawWeekDays[j] = rawWeekDays[j].toLocaleString('fr-FR', {weekday: "long"});
            rawWeekDays[j] = rawWeekDays[j][0].toUpperCase() + rawWeekDays[j].slice(1);
    
            var new_div = document.createElement("div");
            var day = document.createElement("h2");
            new_div.setAttribute("class", "cell");
            day.setAttribute("class", "cell");
            var parent = document.getElementsByClassName("weather");
            new_div.appendChild(day);
            parent[0].appendChild(new_div);
            day.textContent = rawWeekDays[j];
    
            var sub_div = document.createElement("div");
            var sub_img = document.createElement("img");
            sub_div.appendChild(sub_img);
            new_div.appendChild(sub_div);

            var picto = data2.daily[j].weather[0].icon;
            let urlPicto = openOpenWeatherPicto+picto+"@2x.png";
            sub_img.setAttribute("src", urlPicto);

            var temp_div = document.createElement("h4");
            temp_div.textContent = Math.round(temperatures[j]) + " °C";
            new_div.appendChild(temp_div);
    
        }
    }

    

function displayData(data) {
    const lat = data.results[0].geometry.lat
    const long = data.results[0].geometry.lng
    console.log(lat)
    console.log(long)
    
    httpGet2(lat, long);
}

function httpGet(search) {
    const xmlHtpp = new XMLHttpRequest();

    xmlHtpp.onreadystatechange = function() {
        if (xmlHtpp.readyState === 4) {
            displayData(JSON.parse(xmlHtpp.responseText));
            
        }
    }

    xmlHtpp.open("GET", openCageApi+"?key="+openCageApiKey+"&q="+search);
    xmlHtpp.send(null);

}

function httpGet2(lat, long) {
    
    const xmlHtpp2 = new XMLHttpRequest();

    xmlHtpp2.onreadystatechange = function() {
        if (xmlHtpp2.readyState === 4) {
            displayData2(JSON.parse(xmlHtpp2.responseText))
        }
    }

    xmlHtpp2.open("GET", openOpenWeather+"?lat="+lat+"&lon="+long+"&units="+units+"&exclude="+exclude+"&appid="+openOpenWeatherKey);
    xmlHtpp2.send(null);
    
}
    
