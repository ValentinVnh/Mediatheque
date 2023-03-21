<?php

require_once "Model.php";
require_once "ModelAdherent.php";
require_once "ModelEmprunt.php";

class ModelLivre extends Model
{
    static $object = "livre";
    static $primary = "idLivre";

    public static function selectDisponibles()
    {
        try {
            $pdo = self::$pdo;
            $class_name = 'ModelLivre';
            $sql = "SELECT * from livresNonEmpruntes";
            $rep = $pdo->query($sql);
            $rep->setFetchMode(PDO::FETCH_CLASS, $class_name);
            return $rep->fetchAll();
        } catch (PDOException $e) {
            echo $e->getMessage(); // affiche un message d'erreur
            die();
        }
    }

    public static function selectEmpruntes()
    {
        try {
            $pdo = self::$pdo;
            $class_name = 'ModelLivre';
            $sql = "SELECT e.idLivre, titreLivre, idAdherent from emprunt e JOIN livre l ON l.idLivre = e.idLivre";
            $rep = $pdo->query($sql);
            $rep->setFetchMode(PDO::FETCH_CLASS, $class_name);
            return $rep->fetchAll();
        } catch (PDOException $e) {
            echo $e->getMessage(); // affiche un message d'erreur
            die();
        }
    }
}