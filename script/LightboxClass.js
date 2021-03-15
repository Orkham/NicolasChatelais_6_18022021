

/*** DECLARATIONS ***/

const lightbox = document.getElementById("displayLightbox");
const photoTitle = document.getElementById("photoTitle")
const lightboxModal = document.getElementById("lightbox-modal");
const nextImg = document.getElementById("nextIcon");
const prevImg = document.getElementById("prevIcon");
const body = document.body;
   


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
            body.style.overflowY = "hidden";
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
                    
                    //console.log(count)
                    
                })

                media.addEventListener("keydown", (e)=>{
                
                    //count = media.index
                    
                    switch(e.key){
                        case 'Enter':
                            console.log('entrée')
                            mediaIndex = media.index     
                            this.generateLightbox(mediaIndex)
                            break;  
                        case 'Escape':
                            console.log('échap')
                            document.getElementById("displayLightbox").style.display = "none";
                            body.style.overflowY = "visible"
                            //media.removeEventListener("keydown",(e))
                            break;
                            
                        case 'ArrowLeft':
                            console.log('arrière')
                            mediaIndex--
                            mediaIndex < 0 ? mediaIndex = maxMediaIndex-1 : mediaIndex
                            this.generateLightbox(mediaIndex)
                            console.log(mediaIndex)
                            return mediaIndex
                            
                        case 'ArrowRight':
                            console.log('avant')
                            mediaIndex++
                            mediaIndex > maxMediaIndex-1 ? mediaIndex = 0 : mediaIndex
                            this.generateLightbox(mediaIndex)
                            console.log(mediaIndex)
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
                console.log(mediaIndex)
                //console.log(this)
                console.log(this.isAlreadyListen)
                
                
                if (!this.isAlreadyListen){
                    lightbox.addEventListener('keydown', (e)=>{
                    switch(e.key){
                        case 'Escape':
                            console.log('échap')
                            document.getElementById("displayLightbox").style.display = "none";
                            body.style.overflowY = "visible"
                            //media.removeEventListener("keydown",(e))
                            break;
                            
                        case 'ArrowLeft':
                            console.log('arrière')
                            mediaIndex--
                            mediaIndex < 0 ? mediaIndex = maxMediaIndex-1 : mediaIndex
                            this.generateLightbox(mediaIndex)
                            console.log(mediaIndex)
                            return mediaIndex
                            
                        case 'ArrowRight':
                            console.log('avant')
                            mediaIndex++
                            mediaIndex > maxMediaIndex-1 ? mediaIndex = 0 : mediaIndex
                            this.generateLightbox(mediaIndex)
                            console.log(mediaIndex)
                            return mediaIndex

                        
                        default:
                            console.log(e)
                    }
                })
                this.isAlreadyListen = true;
                }
                
               /*
                lightbox.addEventListener('keydown', (e)=>{
                    switch(e.key){
                        case 'Escape':
                            console.log('échap')
                            document.getElementById("displayLightbox").style.display = "none";
                            body.style.overflowY = "visible"
                            //media.removeEventListener("keydown",(e))
                            break;
                            
                        case 'ArrowLeft':
                            console.log('arrière')
                            mediaIndex--
                            mediaIndex < 0 ? mediaIndex = maxMediaIndex-1 : mediaIndex
                            this.generateLightbox(mediaIndex)
                            console.log(mediaIndex)
                            return mediaIndex
                            
                        case 'ArrowRight':
                            console.log('avant')
                            mediaIndex++
                            mediaIndex > maxMediaIndex-1 ? mediaIndex = 0 : mediaIndex
                            this.generateLightbox(mediaIndex)
                            console.log(mediaIndex)
                            return mediaIndex

                        
                        default:
                            console.log(e)
                    }
                })*/
            })
            prevImg.addEventListener("click", ()=>{
                mediaIndex--
                mediaIndex < 0 ? mediaIndex = maxMediaIndex-1 : mediaIndex
                this.generateLightbox(mediaIndex)
                console.log(mediaIndex)
                lightbox.addEventListener('keydown', (e)=>{
                    switch(e.key){
                        case 'Escape':
                            console.log('échap')
                            document.getElementById("displayLightbox").style.display = "none";
                            body.style.overflowY = "visible"
                            //media.removeEventListener("keydown",(e))
                            break;
                            
                        case 'ArrowLeft':
                            console.log('arrière')
                            mediaIndex--
                            mediaIndex < 0 ? mediaIndex = maxMediaIndex-1 : mediaIndex
                            this.generateLightbox(mediaIndex)
                            console.log(mediaIndex)
                            return mediaIndex
                            
                        case 'ArrowRight':
                            console.log('avant')
                            mediaIndex++
                            mediaIndex > maxMediaIndex-1 ? mediaIndex = 0 : mediaIndex
                            this.generateLightbox(mediaIndex)
                            console.log(mediaIndex)
                            return mediaIndex

                        
                        default:
                            console.log(e)
                    }
                })
            })
            /*
            medias.forEach(media => {
                     /*    
                        case 'Escape':
                            console.log('échap')
                            document.getElementById("displayLightbox").style.display = "none";
                            body.style.overflowY = "visible"
                            media.removeEventListener("keydown",(e))
                            break;
                            
                        case 'ArrowLeft':
                            console.log('arrière')
                            mediaIndex--
                            mediaIndex < 0 ? mediaIndex = maxMediaIndex-1 : mediaIndex
                            this.generateLightbox(mediaIndex)
                            console.log(mediaIndex)
                            return mediaIndex
                            
                        case 'ArrowRight':
                            console.log('avant')
                            mediaIndex++
                            mediaIndex > maxMediaIndex-1 ? mediaIndex = 0 : mediaIndex
                            this.generateLightbox(mediaIndex)
                            console.log(mediaIndex)
                            return mediaIndex

            })*/
            //console.log(medias)
        }
        
    }
}


//Fermeture de la lightbox par icône croix

const closeIcon = document.getElementById("closeIcon");
/*
lightbox.addEventListener('click', ()=>{
    console.log(document.getElementById('lightbox-modal').firstChild)
})
*/
closeIcon.addEventListener("click", ()=>{
    document.getElementById("displayLightbox").style.display = "none";
    body.style.overflowY = "visible"
});

