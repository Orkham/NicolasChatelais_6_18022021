const photographersSection = document.getElementById("photographers");

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
    }
}


/*Récupération des données du fichiers json data*/

const data = fetch("FishEyeDataFR.json")
.then(response=>response.json())

/*Récupération liste des photographes*/
.then((response)=> {
    const photographersArray=response.photographers;
    console.log(photographersArray);
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
                photographer.tags,
        ));
        
    }
    console.log(photographersList);
    return photographersArray;
})

/*Recréation du DOM avec les données json*/
.then((photographersArray)=>{
    for(let i = 0 ; i < photographersArray.length ; i++){
        let newArticle= document.createElement('article');
        photographersSection.prepend(newArticle);
        
        let newA = document.createElement('a');
        newA.href="photographer-page.html?id=" + photographersArray[i].id;
        newArticle.prepend(newA);
        
        let newImg = document.createElement('img');
        newImg.src="img/Photographers ID Photos/" + photographersArray[i].portrait;
        newA.append(newImg);
        
        let newH2 = document.createElement('h2');
        newH2.textContent = photographersArray[i].name;
        newA.append(newH2);
        
        let newDiv = document.createElement("div");
        newDiv.className = "presentation";
        newArticle.append(newDiv);

        let newP1 = document.createElement("p");
        newP1.className = "presentation__localisation";
        newP1.textContent = photographersArray[i].city + ", " + photographersArray[i].country;
        newDiv.append(newP1);

        let newP2 = document.createElement("p");
        newP2.className = "presentation__quote";
        newP2.textContent = photographersArray[i].tagline;
        newDiv.append(newP2);

        let newP3 = document.createElement("p");
        newP3.className = "presentation__price";
        newP3.textContent = photographersArray[i].price + " €/jour";
        newDiv.append(newP3);

        let newUl = document.createElement("ul");
        newUl.className = "tagList";
        newArticle.append(newUl);

        for(let tag of photographersArray[i].tags){
            let newLi = document.createElement("li");
            newUl.prepend(newLi);
            let newA = document.createElement("a");
            newLi.prepend(newA);
            //console.log(photographersArray[i].tags);
            newA.textContent = "#" + tag;
        }
        
    }
})

console.log(data);


let tagsSelectedList = [];
let tagsSelected = document.querySelectorAll(".tag");
for(let i = 0 ; i < tagsSelected.length ; i++){
    tagsSelected[i].addEventListener("click", saveTag);
}

function saveTag(tag){
    tagsSelectedList.push(tag.target.text);
    console.log(tagsSelectedList);
}



