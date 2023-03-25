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
                emprunts.innerHTML = element.nombreEmprunts === "0" ? "" : " (" + element.nombreEmprunts + " " + (element.nombreEmprunts > 1 ? "emprunts" : "emprunt") + book.outerHTML + ")";

                let intitule = document.createElement("div");

                intitule.innerHTML = element.idAdherent + " — " + element.nomAdherent + " " + emprunts.innerHTML;

                let actions = document.createElement("div");
                let supprimer = document.createElement("img");
                supprimer.src = "img/x.svg";
                supprimer.addEventListener("click", () => {
                    supprimerAdherent(element.idAdherent);
                });

                actions.appendChild(supprimer);

                li.appendChild(intitule);
                li.appendChild(actions);

                unordredList.appendChild(li);
            }
            adherents.appendChild(unordredList);
        })
        .catch((error) => {
            alert("Erreur lors de l'affichage des adhérents")
            console.error(error)
        });
}

function supprimerAdherent(id) {
    if (confirm("Voulez-vous vraiment supprimer cet adhérent ?")) {
        fetch("php/Controller/ControllerAdherent.php?action=delete&id=" + id)
            .then(() => {
                afficherAdherents();
                afficherEmpruntes();
                afficherDisponibles();
                alert("Adhérent supprimé");
            })
            .catch((error) => {
                alert("Erreur lors de la suppression de l'adhérent")
                console.error(error)
            });
    }
}

document.getElementById("ajouterAdherent").addEventListener("click", () => {
    let nom = document.getElementById("nomAdherent").value;
    fetch("php/Controller/ControllerAdherent.php?action=create&nom=" + nom)
        .then(() => {
            afficherAdherents();
        })
        .catch((error) => {
            alert("Erreur lors de l'ajout de l'adhérent")
            console.error(error)
        });
});

