


let data; // Déclarer la variable data en dehors de la portée des fonctions

// Fonction pour charger les années
function chargerAnnees() {
  const annees = [...new Set(data.map(album => album["Annee du top"]))];
  const select = document.getElementById("anneeSelect");

  // Ajouter les options au dropdown
  annees.forEach(annee => {
    const option = document.createElement("option");
    option.value = annee;
    option.text = annee;
    select.add(option);
  });

  

  // Définir par défaut sur 2022
  select.value = "2022";

  select.addEventListener("change", function () {
    filtrerParAnnee();
    creerEtAnimerRayons();
  });
}

// Fonction pour filtrer les albums par année sélectionnée
function filtrerParAnnee() {
  const anneeSelectionnee = document.getElementById("anneeSelect").value;
  const albumsFiltres = data.filter(album => album["Annee du top"] == anneeSelectionnee);

  // Appeler la fonction de génération d'images avec les albums filtrés
  genererImages(albumsFiltres);
}

// Fonction pour générer les images
function genererImages(albums) {
  const container = document.getElementById('data-cover');
  container.innerHTML = ""; // Effacer le contenu précédent

  albums.forEach((album, index) => {
    const angle = angles[index];
    const posX = rayonSoleil + rayonSoleil * Math.cos(toRadians(angle));
    const posY = rayonSoleil + rayonSoleil * Math.sin(toRadians(angle));

   

    // Ajouter un lien autour de chaque image
    container.innerHTML += `<a href="informations_album.html?album=${encodeURIComponent(album['Nom d\'album'])}">
                             <img src="${album['Image album']}" style="top: ${posY}px; left: ${posX}px"/>
                             </a>`;
  });
}


// Charger le fichier JSON et initialiser
fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData; // Assigner les données à la variable data
    chargerAnnees();
    filtrerParAnnee(); // Affiche les albums de l'année par défaut (2022)
  })
  .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));






  // Définir les paramètres du soleil
const rayons = 10;
const rayonSoleil = 400;
const largeurLigne = 2;

const angleDepart = 0;
const angleFin = -165;
// const angleFin = -200;

// Créer l'élément SVG
const svg = d3.select('#graph')
  .attr("width", 2 * rayonSoleil)
  .attr("height", 2 * rayonSoleil);

// Calculer les angles pour répartir les rayons
const angles = d3.range(angleDepart, angleFin, angleFin / rayons);

console.log('angles', angles)

// Fonction pour convertir les degrés en radians
const toRadians = degrees => degrees * (Math.PI / 180);

// Créer les rayons 
svg.selectAll("line")
  .data(angles)
  .enter().append("line")
  .attr("x1", rayonSoleil)
  .attr("y1", rayonSoleil)
  .attr("x2", (d) => rayonSoleil + rayonSoleil * Math.cos(toRadians(d)))
  .attr("y2", (d) => rayonSoleil + rayonSoleil * Math.sin(toRadians(d)))
  .attr("stroke", "#D7D7D7")
  .attr("stroke-width", largeurLigne);


// Créer le rond en bout de chaque ligne
angles.forEach(angle => {
  svg.append('circle')
    .attr("cx", rayonSoleil + rayonSoleil * Math.cos(toRadians(angle)))
    .attr("cy", rayonSoleil + rayonSoleil * Math.sin(toRadians(angle)))
    .attr("r", 5)
    .attr("fill", "#D7D7D7")
});

// Fin création SVG




// Fonction pour créer et animer les rayons du soleil
function creerEtAnimerRayons() {
  // Sélectionner les lignes représentant les rayons
  const rayons = svg.selectAll("line");

  // Animation de rétraction des rayons
  rayons.transition()
    .duration(500)
    .attr("x2", rayonSoleil)
    .attr("y2", rayonSoleil);

  // Animation de déploiement des rayons
  rayons.transition()
    .delay(500) // Attendre la fin de l'animation de rétraction
    .duration(500)
    .attr("x2", (d) => rayonSoleil + rayonSoleil * Math.cos(toRadians(d)))
    .attr("y2", (d) => rayonSoleil + rayonSoleil * Math.sin(toRadians(d)));

  // Sélectionner les cercles représentant les ronds en bout de chaque ligne
  const cercles = svg.selectAll("circle");

  // Animation de réduction des cercles
  cercles.transition()
    .duration(500)
    .attr("r", 0);

  // Animation de ré-agrandissement des cercles
  cercles.transition()
    .delay(500) // Attendre la fin de l'animation de réduction
    .duration(500)
    .attr("r", 5); // Ajuste la taille selon tes besoins
}
