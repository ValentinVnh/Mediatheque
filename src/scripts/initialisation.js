async function recupererLivresDisponibles() {
    try {
        let req = await fetch(`php/Controller/ControllerLivre.php?action=readAllDisponibles`);
        let data = await req.json();
        return data.map(function (element) {
            return new Livre(element.idLivre, element.titreLivre);
        });
    } catch (error) {
        console.log(error);
    }
}

async function recupererLivresEmpruntes() {
    try {
        let req = await fetch(`php/Controller/ControllerLivre.php?action=readAllEmpruntes`);
        let data = await req.json();
        return data.map(function (element) {
            return new Livre(element.idLivre, element.titreLivre);
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Récupère tous les adhérents depuis la base de données
 */
async function recupererAdherents() {
    try {
        let req = await fetch(`php/Controller/ControllerAdherent.php?action=readAll`);
        let data = await req.json();
        return data.map(function (element) {
            return new Adherent(element.idAdherent, element.nomAdherent);
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Ajoute des éléments HTML un container à partir d'un tableau
 * @param {Promise} elements
 * @param {HTMLLIElement} container
 * @returns {Promise<void>}
 */
function afficher(elements, container) {
    elements.then(function (data) {
        for (let element of data) {
            container.insertAdjacentElement("beforeend", creerElement(element.id, element.nom));
        }
    });
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
    afficher(recupererAdherents(), listeAdherents);
    afficher(recupererLivresDisponibles(), listeLivresDisponibles);
    afficher(recupererLivresEmpruntes(), livresEmpruntes);
    //recupererAdherents();
    //recupererLivresEmpruntes();
    //recupererLivresDisponibles();
});
