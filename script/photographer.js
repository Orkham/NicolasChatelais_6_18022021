
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
/*function totalLikes(){
    let totalLikes = 0;

}*/
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
        
        this.transformImgTitle = function(){
            let beautifulTitle = this.image.replace("_", " ").slice(0,-4);
            return beautifulTitle;
        }
        this.name = nameById(this.photographerId);
        this.totalLikes = function(){
            let totalLikes = 0;
            return totalLikes;
        }
        this.generateImg = function(){
            const photosSection = document.getElementById("photosSection");
            console.log(this.price);
            console.log(this.name);
            photosSection.innerHTML +=
            `<a href="#">
                <figure class="photoCard">
                    <img src="img/${this.name}/${this.image}" alt="" class="photoCard__img" loading="lazy"></img>
                    <figcaption>
                        <p class="photoCard__title">${this.transformImgTitle()}</p>
                        <div class="photoCard__numbers">
                            <p class="photoCard__numbers--price">${this.price} €</p>
                            <p class="photoCard__numbers--like">${this.likes} <i class="fas fa-heart"></i></p>
                        </div>
                    </figcaption>
                </figure>
            </a>`
    
        }
        this.transformVideoTitle=function(){
            let beautifulTitle = this.video.replace("_", " ").slice(0,-4);
            return beautifulTitle;
        }
        this.generateVideo=function(){
            const photosSection = document.getElementById("photosSection");
            photosSection.innerHTML +=
            `<a href="#">
                <figure class="photoCard">
                <video controls src="img/${this.name}/${this.video}"  type="video/mp4 class=""></video>
                    <figcaption>
                        <p class="photoCard__title">${this.transformVideoTitle()}</p>
                        <div class="photoCard__numbers">
                            <p class="photoCard__numbers--price">${this.price} €</p>
                            <p class="photoCard__numbers--like">${this.likes} <i class="fas fa-heart"></i></p>
                        </div>
                    </figcaption>
                </figure>
            </a>`

        }

    }
}
/*
class Photo extends Media{
    constructor(id,
        photographerId, image, tags, likes, date, price){
            super(id, photographerId, image, tags, likes, date, price);
        }
    transformTitle(){
        let beautifulTitle = this.image.replace("_", " ").slice(0,-4);
        return beautifulTitle;
    }
    generateImg(){
        const photosSection = document.getElementById("photosSection");
        photosSection.innerHTML +=
        `<a href="#">
            <figure class="photoCard">
                <img src="img/Mimi/${this.image}" alt="" class="photoCard__img"></img>
                <figcaption>
                    <p class="photoCard__title">${this.transformTitle()}</p>
                    <div class="photoCard__numbers">
                        <p class="photoCard__numbers--price">${this.price} €</p>
                        <p class="photoCard__numbers--like">${this.likes} <i class="fas fa-heart"></i></p>
                    </div>
                </figcaption>
            </figure>
        </a>`

    }

}

class Video extends Media{
    constructor(id,
        photographerId, video, tags, likes, date, price){
            super(id, photographerId, video, tags, likes, date, price);
        }
    transformTitle(){
        let beautifulTitle = this.video.replace("_", " ").slice(0,-4);
        return beautifulTitle;
    }
    generateVideo(){
        const photosSection = document.getElementById("photosSection");
        photosSection.innerHTML +=
        `<a href="#">
            <figure class="photoCard">
                <video controls src="img/Mimi/${this.video}"  type="video/mp4 class=""></video>
                <figcaption>
                    <p class="photoCard__title">${this.transformTitle()}</p>
                    <div class="photoCard__numbers">
                        <p class="photoCard__numbers--price">${this.price} €</p>
                        <p class="photoCard__numbers--like">${this.likes} <i class="fas fa-heart"></i></p>
                    </div>
                </figcaption>
            </figure>
        </a>`

    }

}
*/
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
    let activePhotographerName;
    let likesNumber = document.getElementById("likesNumber");
    const dailyPrice = document.getElementById("price");
    let likes = 0;

    for (let i = 0 ; i < photographersList.length ; i++){
        if (photographersList[i].id == idPhotographer){
            photographersList[i].generatePhotographerPage();
            activePhotographerName = photographersList[i].name;
            /*Tarif journalier*/
            dailyPrice.textContent = photographersList[i].price;
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
                media.video,
                media.tags,
                media.likes,
                media.date,
                media.price
        ));
    }

    /*Création de la liste des photographies à afficher*/
    for (let i = 0 ; i < mediasList.length ; i++){
        if (mediasList[i].photographerId == idPhotographer){
            switch(mediasList[i].image){
                case undefined:
                mediasList[i].generateVideo();
                break;
                default:
                mediasList[i].generateImg();
            }
            /*Nombre total de like*/
            likes += mediasList[i].likes;
            likesNumber.innerHTML = likes + '<i class="fas fa-heart"></i>';
        }
    }
    
})

