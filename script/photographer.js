import {firstLetterUp, nameById, transformTitle}  from './utils.js'

const photosSection = document.getElementById("photosSection");
let totalLikesNumber = document.getElementById("likesNumber");
const lightbox = document.getElementById("displayLightbox");
const lightboxModal = document.getElementById("lightbox-modal");

function displayMedias(array){
    let likes = 0;
    for (let i = 0 ; i < array.length ; i++){
        array[i].generateDisplay();
        /*Nombre total de like*/
        likes += array[i].likes;
    }
    totalLikesNumber.innerHTML = likes + ' <i class="fas fa-heart"></i>';
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
        /*this.totalLikes = function(){
            let totalLikes = 0;
            return totalLikes;
        }*/
        this.mediaToDisplay = function(){
            if(this.video){
                return `<video class="media"><source src="img/${this.name}/${this.video}"  type="video/mp4" id="${this.id}"></video>`
            }else{
                return`<img src="img/${this.name}/${this.image}" alt="" class="photoCard__img media" loading="lazy" id="id_${this.id}"></img>`
            }
        }
        this.generateDisplay = function(){
            photosSection.innerHTML +=
            `<figure class="photoCard">
                <a href="#">
                ${this.mediaToDisplay()}
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
                let newButton = document.createElement("button");
                newButton.className = "tag";
                newLi.append(newButton);
                newButton.textContent = "#" + firstLetterUp(tag);
            }

            portrait.setAttribute("src", "img/Photographers ID Photos/" + this.portrait);
            portrait.setAttribute("alt", this.portrait.slice(0,-4));

        }
        
    }
}    

class Lightbox{
    constructor(medias){
        
        this.medias = medias,

        this.createIndex = function(){
            this.medias.forEach(media => {
                Object.defineProperty(media, 'index',{
                    value : medias.indexOf(media)})
            })
        },
        this.createIndex(),

        this.generateLightbox = function(index){
            lightbox.style.display = "flex";
            console.log(this.medias[index].nodeName)
            if(this.medias[index].nodeName == "IMG"){
                lightboxModal.innerHTML = `<img src="${this.medias[index].src}" alt="" class="lightbox-modal__box--photo"></img>`
            }else{
                lightboxModal.innerHTML = `<video controls><source  src="${this.medias[index].src}" alt="" type="video/mp4" class="lightbox-modal__box--photo"></video>`
            }
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
    let likesList = [];
    /*Gestion des likes*/
    for(let i = 0 ; i < mediasList.length ; i++){
        likesList.push(
            new Likes(
                mediasList[i].likes,
                
            )
        )
    }

    /*Affichage lightbox modal*/

    const nextImg = document.getElementById("nextIcon");
    const prevImg = document.getElementById("prevIcon");

    /*Fonction d'écoute pour affichage de la lightbox appelé après chaque tri*/
    
    function listenForLightbox(){
        let count = 0;
        let max = 0;
        let medias = document.querySelectorAll(".media")
        let mediasArray2 = Array.from(medias)
        let lightboxContent = new Lightbox(mediasArray2)
        
        mediasArray2.forEach(media => {
            
            media.addEventListener("click", function(e){
                
                count = media.index
                max = mediasArray2.length
                lightboxContent.generateLightbox(count)
                nextImg.addEventListener("click", nextImgDisplay)
                prevImg.addEventListener("click", prevImgDisplay)
                
            })
        })

        function nextImgDisplay(){
            count++
            count > max-1 ? count = 0 : count = count
            console.log(count)
            lightboxContent.generateLightbox(count)
        }

        function prevImgDisplay(){
            count--
            count < 0 ? count = max-1 : count = count
            console.log(count)
            lightboxContent.generateLightbox(count)
        }

    }

    listenForLightbox()

    /*Fonction tri des photo par popularité, date ou tri*/
    let searchOptionSelected = document.getElementById("searchBy");
    
    function sortByOption(){
        photosSection.innerHTML = "";
        switch(searchOptionSelected.value){
            case "Popularité":
                console.log("Popularité");
                mediasList.sort(function(a,b){
                    return b.likes - a.likes;
                });
                displayMedias(mediasList)
                listenForLightbox()
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
                listenForLightbox()
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
                listenForLightbox()
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
    
    /*Filtre des medias par tag*/
    let tagsSelected = document.querySelectorAll(".tag");
    
    
    for(let i = 0 ; i < tagsSelected.length ; i++){
        tagsSelected[i].addEventListener("click", displayByTag);
    }
    

    function displayByTag(tag){
        
        let tagSelected = tag.target.textContent.toLowerCase();
        photosSection.innerHTML = ""
        /*Faire correspondre les tags sélectionnés et l'affichage*/
        let newMediaList =[]
        for(let i = 0 ; i < mediasList.length ; i++){

            if((mediasList[i].tags).includes(tagSelected.substring(1))){
                newMediaList.push(mediasList[i])
                
            }
        }
        displayMedias(newMediaList);
        listenForLightbox()
    }
    

    /*Gestion des likes*/
    let likeBtn = document.querySelectorAll(".fa-heart")
    
    likeBtn.forEach(btn=>{
        btn.addEventListener("click", ()=>{
            btn.previousSibling.data++
            totalLikesNumber.childNodes[0].data++
        })
    })
})



