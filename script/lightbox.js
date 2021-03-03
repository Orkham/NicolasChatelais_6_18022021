//const images = document.querySelectorAll('photoCard__img');
    //console.log(images)

const closeIcon = document.getElementById("closeIcon");



closeIcon.addEventListener("click", ()=>{
    document.getElementById("displayLightbox").style.display = "none";
});