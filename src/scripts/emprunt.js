class Emprunt {
    constructor(idAdherent, idLivre) {
        this.idAdherent = idAdherent;
        this.idLivre = idLivre;
    }
}

const livresEmpruntes = document.getElementById("listeLivresEmpruntes");
const livresDisponibles = document.getElementById("listeLivresDisponibles");

/**
 * Ajoute l'ensemble des livres empruntés passé en paramètre.
 * Cela peut s'agir d'un seul livre.
 * @param {Array<Livre>} livres
 */
function ajouterLivresEmpruntes(livres) {
    for (let livre of livres) {
        livresEmpruntes.insertAdjacentElement("beforeend", creerElementLivre(livre))
    }
}

/**
 * Ajoute l'ensemble des livres disponibles passé en paramètre.
 * Cela peut s'agir d'un seul livre.
 * @param {Array<Livre>} livres
 */
function ajouterLivresDisponibles(livres) {
    for (let livre of livres) {
        livresDisponibles.insertAdjacentElement("beforeend", creerElementLivre(livre));
    }
}

/**
 * Crée un livre sous format HTML.
 * @param {Livre} livre
 * @returns Un livre format HTML
 */
export function creerElementLivre(livre) {
    let nouveauLivre = document.createElement("p");
    nouveauLivre.innerHTML(livre.titreLivre);
    return nouveauLivre;
}