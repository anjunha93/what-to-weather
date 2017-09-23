
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
            $("#weekForecast").append(randomDate);


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


            if (sky == 800 ) {
                console.log('clear sky')
                $('#sunglasses-display').html('<img src="https://png.icons8.com/glasses-filled/ios7/100" alt="..." class="img-thumbnail">')
                $('#sunscreen-display').html('<img src="https://png.icons8.com/tube/color/96" alt="..." class="img-thumbnail">')
            } 
            
            

            //Temperature Conditions
            if (temp > 85) {
                $('#flask-display').html('<img src="https://png.icons8.com/bottle-of-water/office/100" alt="..." class="img-thumbnail">')
            } 
            
            if (temp < 40) {
                $('#jacket-display').html('<img src="https://png.icons8.com/jacket/color/100" alt="..." class="img-thumbnail">')
                $('#scarf-display').html('<img src="https://png.icons8.com/scarf/office/100" alt="..." class="img-thumbnail">')
            } 

            if (temp > 75) {
                $('#shirt-display').html('<img src="https://png.icons8.com/t-shirt/office/100" alt="..." class="img-thumbnail">')
                $('#shorts-display').html('<img src="https://png.icons8.com/long-shorts/color/100" alt="..." class="img-thumbnail">')
            } else {
                $('#longshirt-display').html('<img src="https://png.icons8.com/shirt-filled/ios7/100" alt="..." class="img-thumbnail">')
                $('#longpants-display').html('<img src="https://png.icons8.com/jeans/color/100" alt="..." class="img-thumbnail">')

            }

            if (sky >= 801 && sky < 804 && temp < 75 && temp > 50) {
                console.log(book);
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
    itemForecast();
   
// End of api function
});
    
//========== Macy API ======//

var macyAPI = "rbp3ge7wz5ev9xp9xf4842sj"

var macyQueryURL = "https://api.macys.com/v4/catalog/category/9557?expand=parent&fields=summary" ;

$.ajax({
        url: macyQueryURL,
        method: "GET",
        headers: {
          "X-Macys-Webservice-Client-ID": macyAPI
        }
      })

            
            
            
            
            
            



            

        
    

      