/*Fonction utilitaire permettant de passer la première lettre en majuscule*/

export function firstLetterUp(str){
    return (str + '').charAt(0).toUpperCase()+str.substr(1);
}



/*Fonction faisant correspondre l'id du photographe à son nom pour naviguer dans les dossiers médias*/

export function nameById(id){
    switch(id){
        case 243:
        return "Mimi";
        case 930:
        return "Ellie Rose";
        case 82:
        return "Tracy";
        case 527:
        return "Nabeel";
        case 925:
        return "Rhode";
        case 195:
        return "Marcel";
    }
}



/*Fonction de mise en forme des titres des médias pour les rendre utilisables à l'affichage*/

export function transformTitle(image,video){
    /*Expression régulière pour enlever "_"*/
    let re = /_/g;
    /*On remplace les "_" par un espace*/
    if(image){
        let beautifulTitle = image.replace(re, " ").slice(0,-4);
        return beautifulTitle;
    }else{
        let beautifulTitle = video.replace(re, " ").slice(0,-4);
        return beautifulTitle;
    }
}



/*Fonction utilitaire pour ôter une classe d'un élément du DOM*/

export function unsetClass(nodeList, classToRemove){
    nodeList.forEach(node=>{
        node.classList.remove(classToRemove)
    })
}



/*Fonction de navigation*/

export function shortcutToMain(e, displayBox) {
    
    if(e.keyCode == '9')
    {
        displayBox.style.display = "block";
        displayBox.focus();
        document.removeEventListener("keydown", shortcutToMain);
    }
}
