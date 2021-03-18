import {Lightbox} from './LightboxClass.js'
import {displayMedias, likesListener} from './MediaClass.js'

const photosSection = document.getElementById("photosSection");

export class DisplayByTag {
    /*Filtre des medias par tag*/
    constructor(){
        this.tagsList;
    }

    static listenerForEachTag(mediasList){
        this.tagsList = document.querySelectorAll(".tag");
        for(let i = 0 ; i < this.tagsList.length ; i++){
            this.tagsList[i].addEventListener("click", (e)=>{
                this.displayByTag(e, mediasList)
            });
        }
    }


    static displayByTag(tag, mediasList){

        photosSection.innerHTML = ""
        
        let tagSelected = tag.target.textContent.toLowerCase();

        /*Faire correspondre les tags sélectionnés et l'affichage*/
        let newMediaList =[]

        for(let i = 0 ; i < this.tagsList.length ; i++){
            /*Conditions pour désélectionner le tag déjà sélectionné*/
            if(tag.target.classList.contains("active")&&this.tagsList[i]==tag.target){
                tag.target.classList.remove("active")
                this.displayMediasAfterFilter(mediasList)
            } 
            /*Condition de sélection du tag*/
            else if(this.tagsList[i]==tag.target){ 
                tag.target.classList.add("active")
                for(let j = 0 ; j < mediasList.length ; j++){
                    if((mediasList[j].tags).includes(tagSelected.substring(1))){
                        newMediaList.push(mediasList[j])
                    }
                }
                this.displayMediasAfterFilter(newMediaList)
            }
            /*Gestion des tags précédemment sélectionnés*/
            else if(this.tagsList[i]!=tag.target){
                this.tagsList[i].classList.remove("active")
            }
        }

        //lightboxContent.navigationInLightbox()
        likesListener()
        
    }

    static displayMediasAfterFilter(mediasList){
        displayMedias(mediasList)
        let medias = document.querySelectorAll(".media")
        let arrayFromMedias = Array.from(medias)
        let lightboxContent = new Lightbox(arrayFromMedias)
        lightboxContent.navigationInLightbox()
    }
}