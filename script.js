$(document).ready(function () {

    // Define variable for .daily which is 5 day forecast row containing 5 cards
    const daily = $(".daily"); 

    // Hide .daily to so when page opens, the 5 cards are not seen
    daily.hide(); 

    // Define counter for 0 to be used for counting number of entries into dynamically created city list
    let counter = 0;

    //var zip = $("#zipField");

    // Define variable for .cityBtn, which is the search button for the city input form
    const cityBtn = $(".cityBtn");

    // Define variable for .city, which will be the parent class for all appended city buttons
    const savedCityBtn = $(".city"); 

    //var zipBtn = $(".zipBtn");

    // Define variable for API key string
    const key = "54763b00d037c47de6a2388f5546c0da";


    //const iconURL = "http://openweathermap.org/img/wn/10d@2x.png"
    //var queryZip = "api.openweathermap.org/data/2.5/forecast?id=" + zip + "&appid=" + key;

    
    // Define function to add city to sidebar with each searched city
    function addCity(city, counter) {

        // Define variable for cityList
        const cityList = $(".city");

        // Create new html button element
        newBtn = $("<button></button>");

        // Set attributes for newBtn
        newBtn.attr({ type: "button", class: "list-group-item list-group-item-action", id: `city${counter}` });

        // Set html of button to whatever 'city' value is
        newBtn.html(city);

        // Append the new button to cityList
        cityList.append(newBtn);
        //localStorage.setItem()

    };
    
    // Define function for current weather viewing area
    function currentWeather(resp, city, respuv) {

        // Define variable for current date & time
        const dateTime = moment().format('MMMM Do YYYY, h:mm:ss a');

        // Define variable for the temp value from JSON object
        const temp = resp.main.temp;

        // Define variable for the UVI value from JSON object
        const uvI = respuv.value; 

        // Define variable for the humidity value from JSON object
        const humid = resp.main.humidity; 

        // Define variable for the wind speed value from JSON object
        const windy = resp.wind.speed; 

        // Define variable for #city
        const location = $("#city"); 
        //const icon = $("<a></a>");
        //icon.attr({class: "icon", href: });

        // Define variable for #temp
        const tempId = $("#temp"); 

        // Define variable for #humidity
        const humidity = $("#humidity");

        // Define variable for #wind
        const wind = $("#wind");

        // Define variable for #uv
        const uv = $("#uv");

        // Fill html for location 
        location.html(city + "( " + dateTime + " )"); 

        // Fill html for Temperature
        tempId.html("Tempearature: " + temp + "°F"); 

        // Fill html for humidity
        humidity.html("Humidity: " + humid + "%"); 

        // Fill html for wind speed
        wind.html("Wind Speed: " + windy + "mph"); 

        // Fill html for uv index
        uv.html("UV Index: " + uvI); 
    };

    // Define function for the Extended forecast
    function qeuryExt(respext) {

        // Define counter
        let counter = 1; 

        // Outer loop to iterate over all 40 index locations in JSON Object
        // Incrementing by 8 as each index is 3 hours
        for (i = 0; i < 40; i += 8) {

            // Get date-time value from current index
            const unixTime = respext.list[i].dt; 

            // Using moment.js, convert unix value to mm/dd/yyyy value
            const convTime = moment.unix(unixTime).format("MM/DD/YYYY");

            // Define array containing all temp values for a given 24 hour period
            let hiLoArray = []; 

            // Inner loop for iterating through each individual 3 hour block
            for (j = i; j < (i + 8); j++) {

                
                hiLoArray.push(respext.list[j].main.temp);    
            }
            const tempHi = Math.round(Math.max(...hiLoArray));
            const tempLo = Math.round(Math.min(...hiLoArray)); 
            console.log(tempHi); 
            console.log(tempLo); 
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
    