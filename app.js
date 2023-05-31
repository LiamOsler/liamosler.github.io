let articles = document.querySelectorAll('article');

const startDate = new Date();
let startTime = startDate.getTime();

var scale = 'scale(1)';
document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
document.body.style.msTransform = scale;       // IE 9
document.body.style.transform = scale;     // General

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

setTimeout(() => {
    console.log("Delayed for 1 second.");
  }, "1000");

let windowHeight = window.innerHeight;
let scrollPosition = window.scrollY;

for(let item of articles){
    item.classList.add('active-transition');
    item.classList.add('inactive');

    if(item.offsetTop <= scrollPosition + windowHeight){
        item.classList.remove('inactive');
        item.classList.add('activate');
    }
    else{
        item.classList.remove('activate');
        item.classList.add('inactive');
    }
}

function scrollActivate(){
    scrollPosition = window.scrollY;
    const currentDate = new Date();
    let currentTime = currentDate.getTime();

    for(let item of articles){
        if(item.offsetTop <= scrollPosition + windowHeight && currentTime - startTime > 1000){
            item.classList.remove('inactive');
            item.classList.add('activate');
        }
    }
}

scrollActivate()

window.addEventListener('scroll', function(){
    scrollActivate();
});



let gameboyContainer = document.getElementById("gameboyContainer")
let gameboy = document.getElementById("gameboy")
let gameboyBody = document.getElementById("mainBodyGameboy")
let emHeight = parseFloat(getComputedStyle(document.body).fontSize);

console.log(gameboyContainer.offsetWidth, gameboyBody.offsetWidth)

gameboy.style.zoom =  gameboyContainer.offsetWidth / (gameboyBody.offsetWidth + emHeight * 2 );;


function resize() {
    gameboy.style.zoom =  gameboyContainer.offsetWidth / (gameboyBody.offsetWidth + emHeight * 2 );
}

resize()

window.onresize = resize;

