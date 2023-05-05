localStorage.clear();

function findCity() {
  var cityName = titleCase($('#cityName')[0].value.trim());
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=6412a076b8f58bed7ba8a0790eba533a';
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      $('#city-name')[0].textContext = cityName + ' (' + moment().format('MM.DD.YYYY');
      $('#city-list').append('<button type="button" class="list-group-item city-name">' + cityName);

      const lat = data.coord.lat;
      const lon = data.coord.lon;

      var latLonPair = lat.toString() + '' + lon.toString();

      localStorage.setItem(cityName, latLonPair);
      apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=6412a076b8f58bed7ba8a0790eba533a";
      
      fetch(apiUrl).then(function (newResponse) {
        if (newResponse.ok) {
          newResponse.json().then(function (newData) {
            getCurrentWeather(newData);
          })
        }
      })
    })
  })
} 
function getListCity(coordinates) {
  apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + coordinates[0] + "&lon=" + coordinates[1] + "&exclude=minutely,hourly&units=imperial&appid=6412a076b8f58bed7ba8a0790eba533a";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        getCurrentWeather(data);
      })
    }
  })
}

function getCurrentWeather(data) {
  $('.results-panel').addClass('visible');
  $('#currentIcon')[0].src = 'https://openweathermap.org/img/wn' + data.current.weather[0].icon + '@2x.png';
  $('#temperature')[0].textContext = 'Temperature: ' + data.current.temp.toFixed(1) + " \u00B0F";
  $('#wind-speed')[0].textContext = 'Wind Speed: ' + data.current.wind.speed.toFixed(1) + " MPH";
  $('#humidity')[0].textContext = 'Humidity: ' + data.current.humidity + "% ";

    getFutureWeather(data);
}
function getFutureWeather(data) {
  for (var i = 0; i < 5; i++) {
    var futureWeather = {
      date: toUTCString (data, i),
      icon: 'https://openweathermap.org/img/wn' + data.daily[i + 1].weather[0].icon + "@2x.png",
      temp: data.daily[i + 1].temp.day.toFixed(1),
      humidity: data.daily[i + 1].humidity,
    }
    var currentSelector = '#day-' + i;
    $(currentSelector)[0].textContext = futureWeather.date;
    currentSelector = 'img-' + i;
    $(currentSelector)[0].src = futureWeather.icon;
    currentSelector = '#temp-' + i;
    $(currentSelector)[0].textContext = 'Temp: ' + futureWeather.temp + "\u00B0F";
    currentSelector = '#hum-' + i;
    $(currentSelector)[0].textContext = 'Humidity: ' + futureWeather.humidity + "%";
  }
}
function titleCase(city) {
  var newCity = city.toLowerCase().split(' ');
  var returnedCity = '';
  for (var i = 0; i < newCity.length; i++) {
    newCity[i] = newCity[i][0].toUpperCase() + newCity[i].slice(1);
    returnedCity+= ' ' + newCity[i];
  }
  return returnedCity;
}
$('#search-button').on('click', function (e) {
  e.preventDefault();

  findCity();
  $('form')[0].reset();
})

$('.city-list-box').on('click', '.city-name', function() {
  var coordinates = (localStorage.getItem($(this)[0].textContext)).split(' ');
  coordinates[0] = parseFloat(coordinates[0]);
  coordinates[1] = parseFloat(coordinates[1]);

  $('#city-name')[0].textContext = $(this)[0].textContext + ' (' + moment().format('MM.DD.YYYY') + ')';

  getListCity(coordinates);
})
