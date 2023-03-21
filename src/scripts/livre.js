const nouveauLivreTitre = document.getElementById("titreLivre");
const ajouterLivre = document.getElementById("ajouterLivre");

class Livre {
    constructor(idLivre, titreLivre) {
        this.titreLivre = titreLivre;
        this.idLivre = titreLivre;
    }
}

/**
 * Ajoute un nouveau livre dans la base de données
 */
function ajouterUnLivre() {
    fetch(`php/Controller/ControllerLivre.php?action=create&titre=${nouveauLivreTitre.value}`)
        .then(response => response.json())
        .catch(error => console.log(error));
    nouveauLivreTitre.value = "";
}

ajouterLivre.addEventListener("click", ajouterUnLivre);