document.body.style.zoom = 1.0

let scrollTriggersDOM = document.getElementsByClassName("scroll-trigger");
let triggers = [];
for(let trigger of scrollTriggersDOM){
    triggers.push(trigger.getBoundingClientRect().y);
}

let width = document.documentElement.clientWidth;
let height = document.documentElement.clientHeight;
let container = document.getElementById("main-container");
let map = document.getElementById("map");
let mapPNG = document.getElementById("map-png");
let mapSVG = document.getElementById("map-svg");
let labels = document.getElementsByClassName("label");
let proposedLocationLabel = document.getElementById("proposed-location-label");
let businessLocationLegend = document.getElementById("business-legend-label");

let proposedLocation = document.getElementById("proposed");
let businessLocations = document.getElementById("business");
let travelwayRoad = document.getElementById("travelway-road");
let travelwayPath = document.getElementById("travelway-path");
let waterbody = document.getElementById("waterbody");
let walk250 = document.getElementById("walk-250");
let walk500 = document.getElementById("walk-500");
let walk1000 = document.getElementById("walk-1000");
let walk1500 = document.getElementById("walk-1500");


let content = document.getElementById("main-content");


resize = () => {
    triggers = [];
    for(let trigger of scrollTriggersDOM){
        triggers.push(trigger.getBoundingClientRect().y);
    }

    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;

    if(width < 2000) {
        map.style.transform = `translate(${width / 2 - 1000}px, ${height /2  - 1000}px) scale(1, 1)`;
    }
    else{
        map.style.transform = `translate(0px, ${height /2  - 1000}px) scale(1, 1)`;
    }
}
resize()
window.onresize = resize;


let lastScrollTop = 0;
scroll = () => {
    let scrollTop = content.scrollTop;
    let scrollDirection = scrollTop > lastScrollTop;
    if(false){

    }
    else if(scrollTop > triggers[6] - height){
        walk1500.style.opacity = 1;
    }
    else if(scrollTop > triggers[5] - height){
        walk1000.style.opacity = 1;
    }
    else if(scrollTop > triggers[4] - height){
        walk500.style.opacity = 1;
    }
    else if(scrollTop > triggers[3] - height){
        walk250.style.opacity = 1;
    }
    else if(scrollTop > triggers[2] - height){
        travelwayRoad.classList.add("animate-line-show");
        travelwayPath.classList.add("animate-line-show");

        mapPNG.style.opacity = 0;
        businessLocationLegend.style.opacity = 0;
        container.style.backgroundColor = "#6d9f71";
        waterbody.style.opacity = 1;
        proposedLocation.style.fill = "#F8A452";
    }
    
    else if(scrollTop > triggers[1] - height / 2){
        mapPNG.style.opacity = 1;
 
        if(width < 2000) {
            map.style.transform = `translate(${width / 2 - 1000}px, ${height / 2 - 1000}px) scale(.98, .98)`;
        }
        else{
            map.style.transform = `translate(0px, ${height /2  - 1000}px) scale(.75, .75)`;
        }

        businessLocationLegend.style.opacity = 1;
        businessLocations.classList.add("fade-in");
        for(let label of labels){
            label.classList.remove("fade-in");
            label.style.opacity = 1;
            label.classList.add("fade-out");
        }

        proposedLocation.style.fill = "none";
        waterbody.style.opacity = 0;
        walk250.style.opacity = 0;
        walk500.style.opacity = 0;
        walk1000.style.opacity = 0;
        walk1500.style.opacity = 0;

    }
    
    else if(scrollTop > triggers[0] - height / 2){
        proposedLocation.classList.add("animate-line-show");

        if(width < 2000) {
            map.style.transform = `translate(${width / 2 - 1000}px, ${height / 2 - 1000}px) scale(2, 2)`;
        }
        else{
            map.style.transform = `translate(0px, ${height /2  - 1000}px) scale(2, 2)`;
        }   

        businessLocations.classList.remove("fade-in");
        businessLocations.style.opacity = 0;
        businessLocations.classList.remove("fade-out");  
        businessLocationLegend.style.opacity = 0;   
        for(let label of labels){
            label.classList.add("fade-in");
            label.style.opacity = 0;
            label.classList.remove("fade-out");
        }
    }
    else if(scrollTop == 0){
        for(let label of labels){
            label.classList.remove("fade-in");
            label.style.opacity = 1;
            label.classList.add("fade-out");
        }
        if(width < 2000) {
            map.style.transform = `translate(${width / 2 - 1000}px, ${height / 2 - 1000}px) scale(1, 1)`;
        }
        else{
            map.style.transform = `translate(0px, ${height /2  - 1000}px) scale(1, 1)`;
        }   
    }

    lastScrollTop = scrollTop;
}

content.onscroll = scroll;