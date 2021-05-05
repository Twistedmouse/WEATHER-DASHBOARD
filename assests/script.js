/*GIVEN a weather dashboard with form inputs
WHEN I search for a city 
THEN I am presented with current and future conditions for that city and that city is added to the search history
Pseudo:     
IF user types a city in the the search field 
THEN fetch the data of the weather and display on window 
IF city is searched
THEN the searched city's will appear in the search history section
IF the searched history city's are clicked in history section 
THEN display the weather for those city's in the current and future weather section 
WHEN I view current weather conditions for that city *TODO
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
Pseudo:
WHEN page loads 
THEN fetch/display my local area weather conditions data 
WHEN weather is displayed 
THEN a picture representing weather is displayed 
WHEN I view the UV index *TODO
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
Pseudo:
WHEN uv data is fetched
THEN display in uv section
WHEN uv is in uv section. colour changes 
IF favorable
THEN colour will be green
IF moderate 
THEN colour will be yellow
IF severe
THEN colour is red 
WHEN I view future weather conditions for that city *TODO
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
Pseudo:
WHEN page is loaded 
THEN fetch the data for the weather over the next 5 days, append data to the 5 day forecast section 
WHEN I click on a city in the search history *TODO
THEN I am again presented with current and future conditions for that city
Pseudo:
WHEN a city is searched 
THEN add city to the search history section 
WHEN search history city item is clicked
THEN change the displayed data to the selected area /fetch that city's data
WHEN i click the clear history button - TODO
THEN clear the local storage
*/
const timeDate = moment().format('dddd, MMMM Do YYYY');
const city = document.getElementById("currentLocation");
const tempArea = document.getElementById("temp");
const windArea = document.getElementById("wind");
const humidityArea = document.getElementById("humidity");
const searchHist = document.getElementById("searchResults");
const uvArea = document.getElementById("uv");
const weatherImg = document.getElementsByClassName("weatherImg");
let searchStorage = JSON.parse(localStorage.getItem('history')) || [];
const btn = document.getElementById('searchBtn');
const mainWeatherImg = document.getElementById('mainWeatherImg');

//btn for the search bar
btn.addEventListener('click', function (event) {
    event.preventDefault();
    let input = document.getElementById('autocomplete').value;
    console.log(input.split(' '))
    retrieveOw(input.split(' '))
    searchStorage.push(input)
    localStorage.setItem('history', JSON.stringify(searchStorage))
    searchHistBtn(input)
});

function searchHistBtn(input) { 
    let createBtn = document.createElement("button");
    createBtn.setAttribute("type", "submit")
        createBtn.setAttribute("class", "historyButton")
        createBtn.textContent = input;
        searchHist.appendChild(createBtn)
}//TODO run debugger and fine out why theres ab-normallity 

//function insert text into searchResults field
function searchHistoryField(event) { 
    for (let i = 0; i < searchStorage.length; i++) {
        let historyBtns = searchStorage[i];
        let createBtn = document.createElement("button");
        if (searchStorage.length[i] === "") {
            $(searchStorage.length[""]).remove();
        }
        if (searchStorage.length == searchStorage.length[i]) { //TODO function to allow only one copy of each city 
            console.log(searchStorage.length[i])
        }else{
            createBtn.setAttribute("type", "submit")
        createBtn.setAttribute("class", "historyButton")
        createBtn.textContent = historyBtns;
        searchHist.appendChild(createBtn)
        // console.log(historyBtns)
        }
        
    }
}
 searchHistoryField()
// search history buttons
document.querySelectorAll(".historyButton").forEach(function(item) {
    item.addEventListener("click", function(event) {
        let cityTextContent = event.currentTarget.textContent;
        let yourCity = cityTextContent.split(" ");
        retrieveOw(yourCity) 
        // console.log(yourCity)
    
})})
 
//make clear btn for the search history 

function pageBuilder(data) {
    //main builder
    var iconCode = data.weather[0].icon;
    let iconUrl = "https://openweathermap.org/img/wn/"+iconCode+"@2x.png";
    city.textContent = data.name + " (" + timeDate + ")";
        tempArea.textContent = "Temp: " + data.main.temp + " °C"
        windArea.textContent = `Wind: ${data.wind.speed}  M/s` //this `` is the same as the line above ""
        humidityArea.textContent = "Humidity: " + data.main.humidity + " %"
        mainWeatherImg.setAttribute("src", iconUrl)
    
}

//used to find the data for the city you're in
let learning = "";
function retrieveOw(yourCity) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+yourCity+'&units=metric&appid=ae210a10799a0c6d30e51f1defe85556')
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
        learning = data;
        pageBuilder(data)
        retrieveOneCall(data.coord.lat, data.coord.lon)
        
         /*BUG TO ADDRESS WHEN A NEW ITEM IS MADE IN THE SEARCH HISTORY 
            NEW BUTTON WON'T FETCH ITS DATA UNTIL PAGE IS REFRESHED*/

        //* passing this block into the fetch fixes the new object not fetching bug
        // search history buttons
        // document.querySelectorAll(".historyButton").forEach(function(item) {
        //  item.addEventListener("click", function(event) {
        //     let cityTextContent = event.currentTarget.textContent;
        //     let yourCity = cityTextContent.split(" ");
        // retrieveOw(yourCity) 
        // // console.log(yourCity)
    
        // })})
    })
}
// console.log(learning)

function retrieveOneCall(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely,hourly,alerts&units=metric&appid=ae210a10799a0c6d30e51f1defe85556')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log("OneCall=", data)
        uvArea.textContent = `UV Index: ${data.current.uvi}` // += adds onto the existing textContent instead of overriding it //TODO fix uv so it wont concatinate SOLUTION the += would cancat everytime button was pressed
        weatherImg.innerHTML = data.current.weather[0].icon

        //5day for loop *TODO
         for (let i = 1; i < 6; i++) {
            const fiveDayMoment = document.querySelector(`#day${i} .date`);
            const fiveDayImg = document.querySelector(`#day${i} .weatherImg`);
            const fiveDayTemp = document.querySelector(`#day${i} .tempFive`);
            const fiveDayWind = document.querySelector(`#day${i} .windFive`);
            const fiveDayHumidity = document.querySelector(`#day${i} .humidityFive`);
            const timeStamp = data.daily[i].dt;
            const milliSeconds = timeStamp *1000;
            const dateObject = new Date(milliSeconds).toLocaleDateString("en-UK");
            var iconCodeFive = data.daily[i].weather[0].icon;
            let iconUrl = "https://openweathermap.org/img/wn/"+iconCodeFive+"@2x.png";
            

            fiveDayMoment.textContent = dateObject;
            console.log(fiveDayMoment)
            fiveDayTemp.textContent = `Temp: ${data.daily[i].temp.day} °C`
            fiveDayImg.setAttribute("src", iconUrl)
            fiveDayWind.textContent = `Wind: ${data.daily[i].wind_speed} M/s`
            fiveDayHumidity.textContent = `Humidity: ${data.daily[i].humidity} %`
        }
    })
}





//function for change uv index colour a bunch of if else statements that change the class 
//which has a css property with different background colors                                *TODO







//google maps api:
//autocomplete for search bar 
let autocomplete;
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            types: ['(cities)'],
            // componentRestrictions: {'country' : ['AU']},
            fields: ['place_id', 'geometry', 'name']
        });
     autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    var place = autocomplete.getPlace();

    if (!place.geometry){
        document.getElementById('autocomplete').placeholder = 'Type in desired city..';
    } else{
        // document.getElementById('details').innerHTML = place.name;
    }
}
