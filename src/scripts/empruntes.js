afficherEmpruntes();

function afficherEmpruntes() {
    fetch("php/Controller/ControllerLivre.php?action=readAllEmpruntes")
        .then(response => response.json())
        .then(data => {
                let empruntes = document.getElementById("listeLivresEmpruntes");
                empruntes.innerHTML = "";
                let unordredList = document.createElement("ul");

                for (let element of data) {
                    let li = document.createElement("li");

                    let actions = document.createElement("div");

                    let adherent = document.createElement("img");
                    adherent.addEventListener("click", () => {
                        Swal.fire({
                            title: "Adhérent",
                            text: element.idAdherent,
                            icon: "info",
                            confirmButtonText: "OK"
                        });
                    });
                    adherent.src = "img/person.svg";

                    let information = document.createElement("img");
                    information.src = "img/image.svg";

                    let couverture = document.createElement("img");

                    information.addEventListener("click", () => {
                        afficherCouvertureLivre(element.titreLivre, couverture);
                    });

                    let rendre = document.createElement("img");
                    rendre.src = "img/x.svg";
                    rendre.addEventListener("click", () => {
                        rendreLeLivre(element.idLivre);
                    });

                    actions.appendChild(adherent);
                    actions.appendChild(information);
                    actions.appendChild(couverture);
                    actions.appendChild(rendre);

                    li.innerHTML = element.idAdherent + " — " + element.titreLivre;
                    li.appendChild(actions);

                    unordredList.appendChild(li);
                }

                empruntes.appendChild(unordredList);
            }
        )
        .catch(e => {
            Swal.fire({
                title: "Erreur",
                text: "Une erreur est survenue lors de la récupération des livres empruntés.",
            });
            console.error(e);
        });
}

async function rendreLeLivre(id) {
    const {value: validation} = await Swal.fire({
        title: "Rendre le livre",
        text: "Voulez-vous vraiment rendre ce livre ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Supprimer",
        cancelButtonText: "Annuler",
    });


    if (validation) {
        fetch("php/Controller/ControllerEmprunt.php?action=delete&idLivre=" + id)
            .then(() => {
                afficherEmpruntes();
                afficherDisponibles();
                afficherAdherents();
                Swal.fire({
                    title: "Rendu",
                    text: "Le livre a été rendu.",
                });
            })
            .catch(e => {
                Swal.fire({
                    title: "Erreur",
                    text: "Une erreur est survenue lors de la restitution du livre.",
                });
                console.error(e);
            });
    }
}
