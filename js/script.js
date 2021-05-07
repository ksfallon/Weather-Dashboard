// Search for the cities on the lefthand side
// fetch localstorage city names, and display to website.
// box for user to put in the city HTML
// button for them to click to search HTML
var searchFormE1 = document.querySelector('#search-form');
var searchButton = document.querySelector('#search-button');
var cityInput = document.querySelector('#search-input');
var searchCityList = document.querySelector('.search-history');
var searchHistory = ["Chapel Hill"]
// get the localStorage and set search history to saved array of searches outside of handleCitySearchSubmit function first
  
// NEED TO APPEND FROM LOCAL STORAGE probably using a for loop

// var node = document.createElement('li');
// var textnode = document.createTextNode(searchInputVal);
// node.appendChild(textnode);
// document.querySelector('.search-history').appendChild(node);
// don't I need to append as buttons though?

function handleCitySearchSubmit(event) {
  event.preventDefault();

  var searchInputVal = cityInput.value;

  console.log('city;', searchInputVal);

  // localStorage.setItem('city', searchInputVal);
  localStorage.setItem(searchInputVal, searchInputVal);

  searchHistory.push(searchInputVal)
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
  // not happy with the parse
  // localStorage.getItem(JSON.parse(searchHistory))
  // console.log (localStorage.getItem(searchHistory))
  var getSearchHistory = localStorage.getItem("searchHistory")
  // console.log(JSON.parse(getSearchHistory))
  if (getSearchHistory) {
    console.log(JSON.parse(getSearchHistory))
  }

// the searchInputVal is the city name that is put into this API
  var geocodeQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInputVal},&limit=5&appid=af8f9e641174c07751bae2f5bbbc3fb5`;
  // the new api with the typed city
  $.ajax({ url: geocodeQueryUrl })
  
  //then funtion - response is what I'm given from that API
  .then(function (response) {
    // will show the five responses
    console.log('response:', response);
  //will put the city name in the top right container
    $('#city-name').text(response[0].name);
    var today = moment();
    $("#today-date").text(today.format("MMM Do, YYYY"));
    var cityToSearch = response[0];
    var oneCallWeatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityToSearch.lat}&lon=${cityToSearch.lon}&appid=af8f9e641174c07751bae2f5bbbc3fb5`;
    $.ajax({ url: oneCallWeatherApi })
    
    .then(function (response) {
      console.log('WEATHER DATA!:', response);
    });
  });
}
// click addEventListener for the button -
// save value in box to a variable
searchButton.addEventListener('click', handleCitySearchSubmit);
// click addEventListener for the button -
// save value in box to a variable
// fetch API for the GEOLOCATION w/n open weather which gives you the Long and Lat coordinates
// use coordinate results for next API which is the openweather One Call.
// MAKE LINES 8 & 9 a function so it can be called later on.
// Do something with results - local storage, screen display.










// I will have a place holder for the city name which will be plugged in
// and on the same line will be the date with moment JS moment().format('l'); 
// place for:
// Temp: pull correct data from local storage
// Wind: pull correct data from local storage
// Humidity: pull correct data from local storage
// UV Index: it needs to change color based on the index number