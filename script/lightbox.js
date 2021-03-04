//const images = document.querySelectorAll('photoCard__img');
    //console.log(images)

const closeIcon = document.getElementById("closeIcon");
/*
export function nextImgDisplay(){
    count++
    count > max-1 ? count = 0 : count = count
    console.log(count)
    lightboxContent.generateLightbox(count)
}
export function prevImgDisplay(){
    count--
    count < 0 ? count = max-1 : count = count
    console.log(count)
    lightboxContent.generateLightbox(count)
}
*/

closeIcon.addEventListener("click", ()=>{
    document.getElementById("displayLightbox").style.display = "none";

});