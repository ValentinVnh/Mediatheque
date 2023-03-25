class Livre {
    constructor(idLivre, titreLivre) {
        this.id = idLivre;
        this.nom = titreLivre;
    }

    static async recupererLivres() {
        try {
            let req = await fetch(`${ROOT_URL}ControllerLivre.php?action=readAllDisponibles`);
            let data = await req.json();
            return data.map(function (element) {
                return new Livre(element.idLivre, element.titreLivre);
            });
        } catch (error) {
            console.log(error);
        }
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