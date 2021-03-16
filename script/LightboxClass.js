
/*** DECLARATIONS ***/

const lightbox = document.getElementById("displayLightbox");
const photoTitle = document.getElementById("photoTitle")
const lightboxModal = document.getElementById("lightbox-modal");
const nextImg = document.getElementById("nextIcon");
const prevImg = document.getElementById("prevIcon");
const body = document.body;
const closeIcon = document.getElementById("closeIcon"); 


/*** OBJET QUI GERE L'AFFICHAGE DES MEDIAS EN PLEIN ECRAN (carrousel) ***/

export class Lightbox{
    constructor(medias){
        
        this.medias = medias,

        /*Création d'un index pour chaque média pour faciliter le suivi de navigation*/

        this.createIndex = function(){
            this.medias.forEach(media => {
                Object.defineProperty(media, 'index',{
                    value : medias.indexOf(media)
                })
            })
        },
        this.createIndex(),

        /*Affichage lightbox modal*/

        this.generateLightbox = function(index){
            lightbox.style.display = "flex";
            displayVerticalScrollBar(false)
            if(this.medias[index].nodeName == "IMG"){
                lightboxModal.innerHTML = `<img src="${this.medias[index].src}" alt="${this.medias[index].alt}" class="lightbox-modal__box--photo" style="max-width:100%"></img>`
                photoTitle.innerHTML = `${this.medias[index].alt}`
            }else{
                lightboxModal.innerHTML = `<video controls style="max-width:100%" tabindex="0"><source  src="${this.medias[index].currentSrc}" alt="${this.medias[index].textContent}" type="video/mp4" class="lightbox-modal__box--photo" ></video>`
                photoTitle.innerHTML = `${this.medias[index].textContent}`
            }
            
        },
        

/*Fonction d'écoute pour affichage de la lightbox appelé après chaque tri*/

        this.navigationInLightbox = function(){
            
            let mediaIndex = 0;
            
            let medias = Array.from(document.querySelectorAll(".media"))
            
            let lightboxContent = new Lightbox(medias)
            
            let maxMediaIndex = medias.length

            medias.forEach(media => {        
                media.addEventListener("click", ()=>{ 
                    mediaIndex = media.index
                    lightboxContent.generateLightbox(mediaIndex)
                })

                media.addEventListener("keydown", (e)=>{                   
                    switch(e.key){
                        case 'Enter':
                            mediaIndex = media.index     
                            this.generateLightbox(mediaIndex)
                            break;  
                        case 'Escape':
                            closeLightbox(true)
                            break;
                        case 'ArrowLeft':
                            mediaIndex--
                            mediaIndex < 0 ? mediaIndex = maxMediaIndex-1 : mediaIndex
                            this.generateLightbox(mediaIndex)
                            return mediaIndex
                        case 'ArrowRight':
                            mediaIndex++
                            mediaIndex > maxMediaIndex-1 ? mediaIndex = 0 : mediaIndex
                            this.generateLightbox(mediaIndex)
                            return mediaIndex
                        default:
                            console.log(e)
                    }
                })
                
            })
            
            nextImg.addEventListener("click", ()=>{
                mediaIndex++
                mediaIndex > maxMediaIndex-1 ? mediaIndex = 0 : mediaIndex
                this.generateLightbox(mediaIndex)
                
                if (!this.isAlreadyListen){
                    lightbox.addEventListener('keydown', (e)=>{
                    switch(e.key){
                        case 'Escape':
                            closeLightbox(true)
                            break;   
                        case 'ArrowLeft':
                            mediaIndex--
                            mediaIndex < 0 ? mediaIndex = maxMediaIndex-1 : mediaIndex
                            this.generateLightbox(mediaIndex)
                            return mediaIndex
                        case 'ArrowRight':
                            mediaIndex++
                            mediaIndex > maxMediaIndex-1 ? mediaIndex = 0 : mediaIndex
                            this.generateLightbox(mediaIndex)
                            return mediaIndex
                        default:
                            console.log(e)
                    }
                })
                this.isAlreadyListen = true;
                }
            })

            prevImg.addEventListener("click", ()=>{
                mediaIndex--
                mediaIndex < 0 ? mediaIndex = maxMediaIndex-1 : mediaIndex
                this.generateLightbox(mediaIndex)
                
                if (!this.isAlreadyListen){
                    lightbox.addEventListener('keydown', (e)=>{
                        switch(e.key){
                            case 'Escape':
                                closeLightbox(true)
                                break;
                            case 'ArrowLeft':
                                mediaIndex--
                                mediaIndex < 0 ? mediaIndex = maxMediaIndex-1 : mediaIndex
                                this.generateLightbox(mediaIndex)
                                return mediaIndex
                            case 'ArrowRight':
                                mediaIndex++
                                mediaIndex > maxMediaIndex-1 ? mediaIndex = 0 : mediaIndex
                                this.generateLightbox(mediaIndex)
                                return mediaIndex
                            default:
                                console.log(e)
                        }
                    })
                this.isAlreadyListen = true;
                }
            }) 
        }
    }
}



//Fermeture de la lightbox par icône croix

closeIcon.addEventListener("click", ()=>{
    lightbox.style.display = "none";
    displayVerticalScrollBar(true)
});

function closeLightbox(bool){
    displayVerticalScrollBar(bool)
    lightbox.style.display = "none";
}

function displayVerticalScrollBar(bool){
    if(bool){
        body.style.overflowY = "visible"
    }else{
        body.style.overflowY = "hidden"
    }
}
