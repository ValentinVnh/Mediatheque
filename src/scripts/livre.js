class Livre {
    constructor(idLivre, titreLivre) {
        this.titreLivre = titreLivre;
        this.idLivre = titreLivre;
    }
}

const nouveauLivreTitre = document.getElementById("titreLivre");
const ajouterLivre = document.getElementById("ajouterLivre");
const listeLivresDisponibles = document.getElementById("listeLivresDisponibles");

/**
 * Ajoute un nouveau livre dans la base de données
 */
function ajouterUnLivre() {
    fetch(`php/Controller/ControllerLivre.php?action=create&titre=${nouveauLivreTitre.value}`)
        .then(response => response.json())
        .catch(error => console.log(error));
    //listeLivresDisponibles.insertAdjacentElement("beforeend", creerElementLivre(nouveauLivreTitre));
    nouveauLivreTitre.value = "";
}
ajouterLivre.addEventListener("click", ajouterUnLivre);

/**
 * Crée un livre sous format HTML.
 * @param {Livre} livre
 * @returns Un livre format HTML
 */
function creerElementLivre(livre) {
    let nouveauLivre = document.createElement("li");
    nouveauLivre.innerText = livre.value;
    return nouveauLivre;
}