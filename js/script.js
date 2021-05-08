// Search for the cities on the lefthand side
// fetch localstorage city names, and display to website.
// box for user to put in the city HTML
// button for them to click to search HTML
var searchFormE1 = document.querySelector('#search-form');
var searchButton = document.querySelector('#search-button');
var cityInput = document.querySelector('#search-input');
// var searchCityList = document.querySelector('.search-history');
var searchHistory = ["Chapel Hill"]
// get the localStorage and set search history to saved array of searches outside of handleCitySearchSubmit function first
function displayLocalStorage(city) {
  // var searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
  localStorage.setItem('searchHistory', JSON.stringify(city)); 
  searchHistory.push(city);
  var displayCitySearch = JSON.parse(localStorage.getItem('searchHistory'));
  console.log("display:", displayCitySearch);

  $('#previous-search').appendChild(displayCitySearch.city + "<button>")

}
// NEED TO APPEND FROM LOCAL STORAGE probably using a for loop

// var node = document.createElement('li');
// var textnode = document.createTextNode(searchInputVal);
// node.appendChild(textnode);
// document.querySelector('.search-history').appendChild(node);
// don't I need to append as buttons though?

function handleCitySearchSubmit(event) {
  event.preventDefault();

  var searchInputVal = cityInput.value;
  // displayLocalStorage(searchInputVal);
  console.log('city:', searchInputVal);

  localStorage.setItem('city', searchInputVal);
  localStorage.setItem(searchInputVal, searchInputVal);

  searchHistory.push(searchInputVal)
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
  // not happy with the parse
  // localStorage.getItem(JSON.parse(searchHistory))
  // console.log (localStorage.getItem(searchHistory))
  var getSearchHistory = localStorage.getItem("searchHistory")
  console.log(JSON.parse(getSearchHistory))

  // the searchInputVal is the city name that is put into this API
  var geocodeQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInputVal},&limit=5&appid=af8f9e641174c07751bae2f5bbbc3fb5&units=imperial`;
  // the new api with the typed city
  $.ajax({ url: geocodeQueryUrl })

    //then funtion - response is what I'm given from that API
    .then(function (response) {
      // will show the five responses
      console.log('response:', response);
      //will put the city name in the top right container
      $('#city-name').text(response[0].name);
      var today = moment();
      $("#today-date").text("(" + today.format('l') + ")");
      var cityToSearch = response[0];
      var oneCallWeatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityToSearch.lat}&lon=${cityToSearch.lon}&appid=af8f9e641174c07751bae2f5bbbc3fb5&units=imperial`;
      $.ajax({ url: oneCallWeatherApi })

        .then(function (response) {
          console.log('WEATHER DATA!:', response);
          $('#today-temp').text("Temp:" + " " + response.current.temp + "F");
          $('#today-wind').text("Wind:" + " " + response.current.wind_speed + " " + "MPH");
          $('#today-humidity').text("Humidity:" + " " + response.current.humidity);
          $('#today-UV').text("UV Index:" + " " + response.current.uvi);

          // need to make moment code for date
          var tomorrow = moment().add(1, 'days');
          $("#0day-date").text(tomorrow.format('l'));
          $('#0day-icon').text(response.daily[0].weather[0].icon);
          // var tomIcon = "http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + "@2x.png"
          // $('#0day-icon').text(tomIcon);
          $('#0day-temp').text("Temp:" + " " + response.daily[0].temp.day + "F");
          $('#0day-wind').text("Wind:" + " " + response.daily[0].wind_speed + " " + "MPH");
          $('#0day-humidity').text("Humidity:" + " " + response.daily[0].humidity);

          var twoDaysOut = moment().add(2, 'days');
          $("#1day-date").text(twoDaysOut.format('l'));
          $('#1day-icon').text(response.daily[1].weather[0].icon);
          // var twoIcon = "http://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + "@2x.png"
          // $('#1day-icon').text(twoIcon);
          $('#1day-temp').text("Temp:" + " " + response.daily[1].temp.day + "F");
          $('#1day-wind').text("Wind:" + " " + response.daily[1].wind_speed + " " + "MPH");
          $('#1day-humidity').text("Humidity:" + " " + response.daily[1].humidity);

          var threeDaysOut = moment().add(3, 'days');
          $("#2day-date").text(threeDaysOut.format('l'));
          $('#2day-img').text(response.daily[2].weather[0].icon);
          $('#2day-temp').text("Temp:" + " " + response.daily[2].temp.day + "F");
          $('#2day-wind').text("Wind:" + " " + response.daily[2].wind_speed + " " + "MPH");
          $('#2day-humidity').text("Humidity:" + " " + response.daily[2].humidity);

          var fourDaysOut = moment().add(3, 'days');
          $("#3day-date").text(fourDaysOut.format('l'));
          $('#3day-img').text(response.daily[3].weather[0].icon);
          $('#3day-temp').text("Temp:" + " " + response.daily[3].temp.day + "F");
          $('#3day-wind').text("Wind:" + " " + response.daily[3].wind_speed + " " + "MPH");
          $('#3day-humidity').text("Humidity:" + " " + response.daily[3].humidity);

          var fiveDaysOut = moment().add(4, 'days');
          $("#4day-date").text(fiveDaysOut.format('l'));
          $('#4day-img').text(response.daily[4].weather[0].icon);
          $('#4day-temp').text("Temp:" + " " + response.daily[4].temp.day + "F");
          $('#4day-wind').text("Wind:" + " " + response.daily[4].wind_speed + " " + "MPH");
          $('#4day-humidity').text("Humidity:" + " " + response.daily[4].humidity);
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
