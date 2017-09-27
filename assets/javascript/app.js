// ====================================================
//                EBAY
// ====================================================

// Replace MyAppID with your Production AppID
var url = "https://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=JunAhn-whattowe-PRD-25d80d3bd-a2be6d29";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&callback=_cb_findItemsByKeywords";
    url += "&REST-PAYLOAD";
    url += "&keywords=men's%20flip-flops";
    url += "&paginationInput.entriesPerPage=10";
    // Submit the request
    s=document.createElement('script'); // create script element
    s.src= url;
    document.body.appendChild(s);

// Parse the response and build an HTML table to display search results
function _cb_findItemsByKeywords(root) {
    var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
    var html = [];
    html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
    for (var i = 0; i < items.length; ++i) {
    var item     = items[i];
    var title    = item.title;
    var pic      = item.galleryURL;
    var viewitem = item.viewItemURL;
    if (null != title && null != viewitem) {
      html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
      '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
    }
  }
  html.push('</tbody></table>');
  document.getElementById("results").innerHTML = html.join("");
}  // End _cb_findItemsByKeywords() function


// ====================================================
//                API and Ajax Setup
// ====================================================


   // This is our API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

   // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=austin&units=imperial&appid=" + APIKey;

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

       // creating current day temp and displaying
       var dayTemp = response.list[0].temp.day;
       var currentTemp = Math.ceil(dayTemp) + ' \xB0F';

      // Transfer content to HTML
       $(".city").html(response.city.name + ", TX");
       $(".temp").html(currentTemp);

// ====================================================
//                   Functions
// ====================================================

       
function skyStatus() {
    
    // assigning the current weather status
    var sky = response.list[0].weather[0].id;  
    
    console.log("Sky Response",sky);
    console.log("Our response", sky);

    // if statements to show the weather icon based on the id condition
    if (sky == 800 ) {
        console.log("Clear Sky");
        $('#today-display').html('<img src="https://image.flaticon.com/icons/svg/23/23389.svg" class="weatherIcon center-block" />');
    }
    
    else if (sky >= 801 && sky < 805 ) {
        console.log("Clouds", sky);
        $('#today-display').html('<img src="http://www.iconarchive.com/download/i89285/icons8/ios7/Weather-Partly-Cloudy-Day.ico" class="weatherIcon center-block" />');
    }

    else if (sky >= 300 && sky < 531 ) {
        console.log('rain');
        $('#today-display').html('<img src="http://icons.iconarchive.com/icons/icons8/ios7/512/Weather-Storm-icon.png" class="weatherIcon center-block" />');
    }

    else if (sky >= 200 && sky < 233 ) {
        console.log('thunderstorm');
        $('#today-display').html('<img src="http://icons.iconarchive.com/icons/icons8/ios7/512/Weather-Storm-icon.png" class="weatherIcon center-block" />');
    }

    else if (sky >= 600 && sky < 622 ) {
        console.log("snow");
        $('#today-display').html('<img src="https://maxcdn.icons8.com/Share/icon/Weather//snow1600.png" class="weatherIcon center-block" />');
    }

    // debugging
    console.log(sky);
}

function weekForecast() {
    // looping the week and gathering the weather data 
    for (var i = 1; i < response.list.length; i++) {

        // assigning day of the week day
        var showWeek = response.list[i].dt;
        var formattedDay = moment.unix(showWeek).format("ddd");

        // assigning high/low
        var highTemp = response.list[i].temp.max;
        var showHighTemp = Math.ceil(highTemp) + ' \xB0';
        var lowTemp = response.list[i].temp.min;
        var showLowTemp = Math.ceil(lowTemp) + ' \xB0';
        
        console.log("high temp",showHighTemp);
        console.log("low temp",showLowTemp);

        // assigning weather condition
        var showWeather = response.list[i].weather[0].id;

        // creating page elements
        var weatherContainer = $('<div class="col-md-2 col-sm-2">');
        var pFormattedDay = $('<p class="text-center">').text(formattedDay);
        var iconImg = $('<img class="weekIcon center-block">');
        var highLowTemp = $('<p class="text-center">').text(showHighTemp + "/ " + showLowTemp);

            // if statements to show the weather icon based on the id condition
        if (showWeather == 800 ) {
            console.log("Clear showWeather");
            iconImg.attr("src", "https://image.flaticon.com/icons/svg/23/23389.svg", "class", "weatherIcon");
        }
        
        else if (showWeather >= 801 && showWeather < 805 ) {
            console.log("Clouds", showWeather);
            iconImg.attr('src', "http://www.iconarchive.com/download/i89285/icons8/ios7/Weather-Partly-Cloudy-Day.ico", 'class', "weatherIcon");
        }

        else if (showWeather >= 300 && showWeather < 531 ) {
            console.log('rain');
            iconImg.attr('src', "http://downloadicons.net/sites/default/files/little-rain-icon-61662.png", 'class', "weatherIcon");
        }

        else if (showWeather >= 200 && showWeather < 233 ) {
            console.log('thunderstorm');
            iconImg.attr('src', "http://icons.iconarchive.com/icons/icons8/ios7/512/Weather-Storm-icon.png", 'class', "weatherIcon");
        }

        else if (showWeather >= 600 && showWeather < 622) {
            console.log("snow");
            iconImg.attr('src', "https://maxcdn.icons8.com/Share/icon/Weather//snow1600.png", 'class', "weatherIcon");
        }

        // appending to weatherContainer div
        weatherContainer.append(pFormattedDay);
        weatherContainer.append(iconImg);
        weatherContainer.append(highLowTemp);
        

        // appending elements to page
        $('#weatherContainer').append(weatherContainer);
        console.log(showWeek);  
        console.log(formattedDay);
        console.log(showWeather);
    }
}

  function modal() {

     // looping the week and gathering the weather data 
     for (var i = 1; i < response.list.length; i++) {

         // assigning the current weather status
        var sky = response.list[0].weather[0].id;  
        
        // if statements to show the weather icon based on the id condition
        if (sky == 800 ) {
            console.log("Clear Sky");
            $('.currentDayModal').html('<img src="https://image.flaticon.com/icons/svg/23/23389.svg" class="weatherIconModal center-block img-responsive" />');
        }
        
        else if (sky >= 801 && sky < 805 ) {
            console.log("Clouds", sky);
            $('.currentDayModal').html('<img src="http://www.iconarchive.com/download/i89285/icons8/ios7/Weather-Partly-Cloudy-Day.ico" class="weatherIconModal center-block img-responsive" />');
        }

        else if (sky >= 300 && sky < 531 ) {
            console.log('rain');
            $('.currentDayModal').html('<img src="http://icons.iconarchive.com/icons/icons8/ios7/512/Weather-Storm-icon.png" class="weatherIconModal center-block img-responsive" />');
        }

        else if (sky >= 200 && sky < 233 ) {
            console.log('thunderstorm');
            $('.currentDayModal').html('<img src="http://icons.iconarchive.com/icons/icons8/ios7/512/Weather-Storm-icon.png" class="weatherIconModal center-block img-responsive" />');
        }

        else if (sky >= 600 && sky < 622 ) {
            console.log("snow");
            $('.currentDayModal').html('<img src="https://maxcdn.icons8.com/Share/icon/Weather//snow1600.png" class="weatherIcon center-block img-responsive" />');
        }

        // assigning high/low for modal
        var highTemp = response.list[i].temp.max;
        var showHighTemp = Math.ceil(highTemp) + ' \xB0';
        var lowTemp = response.list[i].temp.min;
        var showLowTemp = Math.ceil(lowTemp) + ' \xB0';

        // assigning current temp for modal
        var dayTemp = response.list[0].temp.day;
        var currentTemp = Math.ceil(dayTemp) + ' \xB0F';
        
        // adding temp city and high low to document 
        $(".tempModal").text(currentTemp);
        $(".cityModal").html(response.city.name + ", TX");
        $(".highLowModal").text(showHighTemp + " /  " + showLowTemp);

        // setting notifcation for rain
        if (sky >= 300 && sky < 531 || sky >= 300 && sky < 531 ) {
            
            $(".chanceRainModal").html('<p>Chance of Rain: <span class="chanceRainModalGreen"><i class="fa fa-check-circle" aria-hidden="true"></i></span></p>')
        
        } else {

            $(".chanceRainModal").html('<p>Chance of Rain: <span class="chanceRainModalRed"><i class="fa fa-times-circle" aria-hidden="true"></i></span></p>')
        }

        // setting notifcation for snow
        if (sky >= 600 && sky < 622 ) {
            
            $(".chanceSnowModal").html('<p>Chance of Snow: <span class="chanceSnowModalGreen"><i class="fa fa-check-circle" aria-hidden="true"></i></span></p>')
        
        } else {

            $(".chanceSnowModal").html('<p>Chance of Snow: <span class="chanceSnowModalRed"><i class="fa fa-times-circle" aria-hidden="true"></i></span></p>')
        }

    }
}

    function itemForecast() {
        for (var i = 0; i < response.list.length; i++) {

           var sky = response.list[i].weather[0].id; 
           var temp = response.list[0].temp.day
           
            console.log("Sky Response",sky);
            console.log("Our response", response.list[i].description);

            //Weather Conditions
            if (sky >= 300 && sky < 531) {
                console.log('rain');
                $('#umbrella-display').html('<img src="https://png.icons8.com/umbrella/ultraviolet/100" alt="..." class="img-thumbnail">');
                $('#rainboots-display').html('<img src="https://image.flaticon.com/icons/svg/100/263919.svg" alt="..." class="img-thumbnail">');
            }

            if (sky >= 600 && sky < 622 ) {
                console.log('snow');
                $('#snowboots-display').html('<img src="https://png.icons8.com/winter-boots/ios7/100" alt="..." class="img-thumbnail">');
            }


            if (sky == 800 ) {
                console.log('clear sky')
                $('#sunglasses-display').html('<img src="https://png.icons8.com/glasses-filled/ios7/100" alt="..." class="img-thumbnail">')
                $('#sunscreen-display').html('<img src="https://png.icons8.com/tube/color/100" alt="..." class="img-thumbnail">')
                $('#hat-display').html('<img src="https://png.icons8.com/baseball-cap/color/100" alt="..." class="img-thumbnail">')
            } 
            
            

            //Temperature Conditions
            if (temp > 85) {
                $('#flask-display').html('<img src="https://png.icons8.com/bottle-of-water/office/100" alt="..." class="img-thumbnail">')
                $('#sandals-display').html('<img src="https://png.icons8.com/flip-flops/color/96" alt="..." class="img-thumbnail">')
                $('#swimsuits-display').html('<img src="https://png.icons8.com/swimmer-back-view/ultraviolet/100" alt="..." class="img-thumbnail">')
            } else {
                $('#shoes-display').html('<img src="https://png.icons8.com/trainers/color/96" alt="..." class="img-thumbnail">')
            }
            
            if (temp < 50) {
                $('#jacket-display').html('<img src="https://png.icons8.com/jacket/color/100" alt="..." class="img-thumbnail">')
            } 

            if (temp <40) {
                $('#scarf-display').html('<img src="https://png.icons8.com/scarf/office/100" alt="..." class="img-thumbnail">')
                $('#gloves-display').html('<img src="https://png.icons8.com/mitten/color/100" alt="..." class="img-thumbnail">')
            }

            if (temp > 75) {
                $('#shirt-display').html('<img src="https://png.icons8.com/t-shirt/office/100" alt="..." class="img-thumbnail">')
                $('#shorts-display').html('<img src="https://png.icons8.com/long-shorts/color/100" alt="..." class="img-thumbnail">')
            } else {
                $('#longshirt-display').html('<img src="https://png.icons8.com/shirt-filled/ios7/100" alt="..." class="img-thumbnail">')
                $('#longpants-display').html('<img src="https://png.icons8.com/jeans/color/100" alt="..." class="img-thumbnail">')

            }

            //temp && weather condition
            if (sky >= 801 && sky < 804 && temp < 75 && temp > 50) {
                $('#book-display').html('<img src="https://png.icons8.com/book/dusk/100" alt="..." class="img-thumbnail">')
            } 

        }
        console.log(sky);
    }


   

// ====================================================
//                   Main process
// ====================================================

   // Calling days of the week per fucntion
    skyStatus();
    weekForecast();
    modal();
    itemForecast();
   
// End of api function
});
    




            
            
            
            
            
            



            

        
    

      