async function afficherCouvertureLivre(titreLivre, container) {
    if (container.src === "") {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${titreLivre}&key=AIzaSyD1C6j36zLSTv7fZqzHBx15RHBIQ0Ad2eQ`)
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: data.items[0].volumeInfo.title,
                    text: data.items[0].volumeInfo.authors[0],
                    imageUrl: data.items[0].volumeInfo.imageLinks.thumbnail,
                    imageWidth: 200,
                    confirmButtonText: 'Ok'
                })
            });
    }

}

