afficherAdherents();

function afficherAdherents() {
    fetch("php/Controller/ControllerAdherent.php?action=readAll")
        .then(response => response.json())
        .then(data => {
            let adherents = document.getElementById("listeAdherents");
            adherents.innerHTML = "";
            let unordredList = document.createElement("ul");
            for (let element of data) {
                let li = document.createElement("li");

                let emprunts = document.createElement("div");
                let book = document.createElement("img");
                book.src = "img/book.ico";
                book.alt = "emprunts";
                book.classList.add("livre-emprunt");
                emprunts.innerHTML = element.nombreEmprunts === 0 ? "" : " (" + element.nombreEmprunts + " " + (element.nombreEmprunts > 1 ? "emprunts" : "emprunt") + book.outerHTML + ")";

                let intitule = document.createElement("div");
                intitule.innerHTML = element.idAdherent + " — " + element.nomAdherent + " " + emprunts.innerHTML;
                intitule.addEventListener("click", () => {
                    afficherEmpruntsAdherent(element.idAdherent, element.nomAdherent);
                });

                let actions = document.createElement("div");
                let supprimer = document.createElement("img");
                supprimer.src = "img/x.svg";
                supprimer.addEventListener("click", () => {
                    supprimerAdherent(element.idAdherent, element.nomAdherent);
                });

                actions.appendChild(supprimer);

                li.appendChild(intitule);
                li.appendChild(actions);

                unordredList.appendChild(li);
            }
            adherents.appendChild(unordredList);
        })
        .catch((error) => {
            Swal.fire({
                title: "Erreur",
                text: "Une erreur est survenue lors de la récupération des adhérents.",
            });
            console.error(error)
        });
}

async function supprimerAdherent(id) {
    const {value: validation} = await Swal.fire({
        title: "Supprimer l'adhérent",
        text: "Êtes-vous sûr de vouloir supprimer cet adhérent ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Supprimer",
        cancelButtonText: "Annuler",
    });

    if (validation) {
        fetch("php/Controller/ControllerAdherent.php?action=delete&id=" + id)
            .then(() => {
                afficherAdherents();
                afficherEmpruntes();
                afficherDisponibles();
                Swal.fire({
                    title: "Adhérent supprimé",
                    text: "L'adhérent a bien été supprimé.",
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Erreur",
                    text: "Une erreur est survenue lors de la suppression de l'adhérent.",
                });
                console.error(error)
            });
    }
}

document.getElementById("ajouterAdherent").addEventListener("click", () => {
    fetch("php/Controller/ControllerAdherent.php?action=create", {
        method: "POST",
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        }, body: `nom=${document.getElementById('nomAdherent').value}`
    })
        .then(() => {
            afficherAdherents();
        })
        .catch((error) => {
            Swal.fire({
                title: "Erreur",
                text: "Une erreur est survenue lors de l'ajout de l'adhérent.",
            });
            console.error(error)
        });
});

function afficherEmpruntsAdherent(id, nom) {
    fetch("php/Controller/ControllerEmprunt.php?action=readAllFromAdherent&idAdherent=" + id)
        .then(response => response.json())
        .then(data => {
            let emprunts = "";
            for (let element of data) {
                emprunts += "• " + element.idLivre + " (" + element.titreLivre + ")<br>";
            }
            Swal.fire({
                title: "Emprunts de " + nom,
                html: emprunts,
                icon: "info",
                confirmButtonText: "Fermer"
            });
        })
        .catch((error) => {
            Swal.fire({
                title: "Erreur",
                text: "Une erreur est survenue lors de l'affichage des emprunts de l'adhérent.",
            });
            console.error(error);
        });
}

