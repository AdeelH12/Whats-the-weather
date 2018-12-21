var api = "";
var weatherArray = [];
var weatherIconArray= [];


// Fetching the city name from the input field
function cityName(){

    var cityName = document.getElementById('city-input').value;
    api =  "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&APPID=651dcf50cb8707ecef753f3c8f88056d"

}

function myFunction(){

        cityName();

        getData();

        clear();

}

function clear(){

    //This var refers back to the div created in the HTML
    var weatherDiv = document.getElementById('weather-data');

    
    if(weatherDiv.innerHTML = ""){

        //The code below is removing the first child of the div
        //therefore if the user has already made a search query and 
        //wishes to make another, the text will update.
        weatherDiv.removeChild(weatherDiv.firstChild);
    }
}

// Opening request to API Server 
function getData(){
    var request = new XMLHttpRequest();
    request.open('GET', api, true);
    request.onload = function (){
    
        var data = JSON.parse(this.response);
        if(request.status >=200 && request.status < 400){
    
    
            // weather is the JSON Array
            data.weather.forEach(weather => {
                
                //fetching the weather data div which was created in the HTML
                const weatherData = document.getElementById('weather-data');

                //pushing the icons into the array so we can access them later
                weatherIconArray.push(weather.icon);

                //creating an image element
                const icon = document.createElement('img');
                icon.setAttribute('id', 'icon');
                icon.src = "http://openweathermap.org/img/w/" + weatherIconArray[weatherIconArray.length - 1]+ ".png";
                weatherData.appendChild(icon);

                
                //creating the element which will display the weather
                const weatherMain= document.createElement('h1');
                weatherMain.setAttribute('id', 'weather-main');
               
                //Store the weather in an array so we can access it later
                weatherArray.push(weather.main);
                
                //Accessing the Elements in the weather array
                weatherMain.textContent =weatherArray.slice(-1).pop();

                weatherData.appendChild(weatherMain);
            
                //Check if the h1 we created before is displaying any text.
                if(weatherMain != null){

                    document.getElementById('icon').scrollIntoView();
                    document.getElementById('weather-main').scrollIntoView();
                    
                }
                
                
            });
        }
    }
    request.send();
}