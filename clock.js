
const clockElement = document.querySelector("div .js-clock");
console.debug(`clockElement : clockElement`);


function parserHumanTime(timeObj){
    return timeObj < 10 ? "0"+ timeObj : timeObj;
}

function getTimes(){
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    clockElement.textContent = `${parserHumanTime(hours)}:${parserHumanTime(minutes)}:${parserHumanTime(seconds)}`;

}


function init(){
    getTimes();
    setInterval(getTimes, 1000);
}

init();