//const main = document.getElementById("mainSection");

function firstLetterUp(str){
    return (str + '').charAt(0).toUpperCase()+str.substr(1);
}

class Media{
    constructor(
        id,
        photographerId,
        image,
        tags,
        likes,
        date, 
        price
    ){
        this.id = id;
        this.photographerId = photographerId;
        this.image = image;
        this.tags = tags;
        this.likes = likes; 
        this.date = date;
        this.price = price;

        this.generateMedia = function(){
            const photosSection = document.getElementById("photosSection");
            let newA= document.createElement('a');
            newA.setAttribute("href","#");
            photosSection.append(newA);

            let newFigure = document.createElement("figure");
            newFigure.className = "photoCard";
            newA.append(newFigure);

            let newImg = document.createElement("img");
            newImg.className = "photoCard__img";
            newImg.setAttribute("src", 'img/Mimi/' + this.image);
            newFigure.append(newImg);


        }
    }
}

class Photographer {
    constructor(
        city,
        country,
        id,
        name,
        portrait,
        price,
        tagline,
        tags
    ) {
        this.city=city;
        this.country=country;
        this.id=id;
        this.name=name;
        this.portrait=portrait;
        this.price=price;
        this.tagline=tagline;
        this.tags=tags;

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

    /*Création d'un tableau contenant la liste de tous les photographes et leurs données*/

    const photographersArray=response.photographers;
    let photographersList =[];
    for (let photographer of photographersArray){
        photographersList.push(
            new Photographer(
                photographer.city,
                photographer.country,
                photographer.id,
                photographer.name,
                photographer.portrait,
                photographer.price,
                photographer.tagline,
                photographer.tags
        ));
    }

    /*Création de l'entête de présentation du photographe*/

    const address = window.location.toString();
    const url = new URL(address);
    const idPhotographer = url.searchParams.get("id");
    
    for (let i = 0 ; i < photographersList.length ; i++){
        if (photographersList[i].id == idPhotographer){
            photographersList[i].generatePhotographerPage();
        }
    }

    /*Création de la liste des médias par photographe*/

    const mediasArray=response.media;
    let mediasList =[];
    for (let media of mediasArray){
        mediasList.push(
            new Media(
                media.id,
                media.photographerId,
                media.image,
                media.tags,
                media.likes,
                media.price,
                media.price
        ));
    }
    for (let i = 0 ; i < mediasList.length ; i++){
        if (mediasList[i].photographerId == idPhotographer){
            //console.log("ok");
            mediasList[i].generateMedia();
        }
    }
})

