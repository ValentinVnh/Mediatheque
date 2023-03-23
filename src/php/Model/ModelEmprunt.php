<?php

require_once "Model.php";

class ModelEmprunt extends Model
{
    static $object = "emprunt";
    static $primary = "idLivre";

    /**
     * Récupère le nombre d'emprunts d'un adhérent
     * @param $idAdherent
     */
    public static function selectNombreEmprunts($idAdherent)
    {
        try {
            $pdo = self::$pdo;
            $sql = "SELECT COUNT(*) FROM emprunt WHERE idAdherent = :idAdherent";
            $req_prep = $pdo->prepare($sql);
            $values = array(
                "idAdherent" => $idAdherent
            );
            $req_prep->execute($values);
            $rep = $req_prep->fetchAll();
            return $rep[0][0];
        } catch (PDOException $e) {
            echo $e->getMessage(); // affiche un message d'erreur
            die();
        }
    }
}