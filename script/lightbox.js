const lightbox = document.getElementById("displayLightbox");
const photoTitle = document.getElementById("photoTitle")
const lightboxModal = document.getElementById("lightbox-modal");
const nextImg = document.getElementById("nextIcon");
const prevImg = document.getElementById("prevIcon");

export class Lightbox{
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
            
            if(this.medias[index].nodeName == "IMG"){
                lightboxModal.innerHTML = `<img src="${this.medias[index].src}" alt="" class="lightbox-modal__box--photo" style="max-width:100%"></img>`
                photoTitle.innerHTML = `${this.medias[index].alt}`
            }else{
                lightboxModal.innerHTML = `<video controls style="max-width:100%" tabindex="0"><source  src="${this.medias[index].currentSrc}" alt="" type="video/mp4" class="lightbox-modal__box--photo" ></video>`
                photoTitle.innerHTML = `${this.medias[index].textContent}`
                
            }
        },
        this.keepFocusIn = function(target){
            target.addEventListener("blur",()=>{
                target.focus()
            })
        },
    

                    /*Affichage lightbox modal*/

/*Fonction d'écoute pour affichage de la lightbox appelé après chaque tri*/

        this.listenForLightbox = function(){
            let count = 0;
            let max = 0;
            let medias = document.querySelectorAll(".media")
            let arrayFromMedias = Array.from(medias)
            let lightboxContent = new Lightbox(arrayFromMedias)
            

            
            /*Navigation au clavier des médias*/
            arrayFromMedias.forEach(media => {
                media.addEventListener("keydown", (e)=>{
                    
                    if (e.keyCode == '13') {
                        count = media.index
                        max = arrayFromMedias.length
                        lightboxContent.generateLightbox(count)
                        nextImg.addEventListener("click", nextImgDisplay)
                        prevImg.addEventListener("click", prevImgDisplay)
                    }else if(e.keyCode == '27'/*Echap*/){
                        document.getElementById("displayLightbox").style.display = "none";
                    }else if(e.keyCode == '39'/*Flèche droite*/){
                        nextImgDisplay()
                    }else if(e.keyCode == '37'/*Flèche gauche*/){
                        prevImgDisplay()
                    }else if (e.keyCode =='32'/*Barre d'espace*/){
                        lightboxModal.firstChild.focus()
                    }
                })
            })

            arrayFromMedias.forEach(media => {

                media.addEventListener("click", function(){
                    count = media.index
                    max = arrayFromMedias.length
                    lightboxContent.generateLightbox(count)
                    nextImg.addEventListener("click", nextImgDisplay)
                    prevImg.addEventListener("click", prevImgDisplay)
                })
            })
            
            function nextImgDisplay(){
                count++
                count > max-1 ? count = 0 : count
                lightboxContent.generateLightbox(count)
                
            }

            function prevImgDisplay(){
                count--
                count < 0 ? count = max-1 : count 
                lightboxContent.generateLightbox(count)
                
            }
            
        }
    }
}

const closeIcon = document.getElementById("closeIcon");

closeIcon.addEventListener("click", ()=>{
    document.getElementById("displayLightbox").style.display = "none";
});
