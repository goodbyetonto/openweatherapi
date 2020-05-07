$(document).ready(function () {
    
    // Define counter for 0
    let counter = 0;
    var zip = $("#zipField");
    var cityBtn = $(".cityBtn");
    var zipBtn = $(".zipBtn");
    var key = "54763b00d037c47de6a2388f5546c0da";
    const queryCityExt = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key;
    const iconURL = "http://openweathermap.org/img/wn/10d@2x.png"
    var queryZip = "api.openweathermap.org/data/2.5/forecast?id=" + zip + "&appid=" + key;

    function addCity(city, counter) {


        const cityList = $(".city");


        newBtn = $("<button></button>");


        newBtn.attr({ type: "button", class: "list-group-item list-group-item-action", id: `city${counter}` });


        newBtn.html(city);


        cityList.append(newBtn);
    }

    function currentCond(resp) {



    }

    function currentWeather(resp, city, respuv) {
        let dateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        let tempKel = resp.main.temp;
        let tempFar = Math.round(tempKel * 9 / 5 - 459.67);
        let uvI = respuv.value; 
        let humid = resp.main.humidity; 
        let windy = resp.wind.speed; 
        const cardBody = $(".card-body"); 
        const location = $("#city"); 
        const temp = $("#temp"); 
        const humidity = $("#humidity");
        const wind = $("#wind");
        const uv = $("#uv");
        location.html(city + "( " + dateTime + " )"); 
        temp.html("Tempearature: " + tempFar + "°F"); 
        humidity.html("Humidity: " + humid + "%"); 
        wind.html("Wind Speed: " + windy + "mph"); 
        uv.html("UV Index: " + uvI); 
    }

    function queryUvI(resp, city) {
        let lat = resp.coord.lat; 
        let lon = resp.coord.lon; 
        const uvIQuery = "https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon;
        console.log(uvIQuery); 
        $.ajax({
            url: uvIQuery,
            method: "GET"
        }).then(function (respuv) {
            currentWeather(resp, city, respuv); 
        });
    }

    // 'On-Click' for handling the Current Weather Query
    cityBtn.click(function () {
        counter++;
        var city = $("#cityField").val();
        const queryCityCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
        addCity(city, counter);
        $.ajax({
            url: queryCityCurrent,
            method: "GET"
        }).then(function (resp) {
            queryUvI(resp, city); 
        });
    }); 
});
    