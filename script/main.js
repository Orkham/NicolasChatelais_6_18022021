/*** IMPORTS ***/

import {Photographer, displayPhotographersByTag} from './PhotographerClass.js'
import {shortcutToMain} from './utils.js'



/*** DECLARATIONS ***/

const photographersSection = document.getElementById("photographers");
const skipToContent = document.getElementById("skipToContent");



/*** Ecouteur skip to content ***/

document.addEventListener("keydown", (e) => shortcutToMain(e,skipToContent));




/*** AFFICHAGE DYNAMIQUE DE LA PAGE ***/

/*Récupération des données du fichiers json data*/

fetch("FishEyeDataFR.json")
.then(response=>response.json())

/*Récupération liste des photographes*/
.then((response)=> {

    const photographersArray = response.photographers;
    
    return photographersArray;

})

/*Création d'un tableau contenant la liste de tous les photographes et leurs données*/
.then((photographersArray)=>{

    let photographersList = [];

    for (let photographer of photographersArray){
        
        photographersList.push(
            new Photographer(photographer));
        
    }
    
    /*** Création du DOM avec tous les photographes ***/

    for(let i = 0 ; i < photographersList.length ; i++){

        photographersList[i].generatePhotographerCard(photographersSection)

    }
    
    /* Ecoute des boutons tags*/
    let tags = document.querySelectorAll(".tag");
   
    for(let i = 0 ; i < tags.length ; i++){
        tags[i].addEventListener("click", (e)=>{
            displayPhotographersByTag(e,tags,photographersList)
        }
        );
    }
    

    
});


