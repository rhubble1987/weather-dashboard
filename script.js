    //Pseudocode
    //1. When the user first accesses the page, the page will show "No city provided."
    
    //2. When the user enters a city, the city's current weater is displayed in the top card and the 5-day forecast is display in the card deck below it
    //2a. The returned name gets stored in the previous cities list and is then 
   
    
    function showPreviousSearches() {
      var savedCities = localStorage.getItem('savedCities');
      if (savedCities) {
        $('#saved-cities').append(savedCities);
      }
    }
    
   function getWeather(selectedCity) {
      
      var searchURLCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + selectedCity + "&units=imperial&appid=f235f1e0deb0b2e070d7e0e8c95f6295";
        
        //currentCity = localStorage.setItem('currentCity',"");
        
        console.log(searchURLCurrentWeather);
        $('#city-search').val("");
        $.ajax({
          url: searchURLCurrentWeather,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            var current = {
                city: response.name,
                temp: Math.round(response.main.temp) + '&deg;',
                high: Math.round(response.main.temp_max) + '&deg;',
                low: Math.round(response.main.temp_min) + '&deg;',
                weather: response.weather[0].main,
                humidity: response.main.humidity + '%',
                icon: response.weather[0].icon,
                lat: response.coord.lat,
                long: response.coord.lon
            }
            console.log(current);

            //3. If the user refreshes the page, the city will stay as the city whose weather is being displayed by being stored in local storage and being pulled on the new refresh as the query parameter
            localStorage.setItem('currentCity', current.city);
            $('#current-weather').attr('data-current-city', current.city);
            $('#current-weather').append('<div class="row no-gutters"><div class="col-3"><img src="https://openweathermap.org/img/wn/' + current.icon + '@4x.png" alt="An image of ' + current.weather + '."></div><div class="col-9"><div class="card-body"><h2 class="card-title">Currently in ' + current.city + '</h2><h3 class="card-text">' + current.temp + '</h3><h4 class="card-text">High: ' + current.high + '</h4><h4 class="card-text">Low: ' + current.low + '</h4><h4 class="card-text">Weather: ' + current.weather + '</h4><h4 class="card-text">Humidity: ' + current.humidity + '</h4></div></div></div>');
            
            //This determines if a new li needs to be appended or if there are no existing saved cities, to replace the placeholder text
            if ($('#first-saved').text() == 'No saved cities') {
              $('#first-saved').remove();
            }
            

            if (current.city !== selectedCity) {
              $('#saved-cities').append('<li class="list-group-item"><a href="#">' + current.city + '</a></li>');
            }
            
            
            
            

            //Then the current list of saved cities gets stored in local storage
            var savedCities = $('#saved-cities');
            localStorage.setItem('savedCities', savedCities.html());

            var searchURLForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + current.lat + "&lon=" + current.long + "&exclude=current,minutely,hourly&units=imperial&appid=f235f1e0deb0b2e070d7e0e8c95f6295";
            console.log(searchURLForecast);
            

            $('.card-deck').empty();
        
        $.ajax({
          url: searchURLForecast,
          method: "GET"
        }).then(function(response) {
          console.log(response);
          
          for (i = 1; i < 6; i++) {
          var forecastDays = {
              date: moment(response.daily[i].dt, 'X').format('MM/DD'),
              high: Math.round(response.daily[i].temp.max) + '&deg;',
              low: Math.round(response.daily[i].temp.min) + '&deg;',
              weather: response.daily[i].weather[0].main,
              icon: response.daily[i].weather[0].icon,
            }
            console .log(forecastDays);
            $('.card-deck').append('<div class="card"><div class="card-body"><h4 class="card-title text-center">' + forecastDays.date + '</h4><img src="https://openweathermap.org/img/wn/' + forecastDays.icon + '@2x.png" class="card-img" alt="An image of ' + forecastDays.weather + '."><p class="card-text">High: ' + forecastDays.high + '</p><p class="card-text">Low: ' + forecastDays.low + '</p><p class="card-text">Weather: ' + forecastDays.weather + '</p></div></div>');
          }

      
        });

      });

    }
    //On page load, the page will pull the last current city if one exists and load its weather
    $(function(){
      var currentCity = localStorage.getItem('currentCity');
      if (currentCity) {
        var selectedCity = currentCity;
      $('#current-weather').empty();
      console.log(selectedCity);
      getWeather(selectedCity);
      showPreviousSearches(); 
      }     

    });
    
     $('#search').on('click', function(){
      $('#current-weather').empty();
         var selectedCity = $('#city-search').val();
      
      console.log(selectedCity);
      getWeather(selectedCity);
     });
    
      $('a').on('click', function(event){
         var selectedCity = event.target.textContent;
         getWeather(selectedCity);
     });
       
       
  
     
     /* $('#search').on('click', function(event) {
        event.preventDefault();
        //4. The user can then search for another city and its weather will be displayed
        $('#current-weather').empty();
        var citySearch = $('#city-search').val();
        getWeather();
    });

    //Function to get the current weather for a saved city
    $('#saved-cities').on('click', function(event){
      $('#current-weather').empty();
      getWeather();
    }); */


    

    
    
    //6. When the user clicks the link of the corresponding city, it's weather info will be displayed