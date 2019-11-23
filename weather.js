
const OPEN_WEATHER_MAP_API_KEY = "b9d5ba23c86b7a43392cd244156acea5";  // 날씨정보 확인용 api 요청 키
const CN_WEATHER = "weather";
const weatherContainerElement = document.querySelector(".js-weather-container");
const cityElement =  weatherContainerElement.querySelector("#city");
const temperateElement =  weatherContainerElement.querySelector("#temperate");

function paintingWeather(weatherObj){
    console.debug('weatherObj : ' ,weatherObj);
    const temperate = weatherObj.main.temp;
    const city = weatherObj.name;
    //console.debug(`temperate : ${temperate}, city:${city}`);
    cityElement.innerText = city;
    temperateElement.innerText = temperate + "°";

}

function weatherAPI(latitude, longitude) {
    const URL = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=1&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`;
    console.debug(`API URL:` + URL);
    fetch(URL)
        .then(function(response){
            return  response.json();
        }).then(function(jsonObj){
        console.debug("api response json : ", jsonObj.cod, "typeof " ,typeof jsonObj.cod);
        if(parseInt(jsonObj.cod) === 200){
            paintingWeather(jsonObj.list[0]);
        }else {
            console.error("api 요청실패: [response=" + jsonObj);
        }

    });
}


function saveCoordsByLS(coordsObj){
    localStorage.setItem(CN_WEATHER,  JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    // console.dir(position);
    const latitude =  position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude ,  // 위도
        longitude  : longitude  // 경도
    };
    // console.log(`coordsObj:`, coordsObj);
    saveCoordsByLS(coordsObj);  //localStorage
    weatherAPI(latitude, longitude);
}

function handleGeoError(){
    console.log("사용자가 위치정보를 허용하지 않았습니다.");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);

}

function loadWeather(){
    const weather = JSON.parse(localStorage.getItem(CN_WEATHER));
    console.debug(`weather : ${weather}`);
    if(weather === null){
        askForCoords();
    }else{
        weatherAPI(weather.latitude, weather.longitude);
    }
}

function init(){
    loadWeather();
}

init();
