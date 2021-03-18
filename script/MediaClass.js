import {nameById, transformTitle}  from './utils.js'

const photosSection = document.getElementById("photosSection");

/**
 * @param {object} media - Media importé du fichier JSON
 */
export class Factory{
    constructor(media){
        if(media.image){
            return new Image(media)
        }else if(media.video){
            return new Video(media)
        }
    }
}

/**
 * @param {object} media - Media fourni par la Factory
 */
export class Image{
    constructor(media)
    {
        this.id = media.id;
        this.photographerId = media.photographerId;
        this.image = media.image;
        this.tags = media.tags;
        this.likes = media.likes; 
        this.date = media.date;
        this.price = media.price;
        this.title = transformTitle(this.image,this.video);
        
        this.name = nameById(this.photographerId);
        
        this.generateDisplay = function(){
            photosSection.innerHTML +=
            `<figure class="photoCard">
                <img aria-label="photo" tabindex="0" src="img/${this.name}/${this.image}" alt="${this.title}" class="photoCard__img media" loading="lazy" id="id_${this.id}"></img>
                <figcaption>
                    <p class="photoCard__title">${this.title}</p>
                    <div class="photoCard__numbers">
                        <p class="photoCard__numbers--price"  tabindex="0">${this.price} €</p>
                        <p class="photoCard__numbers--like">${this.likes} <i class="fas fa-heart" tabindex="0"></i></p>
                    </div>
                </figcaption>
            </figure>`
        }
        
    }
}

/**
 * @param {object} media - Media fourni par la Factory
 */
export class Video{
    constructor(media)
    {
        this.id = media.id;
        this.photographerId = media.photographerId;
        this.video = media.video;
        this.tags = media.tags;
        this.likes = media.likes; 
        this.date = media.date;
        this.price = media.price;
        this.title = transformTitle(this.image,this.video);
        
        this.name = nameById(this.photographerId);
        
        this.generateDisplay = function(){
            photosSection.innerHTML +=
            `<figure class="photoCard">
            <video class="media" tabindex="0" aria-label="vidéo"><source src="img/${this.name}/${this.video}"  type="video/mp4" id="${this.id}">${this.title}</video>
                <figcaption>
                    <p class="photoCard__title">${this.title}</p>
                    <div class="photoCard__numbers">
                        <p class="photoCard__numbers--price"  tabindex="0">${this.price} €</p>
                        <p class="photoCard__numbers--like">${this.likes} <i class="fas fa-heart" tabindex="0"></i></p>
                    </div>
                </figcaption>
            </figure>`
        }
        
    }
}

let totalLikesNumber = document.getElementById("likesNumber");

/**
 * @param {array} array - Liste des médias à afficher
 */
export function displayMedias(array){
    let likes = 0;
    for (let i = 0 ; i < array.length ; i++){
        /*Affichage du média*/
        array[i].generateDisplay();
        /*Nombre total de like*/
        likes += array[i].likes;
    }
    totalLikesNumber.innerHTML = likes + ' <i class="fas fa-heart"></i>';
}

/*Gestion des likes*/
export function likesListener(){
    let likeBtns = document.querySelectorAll(".fa-heart")
    likeBtns.forEach(btn=>{
        btn.addEventListener("keydown", (e)=>{
            if(e.keyCode == '13'){
                btn.previousSibling.data++
                totalLikesNumber.childNodes[0].data++
            }
        })
    })
    likeBtns.forEach(btn=>{
        btn.addEventListener("click", ()=>{
            btn.previousSibling.data++
            totalLikesNumber.childNodes[0].data++
        })
    })
}
