$(document).ready(function () {
    const daily = $(".daily"); 
    daily.hide(); 
    // Define counter for 0
    let counter = 0;
    //var zip = $("#zipField");
    var cityBtn = $(".cityBtn");
    //var zipBtn = $(".zipBtn");
    var key = "54763b00d037c47de6a2388f5546c0da";
    //const iconURL = "http://openweathermap.org/img/wn/10d@2x.png"
    //var queryZip = "api.openweathermap.org/data/2.5/forecast?id=" + zip + "&appid=" + key;

    
    function addCity(city, counter) {
        const cityList = $(".city");
        newBtn = $("<button></button>");
        newBtn.attr({ type: "button", class: "list-group-item list-group-item-action", id: `city${counter}` });
        newBtn.html(city);
        cityList.append(newBtn);
    };


    function currentWeather(resp, city, respuv) {
        const dateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        const tempKel = resp.main.temp;
        const tempFar = Math.round(tempKel * 9 / 5 - 459.67);
        const uvI = respuv.value; 
        const humid = resp.main.humidity; 
        const windy = resp.wind.speed; 
        //const cardBody = $(".card-body"); 
        const location = $("#city"); 
        const temp = $("#temp"); 
        const humidity = $("#humidity");
        const wind = $("#wind");
        const uv = $("#uv");
        location.text(city + "( " + dateTime + " )"); 
        temp.text("Tempearature: " + tempFar + "°F"); 
        humidity.html("Humidity: " + humid + "%"); 
        wind.text("Wind Speed: " + windy + "mph"); 
        uv.text("UV Index: " + uvI); 
    };


    function qeuryExt(respext) {
        let counter = 1; 
        for (i = 0; i < 40; i += 8) {
            const unixTime = respext.list[i].dt; 
            const convTime = moment.unix(unixTime).format("MM/DD/YYYY");
            let tempLoSum = 0; 
            let tempHiSum = 0; 
            for (j = 0; j < 8; j++) {
                const tempKelMin = respext.list[i].main.temp_min; 
                const tempKelMax = respext.list[i].main.temp_max;
                tempLoSum += tempKelMin; 
                tempHiSum += tempKelMax;
            }
            const avgMin = tempLoSum/8; 
            const avgMax = tempHiSum/8;
            const tempFarMin = Math.round(avgMin * 9/5 - 459.67);
            const tempFarMax = Math.round(avgMax * 9/5 - 459.67);
            const humid = respext.list[i].main.humidity; 
            const day = $(`.${counter}`); 
            const date = $("<p></p>").text(convTime); 
            const tempLo = $("<p></p>").text("Low Temp: " + tempFarMin + "°F"); 
            const tempHi = $("<p></p>").text("Hight Temp: " + tempFarMax + "°F"); 
            const humidity = $("<p></p>").text("Humidity: " + humid + "%"); 
            day.append(date, tempLo, tempHi, humidity);
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
        const queryCityCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
        const queryCityExt = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key;
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
    