class Adherent{
    constructor(idAdherent, nomAdherent) {
        this.id = idAdherent;
        this.nom = nomAdherent;
    }
}

/**
 * Ajoute un nouvel adherent dans la base de données
 */
async function ajouterUnAdherent(){
    fetch(`php/Controller/ControllerAdherent.php?action=create&nom=${nomAdherent.value}`)
        .then(response => response.json())
        .catch(error => console.log(error));
    nomAdherent.value = "";
}
ajouterAdherent.addEventListener("click", ajouterUnAdherent);

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