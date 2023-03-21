CREATE OR REPLACE VIEW livresNonEmpruntes(idLivre, titreLivre) AS
SELECT idLivre, titreLivre
FROM livre
WHERE idLivre NOT IN (
    SELECT idLivre
    FROM emprunt
);