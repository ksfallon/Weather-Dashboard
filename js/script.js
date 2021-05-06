// Search for the cities on the lefthand side
// fetch localstorage city names, and display to website.
// box for user to put in the city HTML
// button for them to click to search HTML
var searchFormE1 = document.querySelector("#search-form");
var searchButton = document.querySelector("#search-button");
var cityInput = document.querySelector('#search-input')
var searchCityList = document.querySelector(".search-history");

function handleCitySearchSubmit(event) {
    event.preventDefault();

    var searchInputVal = cityInput.value;
    console.log("city;", searchInputVal);

    localstorage.setItem("city", searchInputVal);
    
    // don't I need to append as buttons though?
    var node = document.createElement("li");
    var textnode = document.createTextNode(searchInputVal);
    node.appendChild(textnode);
    document.getElementsByClassName("search-history").appendChild(node);

}

searchButton.addEventListener("click", handleCitySearchSubmit);


// function locationApiSearch(city, state) {
//     var geocodeQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},&limit=5&appid=af8f9e641174c07751bae2f5bbbc3fb5";

//     if (city) {
//         geocodeQueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city +
//     }

//     geocodeQueryUrl = geocodeQueryUrl + state +
// } 
// click addEventListener for the button - 
    // save value in box to a variable

// fetch API for the GEOLOCATION w/n open weather which gives you the Long and Lat coordinates
// use coordinate results for next API which is the openweather One Call.
// MAKE LINES 8 & 9 a function so it can be called later on.
// Do something with results - local storage, screen display.