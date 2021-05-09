
var searchFormE1 = document.querySelector('#search-form');
var searchButton = document.querySelector('#search-button');
var cityInput = document.querySelector('#search-input');
var pastCitiesbtn = $('.pastSearch')
// var searchCityList = document.querySelector('.search-history');
var searchHistory = []
// get the localStorage and set search history to saved array of searches outside of handleCitySearchSubmit function first
function displayLocalStorage() {
  var displayCitySearch = JSON.parse(localStorage.getItem('searchHistory'));

  if (displayCitySearch) {
    $('#previous-search').empty()

    for (let i = 0; i < displayCitySearch.length; i++) {
      $('#previous-search').append('<button class="pastSearch">' + displayCitySearch[i] + "</button>")
    }
  }
}

$(document).on('click', '.pastSearch', function(event) {
  event.preventDefault();
  console.log('clicked past search button');
  console.log('name is array', JSON.parse(localStorage.getItem('searchHistory')))
  
  // var needToFigureOut = the name of the city on the button from localStorage

  var geocodeQueryUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${needToFigureOut},&limit=5&appid=af8f9e641174c07751bae2f5bbbc3fb5&units=imperial`;
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
          // console.log('WEATHER DATA!:', response);
          var iconCodeToday = response.current.weather[0].icon
          var iconUrlToday = `https://openweathermap.org/img/w/${iconCodeToday}.png`
          $('#weather-icon').html(`<img src="${iconUrlToday}" />`);

          $('#today-temp').text("Temp:" + " " + response.current.temp + "F");
          $('#today-wind').text("Wind:" + " " + response.current.wind_speed + " " + "MPH");
          $('#today-humidity').text("Humidity:" + " " + response.current.humidity);
          // UV Index: it needs to change color based on the index number
          $('#today-UV').text("UV Index:" + " " + response.current.uvi);

          var tomorrow = moment().add(1, 'days');
          $("#0day-date").text(tomorrow.format('l'));
          var iconCode0 = response.daily[0].weather[0].icon
          var iconUrl0 = `https://openweathermap.org/img/w/${iconCode0}.png`
          $('#0day-icon').html(`<img src="${iconUrl0}" />`);
          $('#0day-temp').text("Temp:" + " " + response.daily[0].temp.day + "F");
          $('#0day-wind').text("Wind:" + " " + response.daily[0].wind_speed + " " + "MPH");
          $('#0day-humidity').text("Humidity:" + " " + response.daily[0].humidity);

          var twoDaysOut = moment().add(2, 'days');
          $("#1day-date").text(twoDaysOut.format('l'));
          var iconCode1 = response.daily[1].weather[0].icon
          var iconUrl1 = `https://openweathermap.org/img/w/${iconCode1}.png`
          $('#1day-icon').html(`<img src="${iconUrl1}" />`);
          $('#1day-temp').text("Temp:" + " " + response.daily[1].temp.day + "F");
          $('#1day-wind').text("Wind:" + " " + response.daily[1].wind_speed + " " + "MPH");
          $('#1day-humidity').text("Humidity:" + " " + response.daily[1].humidity);

          var threeDaysOut = moment().add(3, 'days');
          $("#2day-date").text(threeDaysOut.format('l'));
          var iconCode2 = response.daily[2].weather[0].icon
          var iconUrl2 = `https://openweathermap.org/img/w/${iconCode2}.png`
          $('#2day-icon').html(`<img src="${iconUrl2}" />`);
          $('#2day-temp').text("Temp:" + " " + response.daily[2].temp.day + "F");
          $('#2day-wind').text("Wind:" + " " + response.daily[2].wind_speed + " " + "MPH");
          $('#2day-humidity').text("Humidity:" + " " + response.daily[2].humidity);

          var fourDaysOut = moment().add(3, 'days');
          $("#3day-date").text(fourDaysOut.format('l'));
          var iconCode3 = response.daily[3].weather[0].icon
          var iconUrl3 = `https://openweathermap.org/img/w/${iconCode3}.png`
          $('#3day-icon').html(`<img src="${iconUrl3}" />`);
          $('#3day-temp').text("Temp:" + " " + response.daily[3].temp.day + "F");
          $('#3day-wind').text("Wind:" + " " + response.daily[3].wind_speed + " " + "MPH");
          $('#3day-humidity').text("Humidity:" + " " + response.daily[3].humidity);

          var fiveDaysOut = moment().add(4, 'days');
          $("#4day-date").text(fiveDaysOut.format('l'));
          var iconCode4 = response.daily[4].weather[0].icon
          var iconUrl4 = `https://openweathermap.org/img/w/${iconCode4}.png`
          $('#4day-icon').html(`<img src="${iconUrl4}" />`);
          $('#4day-temp').text("Temp:" + " " + response.daily[4].temp.day + "F");
          $('#4day-wind').text("Wind:" + " " + response.daily[4].wind_speed + " " + "MPH");
          $('#4day-humidity').text("Humidity:" + " " + response.daily[4].humidity);
        });
    });
  
})

displayLocalStorage()


function handleCitySearchSubmit(event) {
  event.preventDefault();

  document.getElementById("top-right").style.visibility = "visible";
  document.getElementById("bottom-right").style.visibility = "visible";

  var searchInputVal = cityInput.value;
  console.log('city:', searchInputVal);

  var localstorageSearches = JSON.parse(localStorage.getItem('searchHistory')) || [];
  localstorageSearches.push(searchInputVal)
  localStorage.setItem('searchHistory', JSON.stringify(localstorageSearches))
 
  displayLocalStorage()

  var geocodeQueryUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInputVal},&limit=5&appid=af8f9e641174c07751bae2f5bbbc3fb5&units=imperial`;
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
          // console.log('WEATHER DATA!:', response);
          var iconCodeToday = response.current.weather[0].icon
          var iconUrlToday = `https://openweathermap.org/img/w/${iconCodeToday}.png`
          $('#weather-icon').html(`<img src="${iconUrlToday}" />`);

          $('#today-temp').text("Temp:" + " " + response.current.temp + "F");
          $('#today-wind').text("Wind:" + " " + response.current.wind_speed + " " + "MPH");
          $('#today-humidity').text("Humidity:" + " " + response.current.humidity);
          // UV Index: it needs to change color based on the index number
          $('#today-UV').text("UV Index:" + " " + response.current.uvi);

          var tomorrow = moment().add(1, 'days');
          $("#0day-date").text(tomorrow.format('l'));
          var iconCode0 = response.daily[0].weather[0].icon
          var iconUrl0 = `https://openweathermap.org/img/w/${iconCode0}.png`
          $('#0day-icon').html(`<img src="${iconUrl0}" />`);
          $('#0day-temp').text("Temp:" + " " + response.daily[0].temp.day + "F");
          $('#0day-wind').text("Wind:" + " " + response.daily[0].wind_speed + " " + "MPH");
          $('#0day-humidity').text("Humidity:" + " " + response.daily[0].humidity);

          var twoDaysOut = moment().add(2, 'days');
          $("#1day-date").text(twoDaysOut.format('l'));
          var iconCode1 = response.daily[1].weather[0].icon
          var iconUrl1 = `https://openweathermap.org/img/w/${iconCode1}.png`
          $('#1day-icon').html(`<img src="${iconUrl1}" />`);
          $('#1day-temp').text("Temp:" + " " + response.daily[1].temp.day + "F");
          $('#1day-wind').text("Wind:" + " " + response.daily[1].wind_speed + " " + "MPH");
          $('#1day-humidity').text("Humidity:" + " " + response.daily[1].humidity);

          var threeDaysOut = moment().add(3, 'days');
          $("#2day-date").text(threeDaysOut.format('l'));
          var iconCode2 = response.daily[2].weather[0].icon
          var iconUrl2 = `https://openweathermap.org/img/w/${iconCode2}.png`
          $('#2day-icon').html(`<img src="${iconUrl2}" />`);
          $('#2day-temp').text("Temp:" + " " + response.daily[2].temp.day + "F");
          $('#2day-wind').text("Wind:" + " " + response.daily[2].wind_speed + " " + "MPH");
          $('#2day-humidity').text("Humidity:" + " " + response.daily[2].humidity);

          var fourDaysOut = moment().add(3, 'days');
          $("#3day-date").text(fourDaysOut.format('l'));
          var iconCode3 = response.daily[3].weather[0].icon
          var iconUrl3 = `https://openweathermap.org/img/w/${iconCode3}.png`
          $('#3day-icon').html(`<img src="${iconUrl3}" />`);
          $('#3day-temp').text("Temp:" + " " + response.daily[3].temp.day + "F");
          $('#3day-wind').text("Wind:" + " " + response.daily[3].wind_speed + " " + "MPH");
          $('#3day-humidity').text("Humidity:" + " " + response.daily[3].humidity);

          var fiveDaysOut = moment().add(4, 'days');
          $("#4day-date").text(fiveDaysOut.format('l'));
          var iconCode4 = response.daily[4].weather[0].icon
          var iconUrl4 = `https://openweathermap.org/img/w/${iconCode4}.png`
          $('#4day-icon').html(`<img src="${iconUrl4}" />`);
          $('#4day-temp').text("Temp:" + " " + response.daily[4].temp.day + "F");
          $('#4day-wind').text("Wind:" + " " + response.daily[4].wind_speed + " " + "MPH");
          $('#4day-humidity').text("Humidity:" + " " + response.daily[4].humidity);
        });
    });
  }

  searchButton.addEventListener('click', handleCitySearchSubmit);

