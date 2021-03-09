
import {Lightbox} from './lightbox.js'
import {Factory, displayMedias, likesListener} from './MediaClass.js'
import {Photographer} from './PhotographerClass.js'
import {unsetClass} from './utils.js'

const photosSection = document.getElementById("photosSection");

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
    
    /*Récupération des données du photographe à afficher*/

    for (let i = 0 ; i < photographersArray.length ; i++){

        if(photographersArray[i].id == idPhotographer){

            activePhotographer = photographersArray[i].name;
            
            activePhotographer = new Photographer(photographersArray[i])

        }
    }

    /*Création de l'entête de présentation du photographe*/

    activePhotographer.generatePhotographerPage();
        
    /*Création de la liste des médias par photographe*/

    const mediasArray = response.media;
    let mediasList = [];

    for (let i = 0 ; i < mediasArray.length ; i++){

        if(mediasArray[i].photographerId == activePhotographer.id){

            mediasList.push(new Factory(mediasArray[i]));
            
        }
    }

    /*Création de la liste des photographies à afficher*/

    displayMedias(mediasList);
    
    let medias = document.querySelectorAll(".media")
    let arrayFromMedias = Array.from(medias)
    let lightboxContent = new Lightbox(arrayFromMedias)

    lightboxContent.listenForLightbox()

    /*Fonction tri des photo par popularité, date ou tri*/

    let options = document.querySelectorAll(".options")
    
    

    options.forEach(option=>{
        option.addEventListener("click",(e)=>{

            photosSection.innerHTML = "";
            
            switch(e.target.name){
                case "popularité":
                    mediasList.sort(function(a,b){
                        return b.likes - a.likes;
                    });
                    displayMedias(mediasList)
                    lightboxContent.listenForLightbox()
                    unsetClass(options, "active")
                    e.target.classList.add("active")
                    break;
                case "date":
                    mediasList.sort(function(a,b){
                        if (a.date < b.date)
                            return -1;
                        if (a.date > b.date)
                            return 1;
                        return 0;
                    });
                    displayMedias(mediasList)
                    lightboxContent.listenForLightbox()
                    unsetClass(options, "active")
                    e.target.classList.add("active")
                    break;
                case "titre":
                    mediasList.sort(function(a,b){
                        if (a.title < b.title)
                            return -1;
                        if (a.title > b.title )
                            return 1;
                        return 0;
                    });
                    displayMedias(mediasList)
                    lightboxContent.listenForLightbox()
                    unsetClass(options, "active")
                    e.target.classList.add("active")
                    break;
            }
        })
    })




                    /*Filtre des medias par tag*/
    let tagsList = document.querySelectorAll(".tag");
 
    for(let i = 0 ; i < tagsList.length ; i++){
        tagsList[i].addEventListener("click", displayByTag);
    }
    
    function displayByTag(tag){

        photosSection.innerHTML = ""
        
        let tagSelected = tag.target.textContent.toLowerCase();

        /*Faire correspondre les tags sélectionnés et l'affichage*/
        let newMediaList =[]

        for(let i = 0 ; i < tagsList.length ; i++){
            /*Conditions pour désélectionner le tag déjà sélectionné*/
            if(tag.target.classList.contains("active")&&tagsList[i]==tag.target){
                tag.target.classList.remove("active")
                displayMedias(mediasList)
            } 
            /*Condition de sélection du tag*/
            else if(tagsList[i]==tag.target){ 
                tag.target.classList.add("active")
                for(let j = 0 ; j < mediasList.length ; j++){
                    if((mediasList[j].tags).includes(tagSelected.substring(1))){
                        newMediaList.push(mediasList[j])
                    }
                }
            displayMedias(newMediaList);
            }
            /*Gestion des tags précédemment sélectionnés*/
            else if(tagsList[i]!=tag.target){
                tagsList[i].classList.remove("active")
            }
        }

        
        lightboxContent.listenForLightbox()
        likesListener()
        
    }
    
    /*Gestion des likes*/

    likesListener()
})

