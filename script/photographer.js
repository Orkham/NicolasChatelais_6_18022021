
import {Lightbox} from './LightboxClass.js'
import {Factory, displayMedias, likesListener} from './MediaClass.js'
import {Photographer} from './PhotographerClass.js'
import {Display} from './DisplayClass.js'

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

    lightboxContent.navigationInLightbox()



    /*Fonction tri des photo par popularité, date ou tri*/

    Display.displayBySort(mediasList)
    


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
                medias = document.querySelectorAll(".media")
                arrayFromMedias = Array.from(medias)
                lightboxContent = new Lightbox(arrayFromMedias)
                lightboxContent.navigationInLightbox()
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
                medias = document.querySelectorAll(".media")
                arrayFromMedias = Array.from(medias)
                lightboxContent = new Lightbox(arrayFromMedias)
                lightboxContent.navigationInLightbox()
            }
            /*Gestion des tags précédemment sélectionnés*/
            else if(tagsList[i]!=tag.target){
                tagsList[i].classList.remove("active")
            }
        }

        lightboxContent.navigationInLightbox()
        likesListener()
        
    }
    
    /*Gestion des likes*/

    likesListener()
})

