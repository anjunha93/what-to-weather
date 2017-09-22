// ====================================================
//                API and Ajax Setup
// ====================================================

    // This is our API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=austin&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .done(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $(".city").html(response.city.name + ", TX");
        $(".temp").html("Temperature (F) " + response.list[0].temp.day);

// ====================================================
//                   Functions
// ====================================================

        
    function skyStatus() {
        
        for (var i = 0; i < response.list.length; i++) {

            var sky = response.list[i].weather[0].id;  
            
            console.log("Sky Response",sky);
            console.log("Our response", response.list[i].description);

            if (sky == 800 ) {
                console.log("Clear Sky");
                $('#today-display').html('<img src="https://image.freepik.com/free-icon/clear-sun_318-30039.jpg" class="weatherIcon" />');
            }
            
            else if (sky >= 801 && sky < 804 ) {
                console.log("Clouds");
                $('#today-display').html('<img src="http://www.iconarchive.com/download/i89285/icons8/ios7/Weather-Partly-Cloudy-Day.ico" class="weatherIcon" />');
            }

            else if (sky >= 300 && sky < 531 ) {
                console.log('rain');
                $('#today-display').html('<img src="http://icons.iconarchive.com/icons/icons8/ios7/512/Weather-Storm-icon.png" class="weatherIcon" />');
            }

           else if (sky >= 600 && sky < 622 ) {
                console.log("snow");
                $('#today-display').html('<img src="https://maxcdn.icons8.com/Share/icon/Weather//snow1600.png" class="weatherIcon" />');
            }

        }
        // debugging
        console.log(sky);
    }

    function weekForecast() {

        for (var i = 0; i < response.list.length; i++) {

            var showWeek = response.list[i].dt; 
            var randomDate = moment.unix(showWeek/1000).format("ddd");
            console.log(showWeek);  
            console.log(randomDate);
            $(".test").append(randomDate);
        }
    }


    

// ====================================================
//                   Main process
// ====================================================

    // Calling days of the week per fucntion
    skyStatus();
    weekForecast();
   
// End of api function
});

      