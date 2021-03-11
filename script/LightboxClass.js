/*** DECLARATIONS ***/

const lightbox = document.getElementById("displayLightbox");
const photoTitle = document.getElementById("photoTitle")
const lightboxModal = document.getElementById("lightbox-modal");
const nextImg = document.getElementById("nextIcon");
const prevImg = document.getElementById("prevIcon");



/*** OBJET QUI GERE L'AFFICHAGE DES MEDIAS EN PLEIN ECRAN (carrousel) ***/

export class Lightbox{
    constructor(medias){
        
        this.medias = medias,

        /*Création d'un index pour chaque média pour faciliter le suivi de navigation*/

        this.createIndex = function(){
            this.medias.forEach(media => {
                Object.defineProperty(media, 'index',{
                    value : medias.indexOf(media)})
            })
        },
        this.createIndex(),

        /*Affichage lightbox modal*/

        this.generateLightbox = function(index){
            lightbox.style.display = "flex";
            
            if(this.medias[index].nodeName == "IMG"){
                lightboxModal.innerHTML = `<img src="${this.medias[index].src}" alt="${this.medias[index].alt}" class="lightbox-modal__box--photo" style="max-width:100%"></img>`
                photoTitle.innerHTML = `${this.medias[index].alt}`
            }else{
                lightboxModal.innerHTML = `<video controls style="max-width:100%" tabindex="0"><source  src="${this.medias[index].currentSrc}" alt="${this.medias[index].textContent}" type="video/mp4" class="lightbox-modal__box--photo" ></video>`
                photoTitle.innerHTML = `${this.medias[index].textContent}`
            }
        },
        

/*Fonction d'écoute pour affichage de la lightbox appelé après chaque tri*/

        this.listenForLightbox = function(){
            //navigation avec l'index
            let count = 0;
            //retour au début quand on dépasse le max
            let max = 0;
            
            let medias = document.querySelectorAll(".media")
            let arrayFromMedias = Array.from(medias)
            let lightboxContent = new Lightbox(arrayFromMedias)
            

            
            /*Navigation au clavier des médias*/
            function keyboardNavigation(){
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
            }
            keyboardNavigation()

            function mouseNavigation(){
                arrayFromMedias.forEach(media => {

                    media.addEventListener("click", ()=>{
                        count = media.index
                        max = arrayFromMedias.length
                        lightboxContent.generateLightbox(count)
                        nextImg.addEventListener("click", nextImgDisplay)
                        prevImg.addEventListener("click", prevImgDisplay)
                        //keyboardNavigation()
                    })
                })
            }
            mouseNavigation()
            

            
            
            //Callback média suivant
            function nextImgDisplay(){
                count++
                count > max-1 ? count = 0 : count
                lightboxContent.generateLightbox(count)
                
            }

            //Callback média précédent
            function prevImgDisplay(){
                count--
                count < 0 ? count = max-1 : count 
                lightboxContent.generateLightbox(count)
                
            }
            
        }
    }
}


//Fermeture de la lightbox par icône croix

const closeIcon = document.getElementById("closeIcon");

closeIcon.addEventListener("click", ()=>{
    document.getElementById("displayLightbox").style.display = "none";
});
