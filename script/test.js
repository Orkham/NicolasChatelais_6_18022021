let btn = document.getElementById("btn");
btn.addEventListener("click", dataRecover);

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

const photographersArray;

async function dataRecover(){
    const response = await fetch("FishEyeDataFR.json");
    console.log(response);
    const jsonList = await response.json();
    console.log(jsonList);

    photographersArray = await response.photographers;
    //console.log(photographersArray);
    /*.then((response)=>{
        
        return response.json();
    }).then((response)=> {
        console.log(response);
        const photographersArray=response.photographers;
        console.log(photographersArray);
        return photographersArray;
    })*/
    return jsonList;
}
console.log(jsonList);

/*photographersSection.innerHTML += 
            <article>
                <a href='#'>
                    <img src='img\Mimi\Portrait_Nora.jpg' alt=''>
                    <h2 class='name'>Mimi Keel</h2>
                </a>
                <div class='presentation'>
                    <p class='presentation__localisation'>London, UK</p>
                    <p class='presentation__quote'>Voir le beau dans le quotidien</p>
                    <p class='presentation__price'>400€/jour</p>
                </div>
                <ul class='tagList'>
                    <li><a>#portrait</a></li>
                    <li><a>#events</a></li>
                    <li><a>#travel</a></li>
                    <li><a>#animals</a></li>
                </ul>
            </article>
            */

/*let newArticle= document.createElement('article');
        for(let tag of photographersList[i].tags){
            newArticle.className += tag + " "; 
        } 
        photographersSection.prepend(newArticle);
        
        let newA = document.createElement('a');
        newA.href="photographer-page.html?id=" + photographersList[i].id;
        newArticle.prepend(newA);
        
        let newImg = document.createElement('img');
        newImg.src="img/Photographers ID Photos/" + photographersList[i].portrait;
        newA.append(newImg);
        
        let newH2 = document.createElement('h2');
        newH2.textContent = photographersList[i].name;
        newA.append(newH2);
        
        let newDiv = document.createElement("div");
        newDiv.className = "presentation";
        newArticle.append(newDiv);

        let newP1 = document.createElement("p");
        newP1.className = "presentation__localisation";
        newP1.textContent = photographersList[i].city + ", " + photographersList[i].country;
        newDiv.append(newP1);

        let newP2 = document.createElement("p");
        newP2.className = "presentation__quote";
        newP2.textContent = photographersList[i].tagline;
        newDiv.append(newP2);

        let newP3 = document.createElement("p");
        newP3.className = "presentation__price";
        newP3.textContent = photographersList[i].price + " €/jour";
        newDiv.append(newP3);

        let newUl = document.createElement("ul");
        newUl.className = "tagList";
        newArticle.append(newUl);

        for(let tag of photographersList[i].tags){
            let newLi = document.createElement("li");
            newUl.prepend(newLi);
            let newA = document.createElement("a");
            newA.className = "tag";
            newLi.prepend(newA);
            newA.textContent = "#" + tag;
        }*/


        



