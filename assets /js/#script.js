var searchHistoryEl = $('#searchHistory');
var searchButton = $('#btn-search');
var searchHistoryList = JSON.parse(localstorage.getItem('cityStorageArray')) || [];
searchButton.on('click', captureInput);
const apiKey = '6412a076b8f58bed7ba8a0790eba533a';
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=6412a076b8f58bed7ba8a0790eba533a'

function renderSavedData() {
  searchHistoryEl.text('')
  for (var i = 0; i < searchHistoryList.length; i++)
  $('<button class="btn btn-success searchButton m-3" type="button">').text(searchHistoryList[i].attr('whenClicked', 'bringDataBack(' + searchHistoryList[i] + ')')).appendTo(searchHistoryEl)
};

function captureInput() {
  var citySearch = $('#searchCity').val();
  getWeather(citySearch);
  localStorage.setItem('cityStorageArray', JSON.stringify(searchHistoryList));
  searchHistoryList.push(citySearch);
  renderSavedData();
};

function getWeather(city) {
  var geocodeAPI = 'https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=&appid=6412a076b8f58bed7ba8a0790eba533a'
  fetch(geocodeAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var lat = data[0].lat
    var lon = data[0].lon  
    var urlCurrentWeather ='https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=6412a076b8f58bed7ba8a0790eba533a'
    fetch(urlCurrentWeather)
    .then(function (response) {
      return response.json();
    })
  })
  .then(function (data) {
    $('#largeCity').text(data.name);
    var date = new Date(data.dt *1000);
    $('#largeDate').text(date.toUTCString());
    $('#largeICon').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png').attr('alt', data.weather[0].description);
    $('#largeDesc').text(data.weather[0].description);
    $('#largeTemp').text('' + data.main.temp + '\u00B0F');
    $('#largeWind').text('' + data.wind.speed + 'mph');
    $('largeHumidity').text('' + data.main.humidity + '% Humidity');
  });

  var url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=6412a076b8f58bed7ba8a0790eba533a"
      fetch(url)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        $('#day1city').text(data.city.name)
        var date1 = new Date(data.list[4].dt_txt)
        $('#day1date').text(date1.toUTCString());
        $('#day1icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[4].weather[0].icon + '.png').attr('alt', data.list[8].weather[0].description);
        $('#day1Desc').text(data.list[4].weather[0].description);
        $('#day1temp').text(data.list[4].main.temp + '\u00B0F');
        $('#day1wind').text(data.list[4].wind.speed + 'mph');
        $('#day1humid').text(data.list[4].main.humidity + '% Humidity');
        $('#day2city').text(data.city.name)
        var date2 = new Date(data.list[12].dt_txt)
        $('#day2date').text(date2.toUTCString());
        $('#day2icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[12].weather[0].icon + '.png').attr('alt', data.list[16].weather[0].description);
        $('#day2Desc').text(data.list[12].weather[0].description);
        $('#day2temp').text(data.list[12].main.temp + '\u00B0F');
        $('#day2wind').text(data.list[12].wind.speed + 'mph');
        $('#day2humid').text(data.list[12].main.humidity + '% Humidity');
        $('#day3city').text(data.city.name)
        var date3 = new Date(data.list[20].dt_txt)
        $('#day3date').text(date3.toUTCString());
        $('#day3icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[20].weather[0].icon + '.png').attr('alt', data.list[24].weather[0].description);
        $('#day3Desc').text(data.list[20].weather[0].description);
        $('#day3temp').text(data.list[20].main.temp + '\u00B0F');
        $('#day3wind').text(data.list[20].wind.speed + 'mph');
        $('#day3humid').text(data.list[20].main.humidity + '% Humidity');
        $('#day4city').text(data.city.name)
        var date4 = new Date(data.list[28].dt_txt)
        $('#day4date').text(date4.toUTCString());
        $('#day4icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[28].weather[0].icon + '.png').attr('alt', data.list[32].weather[0].description);
        $('#day4Desc').text(data.list[28].weather[0].description);
        $('#day4temp').text(data.list[28].main.temp + '\u00B0F');
        $('#day4wind').text(data.list[28].wind.speed + 'mph');
        $('#day4humid').text(data.list[28].main.humidity + '% Humidity');
        $('#day5city').text(data.city.name)
        var date5 = new Date(data.list[36].dt_txt)
        $('#day5date').text(date5.toUTCString());
        $('#day5icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[36].weather[0].icon + '.png').attr('alt', data.list[39].weather[0].description);
        $('#day5Desc').text(data.list[36].weather[0].description);
        $('#day5temp').text(data.list[36].main.temp + '\u00B0F');
        $('#day5wind').text(data.list[36].wind.speed + 'mph');
        $('#day5humid').text(data.list[36].main.humidity + '% Humidity');
    });
  }
  function bringDataBack (fromHistory) {
    getWeather(fromHistory);
  }
  renderSavedData();