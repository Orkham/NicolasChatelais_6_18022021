import {Lightbox} from './LightboxClass.js'
import {Factory, displayMedias, likesListener} from './MediaClass.js'
import {Photographer} from './PhotographerClass.js'
import {DisplayBySort} from './DisplayBySortClass.js'
import {DisplayByTag} from './DisplayByTagClass.js'

//const photosSection = document.getElementById("photosSection");

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

    DisplayBySort.displayBySort(mediasList)
    


    /*Filtre des medias par tag*/

    DisplayByTag.listenerForEachTag(mediasList)
    


    /*Gestion des likes*/

    likesListener()
})

