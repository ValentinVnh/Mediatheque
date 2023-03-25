<?php

require_once "Model.php";

class ModelEmprunt extends Model
{
    static $object = "emprunt";
    static $primary = "idLivre";

    static function selectAllFromAdherent($idAdherent)
    {
        try {
            $pdo = self::$pdo;
            $class_name = 'ModelEmprunt';
            $sql = "SELECT * from empruntsNommes WHERE idAdherent = :idAdherent";
            $req_prep = $pdo->prepare($sql);
            $values = array(
                "idAdherent" => $idAdherent
            );
            $req_prep->execute($values);
            $req_prep->setFetchMode(PDO::FETCH_CLASS, $class_name);
            return $req_prep->fetchAll();
        } catch (PDOException $e) {
            echo $e->getMessage(); // affiche un message d'erreur
            die();
        }
    }

}