/*GIVEN a weather dashboard with form inputs

WHEN I search for a city *TODO
THEN I am presented with current and future conditions for that city and that city is added to the search history
Pseudo:

WHEN I view current weather conditions for that city *TODO
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
Pseudo:

WHEN I view the UV index *TODO
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
Pseudo:

WHEN I view future weather conditions for that city *TODO
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
Pseudo:

WHEN I click on a city in the search history *TODO
THEN I am again presented with current and future conditions for that city
Pseudo:
*/

let learning = "";
function retrieveOw() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=perth&units=metric&appid=ae210a10799a0c6d30e51f1defe85556')
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
        learning = data;
        //dosnt give uv . need to do a fetch func inside this fetch func. to get the uv 
    })
}retrieveOw()





"https://api.openweathermap.org/data/2.5/weather?"+"this will be a variable"+"&units=metric&appid=ae210a10799a0c6d30e51f1defe85556"