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
                adherent.src = "img/person.svg";

                let couverture = document.createElement("img");
                couverture.src = "img/image.svg";

                let rendre = document.createElement("img");
                rendre.src = "img/x.svg";
                rendre.addEventListener("click", () => {
                    rendreLeLivre(element.idLivre);
                });

                actions.appendChild(adherent);
                actions.appendChild(couverture);
                actions.appendChild(rendre);

                li.innerHTML = element.idAdherent + " — " + element.titreLivre;
                li.appendChild(actions);

                unordredList.appendChild(li);
            }

            empruntes.appendChild(unordredList);
        })
        .catch(e => {
            alert("Une erreur est survenue lors de la récupération des livres empruntés.");
            console.error(e);
        });
}

function rendreLeLivre(id) {
    if (confirm("Voulez-vous vraiment rendre ce livre ?")) {
        fetch("php/Controller/ControllerEmprunt.php?action=delete&idLivre=" + id)
            .then(() => {
                afficherEmpruntes();
                afficherDisponibles();
                afficherAdherents();
                alert("Le livre a été rendu.");
            })
            .catch(e => {
                alert("Une erreur est survenue lors de la restitution du livre.");
                console.error(e);
            });
    }
}
