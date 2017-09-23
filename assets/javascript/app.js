// ====================================================
//                EBAY
// ====================================================
// Replace MyAppID with your Production AppID
var url = "http://svcs.ebay.com/services/search/FindingService/v1";
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

       // Transfer content to HTML
        $(".city").html(response.city.name + ", TX");
        $(".temp").html("Temperature (F) " + response.list[0].temp.day);

// ====================================================
//                   Functions
// ====================================================

       
   function skyStatus() {
        
       

           var sky = response.list[0].weather[0].id;  
           
           console.log("Sky Response",sky);
            console.log("Our response", response.list[0].description);

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

       
        // debugging
        console.log(sky);
    }

   function weekForecast() {

       for (var i = 0; i < response.list.length; i++) {

           var showWeek = response.list[i].dt;
            var randomDate = moment.unix(showWeek).format("ddd");
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
    itemForecast();
   
// End of api function
});
    
// ====================================================
//                  Ebay
//=====================================================


// Replace MyAppID with your Production AppID
var url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=jamesdos-studentw-PRD-25d8a3c47-483dd88b";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&callback=_cb_findItemsByKeywords";
    url += "&REST-PAYLOAD";
    url += "&keywords=";
    url += "&paginationInput.entriesPerPage=3";
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
            
            
            
            
            



            

        
    

      