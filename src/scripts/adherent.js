class Adherent{
    constructor(idAdherent, nomAdherent) {
        this.idAdherent = idAdherent;
        this.nomAdherent = nomAdherent;
    }
}

const nomAdherent = document.getElementById('nomAdherent');
const ajouterAdherent = document.getElementById('ajouterAdherent');
const listeAdherents = document.getElementById('listeAdherents');

/**
 * Ajoute un nouvel adherent dans la base de données
 */
async function ajouterUnAdherent(){
    fetch(`php/Controller/ControllerAdherent.php?action=create&nom=${nomAdherent.value}`)
        .then(response => response.json())
        .catch(error => console.log(error));
    nomAdherent.value = "";
}
ajouterAdherent.addEventListener("click", ajouterUnAdherent);

/**
 * Crée un adherent sous format HTML.
 * @param {adherent} adherent
 * @returns Un adherent format HTML
 */
function creerElementLivre(adherent) {
    let nouveauAdherent = document.createElement("li");
    nouveauAdherent.innerText = adherent.value;
    return nouveauAdherent;
}