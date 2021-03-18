/*** IMPORTS ***/

import {firstLetterUp}  from './utils.js'



/*** DECLARATIONS ***/

const dailyPrice = document.getElementById("price");


/**
 * @param {node} section - Sélecteur du node principal de la page pour y insérer le contenu
 */
export class Photographer {
    constructor(object) 
    {
        this.city = object.city;
        this.country = object.country;
        this.id = object.id;
        this.name = object.name;
        this.portrait = object.portrait;
        this.price = object.price;
        this.tagline = object.tagline;
        this.tags = object.tags;



        /*** METHODE DE GENERATION DE LA PAGE DU PHOTOGRAPHE ***/

        this.generatePhotographerPage = function(){

            const photographerName = document.getElementById("photographerName");
            const photographerLocalisation = document.getElementById("photographerLocalisation");
            const photographerQuote = document.getElementById("photographerQuote");
            const portrait = document.getElementById("portrait");
            const tagList = document.getElementById("tagList");

            photographerName.textContent = this.name;
            photographerLocalisation.textContent = this.country + ", " + this.city;
            photographerQuote.textContent = this.tagline;

            for(let tag of this.tags){
                let newLi = document.createElement("li");
                tagList.append(newLi);
                let newButton = document.createElement("button");
                newButton.className = "tag";
                newButton.setAttribute("aria-label", "filtre des photographies par tag" + tag)
                newLi.append(newButton);
                newButton.textContent = "#" + firstLetterUp(tag);
            }

            portrait.setAttribute("src", "img/Photographers ID Photos/" + this.portrait);
            portrait.setAttribute("alt", this.portrait.slice(0,-4));
            
            dailyPrice.textContent = this.price;
        }
        


        /*** METHODE DE GENERATION DE L'ENTETE DU PHOTOGRAPHE POUR LA PAGE D'ACCUEIL ***/

        this.generatePhotographerCard = function(section){
            
            let newArticle= document.createElement('article');
            for(let tag of this.tags){
                newArticle.className += tag + " "; 
            } 
            section.append(newArticle);
            
            let newA = document.createElement('a');
            newA.href="photographer-page.html?id=" + this.id;
            newArticle.prepend(newA);
            
            let newImg = document.createElement('img');
            newImg.src="img/Photographers ID Photos/" + this.portrait;
            newImg.setAttribute("alt", this.name);
            newA.append(newImg);
            
            let newH2 = document.createElement('h2');
            newH2.textContent = this.name;
            newA.append(newH2);
            
            let newDiv = document.createElement("div");
            newDiv.className = "presentation";
            newArticle.append(newDiv);
    
            let newP1 = document.createElement("p");
            newP1.className = "presentation__localisation";
            newP1.textContent = this.city + ", " + this.country;
            newDiv.append(newP1);
    
            let newP2 = document.createElement("p");
            newP2.className = "presentation__quote";
            newP2.textContent = this.tagline;
            newDiv.append(newP2);
    
            let newP3 = document.createElement("p");
            newP3.className = "presentation__price";
            newP3.textContent = this.price + " €/jour";
            newDiv.append(newP3);
    
            let newUl = document.createElement("ul");
            
            newArticle.append(newUl);
    
            for(let tag of this.tags){
                let newLi = document.createElement("li");
                newUl.prepend(newLi);
                let newA = document.createElement("button");
                newA.className = "tag";
                newA.setAttribute("tabindex", "0");
                newA.setAttribute("aria-label", "bouton du tag " + tag + " du photographe servant aussi à filtrer les photographes ayant le même tag");
                newLi.prepend(newA);
                newA.textContent = "#" + tag;
            }
        }

        
    }
}    



/*** FONCTION CALLBACK D'AFFICHAGE DES PHOTOGRAPHES PAR TAG ***/

/**
 * 
 * @param {click} tag - tag sur lequel on a cliqué
 * @param {nodeList} tags - liste des tags sur la page
 * @param {Array of Objects} list - tableau stockant les données des photographes
 */

export function displayPhotographersByTag(tag, tags, list){

    const photographersList = document.getElementById("photographers").children;
    const photographersSection = document.getElementById("photographers");
    let tagSelected = tag.target.textContent.toLowerCase();

    //Activer le tag cliqué en ajoutant la class "active"
    tag.target.classList.toggle("active")
    
    for(let i = 0 ; i < tags.length ; i++){
        if(tags[i]!=tag.target)
        { 
            tags[i].classList.remove("active")
        }
    }
    
    /*Faire correspondre les tags sélectionnés et l'affichage*/

    if(tag.target.classList.contains("active")){
        for(let i = 0 ; i < photographersList.length ; i++){

            if((list[i].tags).includes(tagSelected.substring(1))){
                photographersList[i].style.display = "flex";
            }else{
                photographersList[i].style.display = "none";
            }
        }
    }else{
        photographersSection.innerHTML = ""
        for(let i = 0 ; i < list.length ; i++){
            list[i].generatePhotographerCard(photographersSection)
        }
    }
}
