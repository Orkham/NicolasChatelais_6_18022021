import {firstLetterUp}  from './utils.js'


/*Tarif journalier*/
const dailyPrice = document.getElementById("price");


export class Photographer {
    constructor(object) 
    {
        this.city=object.city;
        this.country=object.country;
        this.id=object.id;
        this.name=object.name;
        this.portrait=object.portrait;
        this.price=object.price;
        this.tagline=object.tagline;
        this.tags=object.tags;

        /*Création entête avec info sur le photographe*/

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

        }
        
        /*Tarif journalier*/
        
        dailyPrice.textContent = this.price;

    }
}    