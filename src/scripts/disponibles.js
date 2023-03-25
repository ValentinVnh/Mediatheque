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

                    let couverture = document.createElement("img");
                    couverture.src = "img/image.svg";

                    let supprimer = document.createElement("img");
                    supprimer.src = "img/x.svg";
                    supprimer.addEventListener("click", () => {
                        supprimerLeLivre(element.idLivre);
                    });

                    actions.appendChild(couverture);
                    actions.appendChild(supprimer);

                    li.appendChild(intitule);
                    li.appendChild(actions);

                    unordredList.appendChild(li);
                }
                disponibles.appendChild(unordredList);
            });
    } catch (e) {
        alert("Erreur lors de l'affichage des livres disponibles")
        console.error(e);
    }
}

document.getElementById("ajouterLivre").addEventListener("click", () => {
    fetch("php/Controller/ControllerLivre.php?action=create&titre=" + document.getElementById("titreLivre").value)
        .then(() => {
            afficherEmpruntes();
            afficherDisponibles();
            afficherAdherents();
            document.getElementById("titreLivre").value = "";
        })
        .catch(e => {
            alert("Erreur lors de l'ajout du livre")
            console.error(e)
        });
});

function emprunterLeLivre(id, titre) {
    let reponse = prompt("Veuillez entrer le nom de l'adhérent qui emprunte le livre \"" + titre + "\" .");
    if (reponse != null) {
        fetch("php/Controller/ControllerEmprunt.php?action=create&idLivre=" + id + "&idAdherent=" + reponse)
            .then((data) => data.json())
            .then((data) => {
                if (data.status === "success") {
                    afficherDisponibles();
                    afficherEmpruntes();
                    alert("Le livre a été emprunté.");
                }
            })
            .catch(e => {
                alert("Une erreur est survenue lors de l'emprunt du livre.");
                console.error(e);
            });
    }
}

function supprimerLeLivre(id) {
    if (confirm("Voulez-vous vraiment supprimer ce livre ?")) {
        fetch("php/Controller/ControllerLivre.php?action=delete&id=" + id)
            .then(() => {
                afficherDisponibles();
                alert("Le livre a été supprimé.");
            })
            .catch(e => {
                alert("Une erreur est survenue lors de la suppression du livre.");
                console.error(e);
            });
    } else {
        alert("Le livre n'a pas été supprimé.");
    }
}