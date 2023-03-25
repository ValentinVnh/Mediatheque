<?php

require_once "Model.php";
require_once "ModelLivre.php";
require_once "ModelEmprunt.php";

class ModelAdherent extends Model
{
    static $object = "adherent";
    static $primary = "idAdherent";

    static function selectAll()
    {
        try {
            $pdo = self::$pdo;
            $class_name = 'ModelAdherent';
            $sql = "SELECT * from empruntsParAdherent";
            $rep = $pdo->query($sql);
            $rep->setFetchMode(PDO::FETCH_CLASS, $class_name);
            return $rep->fetchAll();
        } catch (PDOException $e) {
            echo $e->getMessage(); // affiche un message d'erreur
            die();
        }
    }

}