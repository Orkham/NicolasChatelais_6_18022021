const photographersSection = document.getElementById("photographers");
const articlesList = document.getElementById("photographers").children;

/*Construction d'objet pour les photographes*/

class Photographer {
    constructor(
        city,
        country,
        id,
        name,
        portrait,
        price,
        tagline,
        tags
    ) {
        this.city=city;
        this.country=country;
        this.id=id;
        this.name=name;
        this.portrait=portrait;
        this.price=price;
        this.tagline=tagline;
        this.tags=tags;

        this.generatePhotographerCard = function(){
            
            let newArticle= document.createElement('article');
            for(let tag of this.tags){
                newArticle.className += tag + " "; 
            } 
            photographersSection.append(newArticle);
            
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
            //newUl.className = "tagList";
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


/*Récupération des données du fichiers json data*/

fetch("FishEyeDataFR.json")
.then(response=>response.json())

/*Récupération liste des photographes*/
.then((response)=> {
    const photographersArray=response.photographers;
    //console.log(photographersArray);
    return photographersArray;
})

/*Création d'un tableau contenant la liste de tous les photographes et leurs données*/
.then((photographersArray)=>{
    let photographersList =[];
    for (let photographer of photographersArray){
        //console.log(photographer.name);
        photographersList.push(
            new Photographer(
                photographer.city,
                photographer.country,
                photographer.id,
                photographer.name,
                photographer.portrait,
                photographer.price,
                photographer.tagline,
                photographer.tags
        ));
        
    }
    return photographersList;
})

/*Recréation du DOM avec les données json*/
.then((photographersList)=>{
    
    for(let i = 0 ; i < photographersList.length ; i++){

        photographersList[i].generatePhotographerCard()

    }
    return photographersList;
})
.then((photographersList)=>{
    
    /* Ecoute des boutons tags*/
    let tagsSelected = document.querySelectorAll(".tag");
   
    for(let i = 0 ; i < tagsSelected.length ; i++){
        tagsSelected[i].addEventListener("click", displayPhotographersByTag);
    }
    
    function displayPhotographersByTag(tag){
        
        let tagSelected = tag.target.textContent.toLowerCase();
        tag.target.classList.toggle("active")
        
        for(let i = 0 ; i < tagsSelected.length ; i++){
            if(tagsSelected[i]!=tag.target)
            { 
                tagsSelected[i].classList.remove("active")
            }
        }
        
        /*Faire correspondre les tags sélectionnés et l'affichage*/
        if(tag.target.classList.contains("active")){
            for(let i = 0 ; i < articlesList.length ; i++){

                if((photographersList[i].tags).includes(tagSelected.substring(1))){
                    articlesList[i].style.display = "flex";
                }else{
                    articlesList[i].style.display = "none";
                }
            }
        }else{
            photographersSection.innerHTML = ""
            for(let i = 0 ; i < photographersList.length ; i++){
                photographersList[i].generatePhotographerCard()
            }
        }
        
    }


    /*Fonction skip to content*/
    const skipToContent = document.getElementById("skipToContent");
    document.addEventListener("keydown", shortcutToMain);

    function shortcutToMain(e) {
        
        if(e.keyCode == '9')
        {
            skipToContent.style.display = "block";
            skipToContent.focus();
            document.removeEventListener("keydown", shortcutToMain);
        }
    }
});
