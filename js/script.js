// Search for the cities on the lefthand side
// fetch localstorage city names, and display to website.
// box for user to put in the city HTML
// button for them to click to search HTML
var searchFormE1 = document.querySelector("#search-form")

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;
    console.log("city", searchInputVal);

    localstorage.setItem("city", searchInputVal);
    

}

searchFormE1.addEventListener("click", handleSearchFormSubmit);


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