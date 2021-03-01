
const photosSection = document.getElementById("photosSection");
let likes = 0;
let likesNumber = document.getElementById("likesNumber");

function firstLetterUp(str){
    return (str + '').charAt(0).toUpperCase()+str.substr(1);
}
function nameById(id){
    switch(id){
        case 243:
        return "Mimi";
        case 930:
        return "Ellie Rose";
        case 82:
        return "Tracy";
        case 527:
        return "Nabeel";
        case 925:
        return "Rhode";
        case 195:
        return "Marcel";
    }
}
function displayMedias(array){
    for (let i = 0 ; i < array.length ; i++){
        switch(array[i].image){
            case undefined:
                array[i].generateVideo();
            break;
            default:
                array[i].generateImg();
        }

        /*Nombre total de like*/
        likes += array[i].likes;
        likesNumber.innerHTML = likes + '<i class="fas fa-heart"></i>';
        
    }
    console.log(array);
}
function transformTitle(image,video){
    let re = /_/g;
    if(image){
        let beautifulTitle = image.replace(re, " ").slice(0,-4);
        return beautifulTitle;
    }else{
        let beautifulTitle = video.replace(re, " ").slice(0,-4);
    return beautifulTitle;
    }
}

class Media{
    constructor(id, photographerId, image, video, tags, likes, date, price)
    {
        this.id = id;
        this.photographerId = photographerId;
        this.image = image;
        this.video = video;
        this.tags = tags;
        this.likes = likes; 
        this.date = date;
        this.price = price;
        this.title = transformTitle(this.image,this.video);
        
        this.name = nameById(this.photographerId);
        this.totalLikes = function(){
            let totalLikes = 0;
            return totalLikes;
        }
        this.generateImg = function(){
            
            photosSection.innerHTML +=
            `<figure class="photoCard">
                <a href="#">
                    <img src="img/${this.name}/${this.image}" alt="" class="photoCard__img" loading="lazy"></img>
                </a>
                <figcaption>
                    <p class="photoCard__title">${this.title}</p>
                    <div class="photoCard__numbers">
                        <p class="photoCard__numbers--price">${this.price} €</p>
                        <p class="photoCard__numbers--like">${this.likes} <i class="fas fa-heart"></i></p>
                    </div>
                </figcaption>
            </figure>`
        }
        
        this.generateVideo=function(){
            photosSection.innerHTML +=
            `<figure class="photoCard">
                <a href="#">
                    <video controls src="img/${this.name}/${this.video}"  type="video/mp4 class=""></video>
                </a>
                <figcaption>
                    <p class="photoCard__title">${this.title}</p>
                    <div class="photoCard__numbers">
                        <p class="photoCard__numbers--price">${this.price} €</p>
                        <p class="photoCard__numbers--like">${this.likes} <i class="fas fa-heart"></i></p>
                    </div>
                </figcaption>
            </figure>`
        }
    }
}

class Photographer {
    constructor(city, country, id, name, portrait, price, tagline,tags) 
    {
        this.city=city;
        this.country=country;
        this.id=id;
        this.name=name;
        this.portrait=portrait;
        this.price=price;
        this.tagline=tagline;
        this.tags=tags;

        /*Création entête avec info sur le photographe*/

        this.generatePhotographerPage = function(){

            const photographerName = document.getElementById("photographerName");
            const photographerLocalisation = document.getElementById("photographerLocalisation");
            const photographerQuote = document.getElementById("photographerQuote");
            const portrait = document.getElementById("portrait");
            const tagList = document.getElementById("tagList");

            photographerName.textContent = this.name;
            photographerLocalisation.textContent = this.country + ", " + this.city;
            photographerQuote.textContent = this.tagline;

            for(let tag of this.tags){
                let newLi = document.createElement("li");
                tagList.append(newLi);
                let newA = document.createElement("a");
                newA.className = "tag";
                newLi.append(newA);
                newA.textContent = "#" + firstLetterUp(tag);
            }

            portrait.setAttribute("src", "img/Photographers ID Photos/" + this.portrait);
            portrait.setAttribute("alt", this.portrait.slice(0,-4));

        }
        
    }
}    

/*Récupération des données du fichiers json data*/

fetch("FishEyeDataFR.json")
.then(response=>response.json())

/*Récupération liste des photographes*/
.then((response)=> {

    /*Récupération de l'id du photographe passée dans l'url*/

    let activePhotographer;
    const address = window.location.toString();
    const url = new URL(address);
    const idPhotographer = url.searchParams.get("id");

    /*Création d'un tableau contenant la liste de tous les photographes et leurs données*/

    const photographersArray = response.photographers;

    for (let i = 0 ; i < photographersArray.length ; i++){
        if(photographersArray[i].id == idPhotographer){
            activePhotographer = photographersArray[i].name;
            activePhotographer = new Photographer(
                photographersArray[i].city,
                photographersArray[i].country,
                photographersArray[i].id,
                photographersArray[i].name,
                photographersArray[i].portrait,
                photographersArray[i].price,
                photographersArray[i].tagline,
                photographersArray[i].tags
            )
        }
    }

    /*Création de l'entête de présentation du photographe*/

    activePhotographer.generatePhotographerPage();

    /*Tarif journalier*/
    const dailyPrice = document.getElementById("price");
    dailyPrice.textContent = activePhotographer.price;
        
    /*Création de la liste des médias par photographe*/

    const mediasArray = response.media;
    let mediasList = [];
    for (let i = 0 ; i < mediasArray.length ; i++){
        if(mediasArray[i].photographerId == activePhotographer.id){
            mediasList.push(
                new Media(
                    mediasArray[i].id,
                    mediasArray[i].photographerId,
                    mediasArray[i].image,
                    mediasArray[i].video,
                    mediasArray[i].tags,
                    mediasArray[i].likes,
                    mediasArray[i].date,
                    mediasArray[i].price
                )
            );
        }
    }

    /*Création de la liste des photographies à afficher*/

    displayMedias(mediasList);

    /*Fonction tri des photo par popularité, date ou tri*/
    let searchOptionSelected = document.getElementById("searchBy");
    //console.log(searchOptionSelected.value);
    function sortByOption(){
        photosSection.innerHTML = "";
        likesNumber = 0;
        switch(searchOptionSelected.value){
            case "Popularité":
                console.log("Popularité");
                mediasList.sort(function(a,b){
                    return b.likes - a.likes;
                });
                displayMedias(mediasList)
                break;
            case "Date":
                console.log("Date");
                mediasList.sort(function(a,b){
                    if (a.date < b.date)
                        return -1;
                    if (a.date > b.date)
                        return 1;
                    return 0;
                });
                displayMedias(mediasList)
                break;
            case "Titre":
                console.log("Titre");
                mediasList.sort(function(a,b){
                    if (a.title < b.title)
                        return -1;
                    if (a.title > b.title )
                        return 1;
                    return 0;
                });
                displayMedias(mediasList)
                break;
        }
    }
    searchOptionSelected.addEventListener("change",sortByOption); 

    /*Fonction skip to content*/
    const skipToContent = document.getElementById("skipToContent");
    document.addEventListener("keydown", shortcutToMain);

    function shortcutToMain(e) {
        
        if(e.keyCode == '9')
        {
            skipToContent.style.display = "block";
            skipToContent.focus();
            document.removeEventListener("keydown", shortcutToMain);
        }
    }

    const photosList = document.querySelectorAll(".photoCard__img");
    console.log(photosList);
    for(let i = 0 ; i < photosList.length ; i++){
        console.log(photosList[i]);
    }
})

