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
var foreCasted = document.getElementById('5-day-forecast');
var foreCasted5 = $("5-day-forecast");


var arrayName = JSON.parse(localStorage.getItem("name")) || [];
showHistory();

fetch(requestUrl)
  //fetch is first calling for the URL the promising to wait until it is ready to

  .then(function (response) {
    return response.json();
  })
  .then(function (data) {});

function display(theCity) {

  var requestUrl = urlFront.concat(theCity, urlEnd)

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
      displayInfoContainer.textContent = "";
      var divStyle = document.createElement('div');

      divStyle.setAttribute("class", "card bg-primary col-sm-offset-6");
      divStyle.setAttribute("style", "width:18rem height:40rem ");



      var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";


      cityName.textContent = data.name + " " + moment().format('L');
      weatherIcon.setAttribute("src", iconurl);
      mainTemp.textContent = "Tempature:" + " " + data.main.temp + "\xB0" + "F";
      mainHumidity.textContent = "Humidity:" + " " + data.main.humidity + "%";
      windSpeed.textContent = "Current Wind Speed:" + " " + data.wind.speed + "MPH";

      divStyle.append(cityName);
      divStyle.append(weatherIcon);
      divStyle.append(mainTemp);
      divStyle.append(mainHumidity);
      divStyle.append(windSpeed);

      displayInfoContainer.append(divStyle);

      var newUrlFront2 = "https://api.openweathermap.org/data/2.5/forecast?q="
      console.log(cityName);
      console.log(typeof cityName);
      var requestUrl = newUrlFront2.concat(theCity, urlEnd);
      console.log(requestUrl);
      fetch(requestUrl)

        .then(function (response) {
          return response.json();
        })
        .then(function (data) {


          console.log(data);

          var iconurl = "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";

          var duration = moment.duration({
            'days': 1
          });

          for (let index = 0; index < 5; index++) {

            var cityName1 = document.createElement('p');
            var weatherIcon1 = document.createElement('img');
            var mainTemp1 = document.createElement('p');
            var mainHumidity1 = document.createElement('p');
            var windSpeed1 = document.createElement('p');
            var styleDiv = document.createElement('div');

            styleDiv.setAttribute("class", "card"[index]);
            
            cityName1.textContent = data.city.name + " " + (moment().add(duration).add([index], 'd').format('L'));
            weatherIcon1.setAttribute("src", iconurl);
            mainTemp1.textContent = "Tempature:" + " " + data.list[index].main.temp + "\xB0" + "F";
            mainHumidity1.textContent = "Humidity:" + " " + data.list[index].main.humidity + "%";
            windSpeed1.textContent = "Current Wind Speed:" + " " + data.list[index].wind.speed + "MPH";

            styleDiv.append(cityName1);
            styleDiv.append(weatherIcon1);
            styleDiv.append(mainTemp1);
            styleDiv.append(mainHumidity1);
            styleDiv.append(windSpeed1);


            foreCasted.append(styleDiv);

          }

        });

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

          divStyle.append(uvIndex);
          uvIndex.textContent = "UV Index:" + " " + data.current.uvi;

          displayInfoContainer.append(divStyle);

          var uviColor1 = data.current.uvi;

          if (uviColor1 < 2) {
            uvIndex.setAttribute("class", "bg-success");
          } else if (3 < uviColor1 < 5) {
            uvIndex.setAttribute("class", "bg-warning");
          } else if (6 < uviColor1 < 7) {
            uvIndex.setAttribute("class", "bg-danger");
          } else if (8 < uviColor1 < 10) {
            uvIndex.setAttribute("class", "bg-danger");
          } else if (uviColor1 > 10) {
            uvIndex.setAttribute("class", "bg-danger");
          }

          
        });


    });

}

function showHistory() {
  previousSearchEl.empty();
  for (let index = 0; index < arrayName.length; index++) {
    previousSearchEl.append('<li class="cityName btn btn-outline-primary">' + arrayName[index] + '</li>');
  }
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

  display(cityName);

}

searchFormEl.on('submit', handleFormSubmit);

previousSearchEl.on('click', ".cityName", function () {
  foreCasted.innerHTML = "";
  searchFormEl.empty();
  console.log($(this).text());
  display($(this).text())
})