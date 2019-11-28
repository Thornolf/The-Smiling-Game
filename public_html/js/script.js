var sonVictoire = document.createElement("audio");
sonVictoire.src = "sound/win.ogg";

var sonDefaite = document.createElement("audio");
sonDefaite.src = "sound/fail.ogg";

var NombreDeVictoire = 0;

var ChronoGlobal = 0;
 
var ChronoManche = 0;

var ListeScores = new Array();

function generationNouveauTableau(taille, max) {    
    return Array.apply(null, Array(taille)).map(function() {
        return Math.round(Math.random() * max);
    });
}

function ajoutDuChemin(tableau) {
    
    for (var i = 0; i < 24; i++) {
        tableau[i]= "images/tristes/" + tableau[i] + ".jpg"
    }
    tableau[i]= "images/joyeux/" + tableau[i] + ".jpg"
    return (tableau);
}

/* La functon mélange le contenu du tableau pour que la position du personnage joyeux soit ainsi aléatoire avec l'aide de la librairie de math du JS */
/* Il y a un index qui permet de parcourire le tableau ainsi qu'un increment pour faire les échanges. La variable tempo */
function melangeDuTableau(tableau) {
    for (var index = tableau.length - 1; index > 0; index--) {
        var increment = Math.floor(Math.random() * (index + 1));
        var tempo = tableau[index];
        tableau[index] = tableau[increment];
        tableau[increment] = tempo;
    }
    return (tableau)
}

/* On veut faire la moyenne du tableau, on fait donc la somme total et le divise par le nombre d'element*/
function moyenne(tableau) {
    var sommeTotal = 0;
        for( var index = 0; index < tableau.length; index++ ){
        sommeTotal = sommeTotal + tableau[index];
}
    var moyenne = sommeTotal/tableau.length;
    return (moyenne);
}

function remplacerImages(tableau){
    for (var index = 0; index < 25; index++) {
        document.getElementById(index + 1).src=tableau[index];
    }
}

  function chronometrageGlobal() {
  setInterval(function() {
    document.getElementById("Global").innerText = "Le jeu dure depuis : " + ChronoGlobal++ + " secondes !";
   }, 1000);
 }
 
  function chronometrageManche() {
  setInterval(function() {
    document.getElementById("Manche").innerText = "La manche dure depuis : " + ChronoManche++ + " secondes !";
   }, 1000);
 }

  function tableauDesScores() {
    document.getElementById("Score").innerText = "Vous avez gagné : " + NombreDeVictoire + " fois.";
  }
  
  function tempsMoyen() {
      if (ListeScores.length == 0)
        document.getElementById("Moyenne").innerText = "Vous n'avez pas encore de score.";
    else
        document.getElementById("Moyenne").innerText = "Le temps moyen pour trouver un visage souriant est de : " + Math.round(moyenne(ListeScores)) + " secondes.";
  }
  
  function opaciteMinimum() {
      for (var index = 1; index <= 25; index++) {
         $(".img" + index).css('opacity', '1.0');
      }
  }
  
  function recommencer() {  
    opaciteMinimum();
    NombreDeVictoire = 0;
    ChronoGlobal = 0;
    ChronoManche = 0;
    ListeScores = [];
    tableauDesScores();
    tempsMoyen();
    remplacerImages(melangeDuTableau(ajoutDuChemin(generationNouveauTableau(25, 600))));
  }
  
  function victoire() {
      opaciteMinimum();
      remplacerImages(melangeDuTableau(ajoutDuChemin(generationNouveauTableau(25, 600))));
      sonVictoire.play();
      ListeScores.push(ChronoManche);
      ChronoManche = 0;
      NombreDeVictoire++;
      tableauDesScores();
      tempsMoyen();
  }
  
  function defaite(event) {
      sonDefaite.play();
      $(".img" + event.target.id).css('opacity', '0.2');
  }
  
 
$(document).ready(function(){
    chronometrageGlobal();
    chronometrageManche();
    remplacerImages(melangeDuTableau(ajoutDuChemin(generationNouveauTableau(25, 600))));
 $("img").click(function(event){
     var path = document.getElementById(event.target.id).src;
     if (path.search("joyeux") != -1) {
         victoire();
     }
     else
     {
         defaite(event)
     }
 });
});

