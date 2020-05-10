$(document).ready(function () {
    const daily = $(".daily"); 
    daily.hide(); 
    // Define counter for 0
    let counter = 0;
    //var zip = $("#zipField");
    var cityBtn = $(".cityBtn");
    var savedCityBtn = $(".city"); 
    //var zipBtn = $(".zipBtn");
    var key = "54763b00d037c47de6a2388f5546c0da";
    const iconURL = "http://openweathermap.org/img/wn/10d@2x.png"
    //var queryZip = "api.openweathermap.org/data/2.5/forecast?id=" + zip + "&appid=" + key;

    
    function addCity(city, counter) {
        const cityList = $(".city");
        newBtn = $("<button></button>");
        newBtn.attr({ type: "button", class: "list-group-item list-group-item-action", id: `city${counter}` });
        newBtn.html(city);
        cityList.append(newBtn);

    };

    savedCityBtn.click(function() {

    })
    


    function currentWeather(resp, city, respuv) {
        const dateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        const temp = resp.main.temp;
        const uvI = respuv.value; 
        const humid = resp.main.humidity; 
        const windy = resp.wind.speed; 
        const location = $("#city"); 
        //const icon = $("<a></a>");
        //icon.attr({class: "icon", href: });
        const tempId = $("#temp"); 
        const humidity = $("#humidity");
        const wind = $("#wind");
        const uv = $("#uv");
        location.html(city + "( " + dateTime + " )"); 
        tempId.html("Tempearature: " + temp + "°F"); 
        humidity.html("Humidity: " + humid + "%"); 
        wind.html("Wind Speed: " + windy + "mph"); 
        uv.html("UV Index: " + uvI); 
    };


    function qeuryExt(respext) {
        let counter = 1; 
        for (i = 0; i < 40; i += 8) {
            const unixTime = respext.list[i].dt; 
            const convTime = moment.unix(unixTime).format("MM/DD/YYYY");
            let hiLoArray = []; 
            for (j = i; j < (i + 8); j++) {
                hiLoArray.push(respext.list[j].main.temp);    
            }
            const tempHi = Math.round(Math.max(...hiLoArray));
            const tempLo = Math.round(Math.min(...hiLoArray)); 
            const humid = respext.list[i].main.humidity; 
            const day = $(`.${counter}`); 
            const date = $("<p></p>").text(convTime);
            date.css("class", "card-text");
            const tempLow = $("<p></p>").text("Low Temp: " + tempLo + "°F"); 
            const tempHigh = $("<p></p>").text("High Temp: " + tempHi + "°F"); 
            const humidity = $("<p></p>").text("Humidity: " + humid + "%"); 
            day.append(date, tempLow, tempHigh, humidity);
            counter++; 
        }
        daily.show(); 
    }; 

    function queryUvI(resp, city) {
        const lat = resp.coord.lat; 
        const lon = resp.coord.lon; 
        const uvIQuery = "https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon;
        console.log(uvIQuery); 
        $.ajax({
            url: uvIQuery,
            method: "GET"
        }).then(function (respuv) {
            currentWeather(resp, city, respuv); 
        });
    };

    // 'On-Click' for handling the Current Weather Query
    cityBtn.click(function () {
        counter++;
        var city = $("#cityField").val();
        const queryCityCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + key;
        const queryCityExt = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=" + key;
        console.log(queryCityExt); 
        addCity(city, counter);
        $.ajax({
            url: queryCityCurrent,
            method: "GET"
        }).then(function (resp) {
            queryUvI(resp, city); 
        });
        $.ajax({
            url: queryCityExt,
            method: "GET"
        }).then(function (respext) {
            qeuryExt(respext); 
        });
    }); 
});
    