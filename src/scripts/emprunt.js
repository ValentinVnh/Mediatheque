class Emprunt {
    constructor(idAdherent, idLivre) {
        this.id = idAdherent;
        this.nom = idLivre;
    }

    static async recupererEmprunts() {
        try {
            let req = await fetch(`${ROOT_URL}ControllerLivre.php?action=readAllEmpruntes`);
            let data = await req.json();
            return data.map(function (element) {
                return new Emprunt(element.idLivre, element.titreLivre);
            });
        } catch (error) {
            console.log(error);
        }
    }
}

/**
 * Ecouteur d'événement sur les livres disponibles.
 */
livresDisponibles.addEventListener("click", (event) => {
    emprunterUnLivre(event);
});

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
