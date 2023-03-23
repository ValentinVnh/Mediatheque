class Emprunt {
    constructor(idAdherent, idLivre) {
        this.id = idAdherent;
        this.nom = idLivre;
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
function creerElementLivre(livre) {
    let nouveauLivre = document.createElement("p");
    nouveauLivre.innerText = livre.titreLivre;
    return nouveauLivre;
}

/**
 * Emprunte le livre clické par l'utilisateur.
 * @param event
 * @returns {Promise<void>}
 */
async function emprunterUnLivre(event) {
    let elementClique = event.target;
    let reponse = prompt("Veuillez entrer votre nom d'adhérent qui empruntera\" " + elementClique.title + " \"");
    let req = await fetch(`php/Controller/ControllerAdherent.php?action=readAll`);
    let data = await req.json();
    let adherents = data.map(adherent => adherent.idAdherent);
    while (!adherents.includes(reponse) && reponse != null) {
        reponse = prompt("Veuillez entrer un nom d'adhérent valide.");
    }
    if (reponse != null) {
        let req = new XMLHttpRequest();
        req.open('GET', `php/Controller/ControllerEmprunt.php?action=create&idAdherent=${reponse}&idLivre=${elementClique.value}`, false);
        req.send();
        alert(elementClique.title + " emprunté.");
    }
}

/**
 * Ecouteur d'événement sur les livres disponibles.
 */
livresDisponibles.addEventListener("click", (event) => {
    emprunterUnLivre(event);
});


/**
 * Ecouteur pour rendre le livre clické par l'utilisateur.
 */
livresEmpruntes.addEventListener("click", (event) => {
    let elementClique = event.target;
    let reponse = confirm("Voulez-vous vraiment rendre " + elementClique.title + " ?");
    if (reponse) {
        let req = new XMLHttpRequest();
        req.open('GET', `php/Controller/ControllerEmprunt.php?action=delete&idLivre=${elementClique.value}`, false);
        req.send();
        alert(elementClique.title + " rendu.");
    }
});
