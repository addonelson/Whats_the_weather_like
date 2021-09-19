var requestUrl = "https://api.openweathermap.org/data/2.5/weather?zip=18069&appid=7d282d199e07196a5e27e952c3b7e02c";
var urlFront = "https://api.openweathermap.org/data/2.5/weather?q="
var urlEnd = "&units=imperial&appid=7d282d199e07196a5e27e952c3b7e02c"
var urlLat = "lat="
var urlLon = "&lon="
// var city = $('#searchBox');

// var newURL = urlFront.concat(city, urlEnd)
var searchEl = $('#search');
var searchBoxEl = $('#searchBox');
var previousSearchEl = $('#previousSearch');
var searchFormEl = $('#search-form');
var previousSpan = document.querySelector('#previousSearch');
var displayInfoContainer = document.getElementById('displayInfo');




fetch(requestUrl)
  //fetch is first calling for the URL the promising to wait until it is ready to

  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    console.log(data);
  });

function handleFormSubmit(event) {
  event.preventDefault();

  var pastSearch = $('input[name="searchBox"]').val();
  // if there's nothing in the form entered, don't print to the page
  if (!pastSearch) {
    alert('No search item filled out in form!');
    return;
  }

  previousSearchEl.append('<li>' + pastSearch + '</li>');

  $('input[name="searchBox"]').val('');

  var requestUrl = urlFront.concat(pastSearch, urlEnd)

  // console.log(pastSearch);

  // console.log(requestUrl);
  // This fetch statement takes the users input and returns the correct cities api 
  fetch(requestUrl)

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      // for (var i = 0; i < data.length; i++) {

        var cityName = document.createElement('p');
        var weatherIcon = document.createElement('p');
        var mainTemp = document.createElement('p');
        var mainHumidity = document.createElement('p');
        var windSpeed = document.createElement('p');
        var latitude = JSON.stringify(data.coord.lat);
        var longitude = JSON.stringify(data.coord.lon);
        var uvIndex = document.createElement('p');

        var date = new Date();
        var dateMonth = date.toLocaleDateString();
        

        

        cityName.textContent = data.name + " " + dateMonth;
        weatherIcon.textContent = data.weather[0].icon;
        mainTemp.textContent = "Tempature:" + " " + data.main.temp + "\xB0" + "F";
        mainHumidity.textContent = "Humidity:" + " " + data.main.humidity + "%";
        windSpeed.textContent = "Current Wind Speed:" + " " + data.wind.speed + "MPH";

        displayInfoContainer.append(cityName);
        displayInfoContainer.append(weatherIcon);
        displayInfoContainer.append(mainTemp);
        displayInfoContainer.append(mainHumidity);
        displayInfoContainer.append(windSpeed);

        latitude.textContent = data.coord.lat;
        longitude.textContent = data.coord.lon;

        // JSON.stringify(latitude);
        // JSON.stringify(longitude);

        console.log(latitude);
        console.log(longitude);

        var requestUrl = urlFront.concat(urlLat, latitude, urlLon, longitude);

        console.log(data);
        console.log(data.name);
        console.log(data.weather[0].icon);
        console.log(data.main.temp);
        console.log(data.main.humidity);
        console.log(data.wind.speed);

        fetch(requestUrl)

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      console.log(data); 
        
       

        // for (var i = 0; i < data.length; i++){
        //   console.log(data[i].name);
        //   console.log(data[i].weather[0].icon);
        //   console.log(data[i].main.temp);
        //   console.log(data[i].main.humidity);
        //   console.log(data[i].wind.speed);

        // }
      // }

    });

});

}

// function handleSearch(){
//   var cityWeather = localStorage.getItem('previousSearch');

//   previousSpan.textContent = cityWeather;

//   var span = document.querySelector('#searchBox').value;

//   localStorage.setItem("previousSearch", span)

// }  

searchFormEl.on('submit', handleFormSubmit);