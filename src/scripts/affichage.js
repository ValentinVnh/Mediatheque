const ROOT_URL = "php/Controller/";

const nomAdherent = document.getElementById('nomAdherent');
const ajouterAdherent = document.getElementById('ajouterAdherent');
const listeAdherents = document.getElementById('listeAdherents');

const nouveauLivreTitre = document.getElementById("titreLivre");
const ajouterLivre = document.getElementById("ajouterLivre");
const listeLivresDisponibles = document.getElementById("listeLivresDisponibles");


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
    let image = document.createElement("img");
    image.src = "img/x.svg";
    nouvelElement.innerHTML = id + " — " + nom + " " + image.outerHTML;
    nouvelElement.value = id;
    nouvelElement.title = nom;
    return nouvelElement;
}

/**
 * Action lors du chargement de la page
 */
window.addEventListener("load", () => {
    afficher(recupererAdherents(), listeAdherents);
    afficher(Livre.recupererLivres(), listeLivresDisponibles);
    afficher(Emprunt.recupererEmprunts(), livresEmpruntes);
});
