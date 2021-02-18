const contactBtn = document.getElementById("contactBtn");
const closeFormBtn = document.getElementById("closeFormBtn");
const form = document.getElementById("displayForm");

function formDisplay(){
    form.style.display = "block";
}
contactBtn.addEventListener("click", formDisplay);

function closeForm(){
    form.style.display="none";
}
closeFormBtn.addEventListener("click", closeForm);

