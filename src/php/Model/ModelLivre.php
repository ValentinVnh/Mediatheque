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
            $sql = "SELECT * from livresDisponibles";
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
            $sql = "SELECT * from empruntsNommes";
            $rep = $pdo->query($sql);
            $rep->setFetchMode(PDO::FETCH_CLASS, $class_name);
            return $rep->fetchAll();
        } catch (PDOException $e) {
            echo $e->getMessage(); // affiche un message d'erreur
            die();
        }
    }
}