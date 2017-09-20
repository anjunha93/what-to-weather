

    // This is our API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
      "q=austin&units=imperial&appid=" + APIKey;

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
        $(".city").html(response.name + ", TX");
        $(".temp").html("Temperature (F) " + response.main.temp);
        $("#today-display").html("Weather: " + response.weather[0].main);

        // Log the data in the console as well
        console.log("Temperature (F): " + response.main.temp);
        console.log("Weather: " + response.weather[0].main)

        // If statements to load weather icons
        var weather = response.weather[0].main;
    
            if (response.weather[0].main == "Clear") {
                $('#today-display').html('<img src="http://www.iconarchive.com/download/i89288/icons8/ios7/Weather-Rain.ico" />');
            }
        
      });

      