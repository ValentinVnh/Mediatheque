async function recupererLivresDisponibles() {
    try {
        let req = await fetch(`php/Controller/ControllerLivre.php?action=readAllDisponibles`);
        let data = await req.json();
        const tabReq = data.map(async function (element) {
            return new Livre(element.idLivre, element.titreLivre);
        });
        for (const element of tabReq) {
            let data = await element;
            listeLivresDisponibles.insertAdjacentElement("beforeend", creerElement(data.idLivre, data.titreLivre));
        }
    } catch (error) {
        console.log(error);
    }
}

async function recupererLivresEmpruntes() {
    try {
        let req = await fetch(`php/Controller/ControllerLivre.php?action=readAllEmpruntes`);
        let data = await req.json();
        const tabReq = data.map(async function (element) {
            return new Livre(element.idLivre, element.titreLivre);
        });
        for (const element of tabReq) {
            let data = await element;
            livresEmpruntes.insertAdjacentElement("beforeend", creerElement(data.idLivre, data.titreLivre));
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Récupère tous les adhérents depuis la base de données
 * Ajout dans l'interface lors du chargement de la page
 * @returns {Promise<void>}
 */
async function recupererAdherents() {
    try {
        let req = await fetch(`php/Controller/ControllerAdherent.php?action=readAll`);
        let data = await req.json();
        const tabReq = data.map(async function (element) {
            return new Adherent(element.idAdherent, element.nomAdherent);
        });
        for (const element of tabReq) {
            let data = await element;
            listeAdherents.insertAdjacentElement("beforeend", creerElement(data.idAdherent, data.nomAdherent));
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * À partir d'un id et d'un nom, créée un élément HTML.
 * <p>
 *     L'id est <code>inscrit</code> dans la value de la balise. Le nom est inscrit dans le <code>title</code>.
 * @param id
 * @param nom
 * @returns {HTMLLIElement}
 */
function creerElement(id, nom) {
    let nouvelElement = document.createElement("li");
    nouvelElement.innerText = id + " — " + nom;
    nouvelElement.value = id;
    nouvelElement.title = nom;
    return nouvelElement;
}

window.addEventListener("load", () => {
    recupererAdherents();
    recupererLivresEmpruntes();
    recupererLivresDisponibles();
});
