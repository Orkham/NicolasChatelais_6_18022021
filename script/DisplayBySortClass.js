
import {Lightbox} from './LightboxClass.js'
import {displayMedias, likesListener} from './MediaClass.js'
import {unsetClass} from './utils.js'

const photosSection = document.getElementById("photosSection");

export class DisplayBySort{
    
    static displayBySort(mediasList){
        let options = document.querySelectorAll(".options")
        
        options.forEach(option=>{
            option.addEventListener("click",(e)=>{
                this.displayMediasBySort(e, mediasList, options)
            })
        })
        likesListener()
    }

    static displayMediasBySort(e, mediasList, options){
        photosSection.innerHTML = "";
        switch(e.target.name){
            case "popularité":
                mediasList.sort(function(a,b){
                    return b.likes - a.likes;
                });
                this.displayMediasAfterSort(mediasList)
                this.displaySelectSelected(e, options)
                break;
            case "date":
                mediasList.sort(function(a,b){
                    if (a.date < b.date)
                        return -1;
                    if (a.date > b.date)
                        return 1;
                    return 0;
                });
                this.displayMediasAfterSort(mediasList)
                this.displaySelectSelected(e, options)
                break;
            case "titre":
                mediasList.sort(function(a,b){
                    if (a.title < b.title)
                        return -1;
                    if (a.title > b.title )
                        return 1;
                    return 0;
                });
                this.displayMediasAfterSort(mediasList)
                this.displaySelectSelected(e, options)
                break;
        }
    }

    static displayMediasAfterSort(mediasList){
        displayMedias(mediasList)
        let medias = document.querySelectorAll(".media")
        let arrayFromMedias = Array.from(medias)
        let lightboxContent = new Lightbox(arrayFromMedias)
        lightboxContent.navigationInLightbox()
    }

    static displaySelectSelected(e, options){
        unsetClass(options, "active")
        e.target.classList.add("active")
    }
  
}