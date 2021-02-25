const contactBtn = document.getElementById("contactBtn");
const closeFormBtn = document.getElementById("closeFormBtn");
const form = document.getElementById("displayForm");
const header = document.getElementById("photographerHeader");
const mainPage = document.getElementById("mainSection");
const envoyer = document.getElementById("envoyer");

const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const messageContent = document.getElementById("message");

const validateWindow = document.getElementById("displaySuccess");
const closeValidate = document.getElementById("closeValidate");

// CHECK VALIDATION ELEMENTS
let firstNameValidate;
let lastNameValidate;
let emailValidate;
let messageValidate;

function formDisplay(){
    form.style.display = "block";
    form.setAttribute("aria-hidden", false);
    mainPage.setAttribute("aria-hidden", true);
    header.setAttribute("aria-hidden", true);
    closeFormBtn.focus();
    giveFocus();
}
contactBtn.addEventListener("click", formDisplay);

function closeForm(){
    form.style.display="none";
    form.setAttribute("aria-hidden", true);
    mainPage.setAttribute("aria-hidden", false);
    header.setAttribute("aria-hidden", false);
    contactBtn.focus();
}
closeFormBtn.addEventListener("click", closeForm);

function validate(e){
    //ne pas envoyer le formulaire avant qu'il ne soit validé
    e.preventDefault();
    //vérification des champs
    checkForm();
    //validation des tests, envoi et reset du formulaire
    if( firstNameValidate == true &&
      lastNameValidate == true &&
      emailValidate == true &&
      messageValidate == true){
        sendData();
        document.getElementById("contactForm").reset();
    }else{
      //ne pas envoyer le formulaire si erreur
      e.preventDefault();
    }
}
  //écouteur bouton soumission formulaire
  envoyer.addEventListener("click",validate);

function checkForm(){
    checkFirst(firstName.value);
    checkLast(lastName.value);
    checkEmail(email.value);
    checkMessage(messageContent);
}

//fonction pour vérifier si un string est composé que de lettres, tirets ou apostrophes
function isLetterOnly(str){
    let re = new RegExp("^[a-zàéèêâôîûçäëïöüù'-]+$");
    //découpage du string en tableau de lettre pour pouvoir le parcourir
    let firstNameArray = str.toLowerCase().split("");
    //variable devant resté à zéro pour valider la fonction
    let verifLetter = 0;
    for(let i = 0; i < firstNameArray.length; i++){
      //pour chaque caractère ne passant pas le test regex on incrémente
      if(!re.test(firstNameArray[i])){
        verifLetter++;
      }
    }
    //on retourne la valeur qui servira à tester
    return verifLetter;
  }
  
// vérification si prénom au moins deux lettres et composé de lettres uniquement
function checkFirst(data){
    if((data.length > 1)&&(isLetterOnly(data))==0){
        document.getElementById("missingFirstName").style.display = "none";
        firstNameValidate = true;
    }else{
        document.getElementById("missingFirstName").style.display = "block";
        firstNameValidate = false;
    }
}

// vérification si nom au moins deux lettres et composé de lettres uniquement
function checkLast(data){
    if((data.length > 1)&&(isLetterOnly(data))==0){
        document.getElementById("missingLastName").style.display = "none";
        lastNameValidate = true;
    }else{
        document.getElementById("missingLastName").style.display = "block";
        lastNameValidate = false;
    }
}


/*** VERIFICATION VALIDITE ADRESSE MAIL REGEX ***/
function validateEmail(email){      
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email); 
} 

function checkEmail(email){
    if(validateEmail(email)){
        document.getElementById("missingMail").style.display = "none";
        emailValidate = true;
    }else{
        document.getElementById("missingMail").style.display = "block";
        emailValidate = false;
    }
}

/*** VERIFICATION MESSAGE ***/
function checkMessage(message){
    if(message.textLength > 0){
        document.getElementById("missingMessage").style.display = "none";
        messageValidate = true;
    }else{
        document.getElementById("missingMessage").style.display = "block";
        messageValidate = false;
    }
}

//Gestion de la fenêtre de confirmation d'envoi
function showValidateWindow(){
    validateWindow.style.display = "block";
}

function closeValidateWindow(){
    validateWindow.style.display = "none";
}
closeValidate.addEventListener("click", closeValidateWindow);

function sendData() {
    let XHR = new XMLHttpRequest();
    let form = document.getElementById("contactForm");
    let FD  = new FormData(form);

    // succès
    XHR.addEventListener('load', function() {
        showValidateWindow();
        console.log("ok");
        //alert('Votre message a bien été transmis.');
    });
   
    // erreur
    XHR.addEventListener('error', function() {
        alert('Oups! Quelque chose s\'est mal passé.');
    });

    // requête
    XHR.open('GET', 'index.html');

    // Envoi
    XHR.send(FD); 

    closeForm();
}  

const focusableItems = document.querySelectorAll(".focusable");
console.log(focusableItems);
function giveFocus(){
    focusableItems[0].focus();
    console.log("focus");
}

console.log(focusableItems[5]);
focusableItems[0].addEventListener("blur", console.log("test"),true);
focusableItems[4].addEventListener("blur", giveFocus, true);