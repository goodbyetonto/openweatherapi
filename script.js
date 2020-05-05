$(document).ready(function(){
    var city = $("#cityField"); 
    var zip = $("#zipField"); 
    var cityBtn = $("#cityBtn"); 
    var zipBtn = $("#zipBtn"); 
    var key = "54763b00d037c47de6a2388f5546c0da";
    var queryZip = "api.openweathermap.org/data/2.5/forecast?zip=" + zip + "&appid=" + key; 
    var cityZip = "api.openweathermap.org/data/2.5/forecast?zip=" + city + "&appid=" + key; 


    cityBtn.on("click", function(city){
        city.value()

    });

    zip.on("click", function(){

    });









});