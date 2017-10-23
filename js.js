//sélection du bouton ok
var btn = document.querySelector('button[name="ok"]');
//sélection de la zone de saisie
var input1 = document.querySelector('input[name="input1"]');
//sélection de la liste
var todo = document.querySelector('#todo-list');
var todoli = document.createElement('li');
var span1 = document.createElement('span');
var nb=1;

function creationLi() {
  //si le champ saisit à une valeur (différente de rien)
  if (input1.value!="") {
  //ajout de la valeur de la saisie dans le span
  span1.innerText = input1.value;
  //création d'une clé avec un nombre incrémenté
  nb++;
  //ajout de la valeur de l'input dans localstorage
  localStorage.setItem('saisie'+ nb, span1.value);
  input1.value="";
  }
  else{
    alert('saisissez un todo');
  }

}

//positionnement du curseur dans l'input1 au chargement de la page
addEventListener('load',function(){
  input1.focus()
});

//activation de la fonction creation Li lors du click sur le bouton ajouter
btn.addEventListener('click',function(){
    creationLi();
});

//activation de la fonction creation Li lors de l'appui sur entree
input1.addEventListener('keypress',function(event){
  if (event.keyCode == 13) {
    creationLi();
  };
});
//affichage des li créés avant le chargement de page
addEventListener('load',function(){

  for (var i = 1; i < localStorage.length; i++) {
    todo.append(todoli);
    todoli.append(span1);
    span1.innerText = localStorage.getItem('saisie'+[i]);
    console.log(span1.innerText);
  }



  boutons();

});
function boutons(){
  //création d'un conteneur pour les boutons afin d'utiliser flex space-between
  var containbtn =  document.createElement('div');
  todoli.append(containbtn);
  containbtn.className = 'containbtn';

  //création du bouton supprimer
  var btnsup =  document.createElement('button');
  btnsup.innerText ='supprimer';
  containbtn.appendChild(btnsup);
    btnsup.className = 'btnsup';


  //suppression de la ligne lors du click sur le bouton supprimer
  btnsup.addEventListener('click', function(){
    todo.removeChild(todoli);
  })

  //création du bouton fait avec l'action d'ajouter une class qui barre le texteau click
  var btnfait = document.createElement('button');
  btnfait.innerText = 'fait';
  containbtn.appendChild(btnfait);
  btnfait.className = 'btnfait';
  btnfait.addEventListener('click', function(){
    span1.className = 'bare';
  })

  //création du bouton modifier
  var btnmodifier = document.createElement('button');
  btnmodifier.innerText = 'modifier';
  containbtn.appendChild(btnmodifier);
  btnmodifier.className = 'btnmodifier';

  //affichage des boutons au survol sur li si largeur d'écran supérieure à 768px
  if (window.matchMedia("(min-width: 768px)").matches) {
  todoli.addEventListener('mouseover', function(){
    containbtn.style.display = "flex";})
  todoli.addEventListener('mouseout', function(){
    containbtn.style.display = "none";})
  }
  //activation au click sur le bouton modifier
  btnmodifier.addEventListener('click', function(){
    //creation de la zone de saisie avec a l'intérieur la valeur du span en mémoire mais non appliquée
    var inputmodifier = document.createElement('input');
    var classBare = document.querySelector('.bare');

    inputmodifier.value = span1.innerText;
    //remplacement du span par une zone de saisie lors du click sur le bouton modifier
    btnmodifier.parentNode.firstChild = todoli.replaceChild(inputmodifier, span1);
    inputmodifier.focus();

    //enlever le style barré lors du click sur modifier si la class .bare est présente
    if (todoli.classList.contains("bare") || span1.classList.contains("bare")){
      todoli.classList.remove("bare");
      span1.classList.remove("bare");
    }

    //modification de la zone de saisie en span lors d'un click à côté de la zone de saisie
    inputmodifier.addEventListener('blur',function(){
      inputmodifier = todoli.replaceChild(span1,inputmodifier);
      span1.innerText = inputmodifier.value;
    });
  })
}
