async function recupererLivresDisponibles() {
    try {
        let req = await fetch(`php/Controller/ControllerLivre.php?action=readAllDisponibles`);
        let data = await req.json();
        afficher(data.map(async function (element) {
            return new Livre(element.idLivre, element.titreLivre);
        }), listeLivresDisponibles);
    } catch (error) {
        console.log(error);
    }
}

async function recupererLivresEmpruntes() {
    try {
        let req = await fetch(`php/Controller/ControllerLivre.php?action=readAllEmpruntes`);
        let data = await req.json();
        afficher(tabReq = data.map(async function (element) {
            return new Livre(element.idLivre, element.titreLivre);
        }), livresEmpruntes);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Récupère tous les adhérents depuis la base de données
 * @returns {Array} liste des adhérents
 */
async function recupererAdherents() {
    try {
        let req = await fetch(`php/Controller/ControllerAdherent.php?action=readAll`);
        let data = await req.json();
        afficher(data.map(async function (element) {
            return new Adherent(element.idAdherent, element.nomAdherent);
        }), listeAdherents);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Ajoute des éléments HTML un container à partir d'un tableau
 * @param {Array} elements
 * @param {HTMLLIElement} container
 * @returns {Promise<void>}
 */
async function afficher(elements, container) {
    try {
        for (let element of elements) {
            let data = await element;
            container.insertAdjacentElement("beforeend", creerElement(data.id, data.nom));
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
    //afficher(recupererAdherents(), listeAdherents);
    recupererAdherents();
    recupererLivresEmpruntes();
    recupererLivresDisponibles();
});
