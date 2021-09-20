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

var arrayName = JSON.parse(localStorage.getItem("name")) || [];
console.log(arrayName);
showHistory();

fetch(requestUrl)
  //fetch is first calling for the URL the promising to wait until it is ready to

  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    console.log(data);
  });
  function display(cityName){
    
    var requestUrl = urlFront.concat(cityName, urlEnd)

    // console.log(cityName);
  
    // console.log(requestUrl);
    // This fetch statement takes the users input and returns the correct cities api 
    fetch(requestUrl)
  
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
  
          var cityName = document.createElement('p');
          var weatherIcon = document.createElement('img');
          var mainTemp = document.createElement('p');
          var mainHumidity = document.createElement('p');
          var windSpeed = document.createElement('p');
          var latitude = JSON.stringify(data.coord.lat);
          var longitude = JSON.stringify(data.coord.lon);
          var uvIndex = document.createElement('p');
          displayInfoContainer.textContent="";
  
          var date = new Date();
          var dateMonth = date.toLocaleDateString();
          
          var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
          
  
          cityName.textContent = data.name + " " + dateMonth;
          weatherIcon.setAttribute("src", iconurl);
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
  
          
          console.log(latitude);
          console.log(longitude);

          var newUrlFront = "https://api.openweathermap.org/data/2.5/onecall?"
  
          var requestUrl = newUrlFront.concat(urlLat, latitude, urlLon, longitude, urlEnd);

           
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
        uvIndex.textContent = "UV Index:" + data.current.uvi;

          displayInfoContainer.append(uvIndex);
        console.log(data); 
            
      });
  
  });
  }

  function showHistory() {
    previousSearchEl.empty();
    for (let index = 0; index < arrayName.length; index++) {
      previousSearchEl.append('<li class="cityName">' + arrayName[index] + '</li>');     
    }
    
    $('.cityName').on('click', function(){
    display($(this).text())
    })
  }
function handleFormSubmit(event) {
  event.preventDefault();

  
  var cityName = $('input[name="searchBox"]').val();
  arrayName.push(cityName);
  localStorage.setItem("name", JSON.stringify(arrayName));
  showHistory();
 

  
  
  // if there's nothing in the form entered, don't print to the page
  if (!cityName) {
    alert('No search item filled out in form!');
    return;
  }
  // $('input[name="searchBox"]').val('');
  display(cityName);

}

searchFormEl.on('submit', handleFormSubmit);