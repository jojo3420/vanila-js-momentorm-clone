
const bodyElement = document.querySelector("body");
const IMG_COUNT = 3;

function getRandom(){
    return Math.floor(Math.random() * IMG_COUNT);
}

async function paintingBGAPI(){
    var API_KEY = '11493402-c02d170d10c4fc2f03f2b53be';
    var URL = "https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
    // fetch(URL).
    // then(function(response){
    //     return response.json();
    // }).then(function(json){
    //     console.log("image : ", json);
    // });
    const response = await fetch(URL);
    const json = await response.json();
    return json;
}

async function getWeather__(woeid) {
    let response, json, url;
    url = "https://www.metaweather.com/api/location/" + woeid + "/";
    response = await fetch(proxy + url);
    json = await response.json();
    //return json;
    console.log(json);
}

function paintingBG(random){
    const bgImage = new Image();
    bgImage.src = "images/"+ (random+1) +".jpeg";
    bgImage.classList.add("js-bg-image");
    //bodyElement.appendChild(bgImage);
    bodyElement.prepend(bgImage);
}


async function init(){
    paintingBG(getRandom());
    const data = await paintingBGAPI();
    console.log("api data: ", data);
    // await paintingBGAPI();

}

init();
