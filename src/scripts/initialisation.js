const listeAdherents2 = document.getElementById('listeAdherents');


async function recupererLivresDisponibles() {
    fetch(`php/Controller/ControllerLivre.php?action=readAll`)
        .then(response => response.json())
        .then(response => Emprunt.tableauVersObjet(response))
        .then(response => ajouterLivresDisponibles(response))
        .catch(error => console.log(error));
}

/**
 * Récupère tous les adhérents depuis la base de données
 * Ajout dans l'interface lors du chargement de la page
 * @returns {Promise<void>}
 */
async function recupererAdherents(){
    try{
        let req = await fetch(`php/Controller/ControllerAdherent.php?action=readAll`);
        let data = await req.json();
        const tabReq = data.map(async function (element) {
            return new Adherent(element.idAdherent, element.nomAdherent);
        });
        for (const element of tabReq) {
            let data = await element;
            listeAdherents.insertAdjacentElement("beforeend", creerElementAdherent(data.idAdherent, data.nomAdherent));
        }
    }catch(error) {
        console.log(error);
    }
}
window.addEventListener("load", recupererAdherents);


function creerElementAdherent(idAdherent, adherentsNom) {
    let nouveauAdherent = document.createElement("li");
    nouveauAdherent.innerText = idAdherent + '-' + adherentsNom;
    return nouveauAdherent;
}