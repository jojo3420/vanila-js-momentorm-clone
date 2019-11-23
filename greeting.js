
const greeting = document.querySelector(".js-greetings");
const userName = document.querySelector(".js-userName");
const hideEl = document.querySelector(".hide");
const LS_USERNAME_KEY = "userName";

function getGreeting(){
    const hours = new Date().getHours();
    let greetingMsg = "";
    if(hours >= 7 && hours < 12){
        greetingMsg = "Good Morning!";
    }else if( hours >= 12 && hours <= 18){
        greetingMsg = "After Noon!";
    }else{
        greetingMsg = "Good Evening!";
    }
    return greetingMsg;
}

function getUserName() {
    let userName = localStorage.getItem(LS_USERNAME_KEY);
    return userName ? userName : "Super Star!";
}
function init(){
    greeting.innerText = getGreeting();
    userName.innerText =  getUserName();
    //hideEl.classList.add("show");
}

init();
