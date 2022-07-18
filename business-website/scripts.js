function createNode(type){
    const node = document.createElement(type);
    return node;
}

function createDiv(){
    const div = document.createElement("div");
    return div;
}

function appendContainer(item){
    const div = createDiv();
    div.className = "container";
    item.appendChild(div);
    return div;
}

function appendRow(item){
    const div = createDiv();
    div.className = "row";
    item.appendChild(div);
    return div;
}

function appendCol(item, type){
    const div = createDiv();
    div.className = `${type}`; 
    item.appendChild(div);
    return div;
}



function appendJumbotron(item, title, content, address, mapsLink, phone, fax, hours, ){
    const div = createDiv();
    div.className = "jumbotron";

    const titleText = createNode("h1");
    titleText.className = "display-1 jumbotron-title";
    titleText.textContent = title;
    div.appendChild(titleText);

    const spaceGirl = createNode("img");
    spaceGirl.className = "img-fluid";
    spaceGirl.src = "./img/space_girl.webp";
    
    const contentText = createNode("p");
    contentText.className = "lead";
    contentText.appendChild(spaceGirl);
    contentText.append(content);
    div.appendChild(contentText);

    const contactRow = appendRow(div);
    const addressRow = appendCol(contactRow, "col-6 address lead");
    addressRow.innerText = address;
    addressRow.innerHTML += `<br>Find us on <a href="${mapsLink}" target="_blank">Google Maps</a>`;

    const phoneRow = appendCol(contactRow, "col-6 phone lead");
    phoneRow.innerHTML = `<p><a href = 'tel:${phone}'>Phone:</a> ${phone}<br>Fax: ${fax}<br>Hours:<br> ${hours}</p>`;

    item.appendChild(div);
    return div;
}

let previousRoute;
function route(item){
    if(previousRoute){
        previousRoute.style.display = "none";
    }
    const content = document.getElementById(item + "-content");
    previousRoute = content;
    content.style.display = "block";
    // console.log(content);
}

function appendNav(item, names){
    const navCol = appendCol(item, "col-12 nav-area");
    const nav = createNode("nav");
    nav.id = "nav-anchor"
    navCol.appendChild(nav);

    
    for(let name of names){
        const navLink = createNode("a");
        navLink.href = "#nav-anchor";
        navLink.className = "btn btn-danger nav-btn ";
        navLink.id = name.replace(" ", "-");
        navLink.textContent = name;
        nav.appendChild(navLink);
        navLink.addEventListener("click", () => {
            route(navLink.id);
        });

    }
    item.appendChild(navCol);
    return navCol;
}

function appendContent(item, content){ 
    // console.log(content);
    const contentCol = appendCol(item, "col-12 content-area");
    contentCol.id = content.name.replace(" ", "-") + "-content";
    contentCol.style.display = "none";
    
    const contentHeading = createNode("h1");
    contentHeading.className = "content-header";
    contentHeading.textContent = content.name;
    contentCol.appendChild(contentHeading);
    contentCol.insertAdjacentHTML("beforeend", content.HTMLcontent);

    if(content.name == "TRUCKS"){
        const truckRow = appendRow(contentCol);
        for(let item of content.trucks){
            console.log(item);
            const truckCol = appendCol(truckRow, "d-none d-sm-block col-sm-3 col-md-3 col-lg-3 mt-4 ");
            const truckCard = createNode("div");
            truckCard.className = "card";
            const truckCardBody = createNode("div");
            truckCardBody.className = "card-body";
            truckCardBody.innerHTML = `<a href ="#${item.name.replace(/[ ]/g, "-")}"><img src = 'img/${item.img}' class = "card-img hover-img"></a>`;
            truckCard.appendChild(truckCardBody);
            truckCol.appendChild(truckCard);
        }
        for(let item of content.trucks){
            console.log(item);
            const truckCol = appendCol(truckRow, "col-md-12 col-lg-6 mt-4");
            truckCol.id = item.name.replace(/[ ]/g, "-");
            const truckCard = createNode("div");
            truckCard.className = "card";
            const truckCardBody = createNode("div");
            truckCardBody.className = "card-body";
            truckCardBody.innerHTML = `<img src = 'img/${item.img}' class = "card-img"><p>${item.description}</p>`;
            truckCard.appendChild(truckCardBody);
            truckCol.appendChild(truckCard);
        }
        
        console.log(content.trucks);
        contentCol.insertAdjacentHTML("beforeend", "trucks");
    }    
    return contentCol;
}


function getPageNames(item){
    const names = [];
    for(let i = 0; i < item.pages.length; i++){
        names.push(item.pages[i].name);
    }
    return names;
}

async function fetchData(){
    const response = fetch('./data.json');
    const data = await response;
    return data.json();
}

fetchData().then(data => {    
    const pageNames = getPageNames(data);
    const body = document.body;
    const container = appendContainer(body);
    const Jumbotron = appendJumbotron(container, data.name, data.about, data.address, data.mapsLink, data.phone, data.fax,data.hours);
    const navRow = appendRow(container);
    const nav = appendNav(navRow, pageNames);

    for(let page of data.pages){
        const contentRow = appendRow(container);
        const pageContent = appendContent(contentRow, page);
    }

    // const col1 = appendCol(row, "col-6");
    // const col2 = appendCol(row, "col-6");


});
