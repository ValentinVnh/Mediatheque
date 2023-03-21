
async function recupererLivresDisponibles() {
    fetch(`php/Controller/ControllerLivre.php?action=readAll`)
        .then(response => response.json())
        .then(response => Emprunt.tableauVersObjet(response))
        .then(response => ajouterLivresDisponibles(response))
        .catch(error => console.log(error));
}