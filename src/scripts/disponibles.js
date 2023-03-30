afficherDisponibles();

function afficherDisponibles() {
    try {
        fetch("php/Controller/ControllerLivre.php?action=readAllDisponibles")
            .then(response => response.json())
            .then(data => {
                let disponibles = document.getElementById("listeLivresDisponibles");
                disponibles.innerHTML = "";
                let unordredList = document.createElement("ul");
                for (let element of data) {
                    let li = document.createElement("li");

                    let intitule = document.createElement("div");
                    intitule.innerHTML = element.idLivre + " — " + element.titreLivre;

                    intitule.addEventListener("click", () => {
                        emprunterLeLivre(element.idLivre, element.titreLivre);
                    });

                    let actions = document.createElement("div");

                    let information = document.createElement("img");
                    information.src = "img/image.svg";

                    let couverture = document.createElement("img");

                    information.addEventListener("click", () => {
                        afficherCouvertureLivre(element.titreLivre, couverture);
                    });

                    let supprimer = document.createElement("img");
                    supprimer.src = "img/x.svg";
                    supprimer.addEventListener("click", () => {
                        supprimerLeLivre(element.idLivre);
                    });

                    actions.appendChild(couverture);
                    actions.appendChild(information);
                    actions.appendChild(supprimer);

                    li.appendChild(intitule);
                    li.appendChild(actions);

                    unordredList.appendChild(li);
                }
                disponibles.appendChild(unordredList);
            });
    } catch (e) {
        Swal.fire({
            title: "Erreur", text: "Une erreur est survenue lors de la récupération des livres disponibles.",
        });
        console.error(e);
    }
}

document.getElementById("ajouterLivre").addEventListener("click", () => {
    fetch("php/Controller/ControllerLivre.php?action=create", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: `titre=${document.getElementById("titreLivre").value}`
    })
        .then(() => {
            afficherEmpruntes();
            afficherDisponibles();
            afficherAdherents();
            document.getElementById("titreLivre").value = "";
        })
        .catch(e => {
            Swal.fire({
                title: "Erreur", text: "Une erreur est survenue lors de l'ajout du livre.",
            });
            console.error(e)
        });
});

async function emprunterLeLivre(id, titre) {
    const {value: reponse} = await Swal.fire({
        title: "Emprunter le livre",
        text: "Veuillez entrer le nom de l'adhérent qui emprunte le livre \"" + titre + "\" .",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Emprunter",
        cancelButtonText: "Annuler",
    });
    if (reponse) {
        fetch("php/Controller/ControllerAdherent.php?action=readAll")
            .then(data => data.json())
            .then((data) => data.some((adherent) => adherent.idAdherent === reponse))
            .then((result) => {
                if (!result) {
                    Swal.fire({
                        title: "Erreur", text: "L'adhérent n'existe pas.",
                    });
                } else if (reponse != null) {
                    const rep = fetch("php/Controller/ControllerEmprunt.php?action=create", {
                        method: 'POST',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        body: `idLivre=${id}&idAdherent=${reponse}`
                    })
                        .then(() => {
                            afficherEmpruntes();
                            afficherDisponibles();
                            afficherAdherents();
                            Swal.fire({
                                title: "Emprunt", text: "Le livre a été emprunté.",
                            });
                        })
                        .catch(e => {
                            Swal.fire({
                                title: "Erreur", text: "Une erreur est survenue lors de l'emprunt du livre.",
                            });
                            console.error(e);
                        });
                }
            });
    }
}

function supprimerLeLivre(id) {
    if (confirm("Voulez-vous vraiment supprimer ce livre ?")) {
        fetch("php/Controller/ControllerLivre.php?action=delete&id=" + id)
            .then(() => {
                afficherDisponibles();
                Swal.fire({
                    title: "Suppression", text: "Le livre a été supprimé.",
                });
            })
            .catch(e => {
                Swal.fire({
                    title: "Erreur", text: "Une erreur est survenue lors de la suppression du livre.",
                });
                console.error(e);
            });
    } else {
        Swal.fire({
            title: "Annulation", text: "Le livre n'a pas été supprimé.",
        });
    }
}