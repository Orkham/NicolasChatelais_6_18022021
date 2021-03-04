/*
document.getElementById("compteur").addEventListener("click",incremente)
var compteur = 0;
function incremente(){
compteur ++;
document.getElementById("compteur").firstChild.nodeValue = compteur;
}
*/
let icone = document.getElementById("icone")
let likes = document.getElementById("likes").textContent
icone.addEventListener("click",()=>{
    likes++
    document.getElementById("likes").firstChild.nodeValue = likes
    console.log(document.getElementById("likes"))
})


