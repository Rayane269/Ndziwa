-- Active: 1653638171704@@127.0.0.1@3306@chambre_hotel
-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 24 août 2022 à 23:15
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ndziwa`
--

-- --------------------------------------------------------

--
-- Structure de la table `comptes`
--

CREATE TABLE IF NOT EXISTS `comptes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `numero_compte` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `bourse` double(11,2) NOT NULL DEFAULT 0.00,
  `activated` tinyint(1) NOT NULL DEFAULT 0,
  `activated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `comptes`
--

INSERT INTO `comptes` (`id`, `numero_compte`, `user_id`, `bourse`, `activated`, `activated_at`, `type`, `created_at`, `updated_at`) VALUES
(1, NULL, 1, 0.00, 0, NULL, NULL, '2022-08-24 17:11:08', '2022-08-24 17:11:08'),
(2, NULL, 2, 0.00, 0, NULL, NULL, '2022-08-24 17:11:57', '2022-08-24 17:11:57'),
(3, NULL, 3, 0.00, 0, NULL, NULL, '2022-08-24 17:12:45', '2022-08-24 17:12:45'),
(4, NULL, 4, 0.00, 0, NULL, NULL, '2022-08-24 17:13:39', '2022-08-24 17:13:39'),
(5, NULL, 5, 0.00, 0, NULL, NULL, '2022-08-24 17:14:32', '2022-08-24 17:14:32'),
(6, NULL, 6, 0.00, 0, NULL, NULL, '2022-08-24 17:15:15', '2022-08-24 17:15:15'),
(7, NULL, 7, 0.00, 0, NULL, NULL, '2022-08-24 17:16:34', '2022-08-24 17:16:34'),
(8, NULL, 8, 0.00, 0, NULL, NULL, '2022-08-24 17:17:34', '2022-08-24 17:17:34'),
(9, NULL, 9, 0.00, 0, NULL, NULL, '2022-08-24 17:18:55', '2022-08-24 17:18:55');

-- --------------------------------------------------------

--
-- Structure de la table `etats`
--

CREATE TABLE IF NOT EXISTS `etats` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `etats`
--

INSERT INTO `etats` (`id`, `nom`, `created_at`, `updated_at`) VALUES
(1, 'waiting', NULL, NULL),
(2, 'progressing', NULL, NULL),
(3, 'finished', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `frequences`
--

CREATE TABLE IF NOT EXISTS `frequences` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `libelle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `frequences`
--

INSERT INTO `frequences` (`id`, `libelle`, `created_at`, `updated_at`) VALUES
(1, 'journalière', NULL, NULL),
(2, 'hebdomadaire', NULL, NULL),
(3, 'mensuelle', NULL, NULL),
(4, 'annuelle', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `objectif` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_admin` bigint(20) UNSIGNED NOT NULL,
  `date_debut_souhaite` DATE NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `frequence_id` bigint(20) UNSIGNED NOT NULL,
  `montant_id` bigint(20) UNSIGNED NOT NULL,
  `etat_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `group_user`
--

CREATE TABLE IF NOT EXISTS `group_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `group_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `date_collecte` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `rang` int(11) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--


-- --------------------------------------------------------

--
-- Structure de la table `montants`
--

CREATE TABLE IF NOT EXISTS `montants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `prix` double(8,2) NOT NULL,
  `tarif` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `montants`
--

INSERT INTO `montants` (`id`, `prix`, `tarif`, `created_at`, `updated_at`) VALUES
(1, 25000.00, 500.00, NULL, NULL),
(2, 50000.00, 1000.00, NULL, NULL),
(3, 150000.00, 2500.00, NULL, NULL),
(4, 250000.00, 5000.00, NULL, NULL),
(5, 999999.99, 15000.00, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `operations`
--

CREATE TABLE IF NOT EXISTS `operations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `compte_id` bigint(20) UNSIGNED NOT NULL,
  `emetteur` bigint(20) UNSIGNED DEFAULT NULL,
  `beneficiaire` bigint(20) UNSIGNED DEFAULT NULL,
  `agent` bigint(20) UNSIGNED DEFAULT NULL,
  `somme` double(11,2) NOT NULL,
  `libelle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type_operation` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `regions`
--

CREATE TABLE IF NOT EXISTS `regions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code_appel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `devise` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USD',
  `flag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timezone` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT json_array() COMMENT 'DC2Type:json' CHECK (json_valid(`timezone`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `regions`
--

INSERT INTO `regions` (`id`, `nom`, `code`, `code_appel`, `devise`, `flag`, `timezone`, `created_at`, `updated_at`) VALUES
(1, 'Kuwait', 'kw', '+965', 'KWD', 'https://flagcdn.com/w320/kw.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(2, 'Palau', 'pw', '+680', 'USD', 'https://flagcdn.com/w320/pw.png', '[\"UTC+09:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(3, 'Liechtenstein', 'li', '+423', 'CHF', 'https://flagcdn.com/w320/li.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(4, 'Moldova', 'md', '+373', 'MDL', 'https://flagcdn.com/w320/md.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(5, 'Angola', 'ao', '+244', 'AOA', 'https://flagcdn.com/w320/ao.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(6, 'Bolivia', 'bo', '+591', 'BOB', 'https://flagcdn.com/w320/bo.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(7, 'Tuvalu', 'tv', '+688', 'AUD', 'https://flagcdn.com/w320/tv.png', '[\"UTC+12:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(8, 'Peru', 'pe', '+51', 'PEN', 'https://flagcdn.com/w320/pe.png', '[\"UTC-05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(9, 'New Caledonia', 'nc', '+687', 'XPF', 'https://flagcdn.com/w320/nc.png', '[\"UTC+11:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(10, 'Germany', 'de', '+49', 'EUR', 'https://flagcdn.com/w320/de.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(11, 'Botswana', 'bw', '+267', 'BWP', 'https://flagcdn.com/w320/bw.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(12, 'Afghanistan', 'af', '+93', 'AFN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png', '[\"UTC+04:30\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(13, 'Hungary', 'hu', '+36', 'HUF', 'https://flagcdn.com/w320/hu.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(14, 'Burkina Faso', 'bf', '+226', 'XOF', 'https://flagcdn.com/w320/bf.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(15, 'Canada', 'ca', '+1', 'CAD', 'https://flagcdn.com/w320/ca.png', '[\"UTC-08:00\",\"UTC-07:00\",\"UTC-06:00\",\"UTC-05:00\",\"UTC-04:00\",\"UTC-03:30\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(16, 'Saint Barthélemy', 'bl', '+590', 'EUR', 'https://flagcdn.com/w320/bl.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(17, 'Indonesia', 'id', '+62', 'IDR', 'https://flagcdn.com/w320/id.png', '[\"UTC+07:00\",\"UTC+08:00\",\"UTC+09:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(18, 'Taiwan', 'tw', '+886', 'TWD', 'https://flagcdn.com/w320/tw.png', '[\"UTC+08:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(19, 'Saint Lucia', 'lc', '+1758', 'XCD', 'https://flagcdn.com/w320/lc.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(20, 'Aruba', 'aw', '+297', 'AWG', 'https://flagcdn.com/w320/aw.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(21, 'Gabon', 'ga', '+241', 'XAF', 'https://flagcdn.com/w320/ga.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(22, 'South Georgia', 'gs', '+500', 'SHP', 'https://flagcdn.com/w320/gs.png', '[\"UTC-02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(23, 'Liberia', 'lr', '+231', 'LRD', 'https://flagcdn.com/w320/lr.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(24, 'Turks and Caicos Islands', 'tc', '+1649', 'USD', 'https://flagcdn.com/w320/tc.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(25, 'Western Sahara', 'eh', '+2125288', 'DZD', 'https://flagcdn.com/w320/eh.png', '[\"UTC+00:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(26, 'Turkey', 'tr', '+90', 'TRY', 'https://flagcdn.com/w320/tr.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(27, 'Mali', 'ml', '+223', 'XOF', 'https://flagcdn.com/w320/ml.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(28, 'Benin', 'bj', '+229', 'XOF', 'https://flagcdn.com/w320/bj.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(29, 'Cyprus', 'cy', '+357', 'EUR', 'https://flagcdn.com/w320/cy.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(30, 'Somalia', 'so', '+252', 'SOS', 'https://flagcdn.com/w320/so.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(31, 'Niger', 'ne', '+227', 'XOF', 'https://flagcdn.com/w320/ne.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(32, 'Faroe Islands', 'fo', '+298', 'DKK', 'https://flagcdn.com/w320/fo.png', '[\"UTC+00:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(33, 'Portugal', 'pt', '+351', 'EUR', 'https://flagcdn.com/w320/pt.png', '[\"UTC-01:00\",\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(34, 'Senegal', 'sn', '+221', 'XOF', 'https://flagcdn.com/w320/sn.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(35, 'Cuba', 'cu', '+53', 'CUC', 'https://flagcdn.com/w320/cu.png', '[\"UTC-05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(36, 'Belarus', 'by', '+375', 'BYN', 'https://flagcdn.com/w320/by.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(37, 'Barbados', 'bb', '+1246', 'BBD', 'https://flagcdn.com/w320/bb.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(38, 'Tunisia', 'tn', '+216', 'TND', 'https://flagcdn.com/w320/tn.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(39, 'Israel', 'il', '+972', 'ILS', 'https://flagcdn.com/w320/il.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(40, 'Italy', 'it', '+39', 'EUR', 'https://flagcdn.com/w320/it.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(41, 'Myanmar', 'mm', '+95', 'MMK', 'https://flagcdn.com/w320/mm.png', '[\"UTC+06:30\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(42, 'Antarctica', 'aq', NULL, 'USD', 'https://flagcdn.com/w320/aq.png', '[\"UTC-03:00\",\"UTC+03:00\",\"UTC+05:00\",\"UTC+06:00\",\"UTC+07:00\",\"UTC+08:00\",\"UTC+10:00\",\"UTC+12:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(43, 'Micronesia', 'fm', '+691', 'USD', 'https://flagcdn.com/w320/fm.png', '[\"UTC+10:00\",\"UTC+11:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(44, 'Wallis and Futuna', 'wf', '+681', 'XPF', 'https://flagcdn.com/w320/wf.png', '[\"UTC+12:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(45, 'Djibouti', 'dj', '+253', 'DJF', 'https://flagcdn.com/w320/dj.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(46, 'Republic of the Congo', 'cg', '+242', 'XAF', 'https://flagcdn.com/w320/cg.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(47, 'Gibraltar', 'gi', '+350', 'GIP', 'https://flagcdn.com/w320/gi.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(48, 'DR Congo', 'cd', '+243', 'CDF', 'https://flagcdn.com/w320/cd.png', '[\"UTC+01:00\",\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(49, 'Belize', 'bz', '+501', 'BZD', 'https://flagcdn.com/w320/bz.png', '[\"UTC-06:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(50, 'Bermuda', 'bm', '+1441', 'BMD', 'https://flagcdn.com/w320/bm.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(51, 'Australia', 'au', '+61', 'AUD', 'https://flagcdn.com/w320/au.png', '[\"UTC+05:00\",\"UTC+06:30\",\"UTC+07:00\",\"UTC+08:00\",\"UTC+09:30\",\"UTC+10:00\",\"UTC+10:30\",\"UTC+11:30\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(52, 'Saint Helena, Ascension and Tristan da Cunha', 'sh', '+290', 'GBP', 'https://flagcdn.com/w320/sh.png', '[\"UTC+00:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(53, 'Cameroon', 'cm', '+237', 'XAF', 'https://flagcdn.com/w320/cm.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(54, 'Russia', 'ru', '+73', 'RUB', 'https://flagcdn.com/w320/ru.png', '[\"UTC+03:00\",\"UTC+04:00\",\"UTC+06:00\",\"UTC+07:00\",\"UTC+08:00\",\"UTC+09:00\",\"UTC+10:00\",\"UTC+11:00\",\"UTC+12:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(55, 'Antigua and Barbuda', 'ag', '+1268', 'XCD', 'https://flagcdn.com/w320/ag.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(56, 'Japan', 'jp', '+81', 'JPY', 'https://flagcdn.com/w320/jp.png', '[\"UTC+09:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(57, 'Cayman Islands', 'ky', '+1345', 'KYD', 'https://flagcdn.com/w320/ky.png', '[\"UTC-05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(58, 'Caribbean Netherlands', 'bq', '+599', 'USD', 'https://flagcdn.com/w320/bq.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(59, 'Honduras', 'hn', '+504', 'HNL', 'https://flagcdn.com/w320/hn.png', '[\"UTC-06:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(60, 'Heard Island and McDonald Islands', 'hm', NULL, 'USD', 'https://flagcdn.com/w320/hm.png', '[\"UTC+05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(61, 'Burundi', 'bi', '+257', 'BIF', 'https://flagcdn.com/w320/bi.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(62, 'Paraguay', 'py', '+595', 'PYG', 'https://flagcdn.com/w320/py.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(63, 'Argentina', 'ar', '+54', 'ARS', 'https://flagcdn.com/w320/ar.png', '[\"UTC-03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(64, 'French Polynesia', 'pf', '+689', 'XPF', 'https://flagcdn.com/w320/pf.png', '[\"UTC-10:00\",\"UTC-09:30\",\"UTC-09:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(65, 'São Tomé and Príncipe', 'st', '+239', 'STN', 'https://flagcdn.com/w320/st.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(66, 'Lesotho', 'ls', '+266', 'LSL', 'https://flagcdn.com/w320/ls.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(67, 'Sudan', 'sd', '+249', 'SDG', 'https://flagcdn.com/w320/sd.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(68, 'El Salvador', 'sv', '+503', 'USD', 'https://flagcdn.com/w320/sv.png', '[\"UTC-06:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(69, 'Christmas Island', 'cx', '+61', 'AUD', 'https://flagcdn.com/w320/cx.png', '[\"UTC+07:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(70, 'Kyrgyzstan', 'kg', '+996', 'KGS', 'https://flagcdn.com/w320/kg.png', '[\"UTC+06:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(71, 'Brazil', 'br', '+55', 'BRL', 'https://flagcdn.com/w320/br.png', '[\"UTC-05:00\",\"UTC-04:00\",\"UTC-03:00\",\"UTC-02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(72, 'Cambodia', 'kh', '+855', 'KHR', 'https://flagcdn.com/w320/kh.png', '[\"UTC+07:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(73, 'Montserrat', 'ms', '+1664', 'XCD', 'https://flagcdn.com/w320/ms.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(74, 'South Africa', 'za', '+27', 'ZAR', 'https://flagcdn.com/w320/za.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(75, 'Guatemala', 'gt', '+502', 'GTQ', 'https://flagcdn.com/w320/gt.png', '[\"UTC-06:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(76, 'United States', 'us', '+1201', 'USD', 'https://flagcdn.com/w320/us.png', '[\"UTC-12:00\",\"UTC-11:00\",\"UTC-10:00\",\"UTC-09:00\",\"UTC-08:00\",\"UTC-07:00\",\"UTC-06:00\",\"UTC-05:00\",\"UTC-04:00\",\"UTC+10:00\",\"UTC+12:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(77, 'Azerbaijan', 'az', '+994', 'AZN', 'https://flagcdn.com/w320/az.png', '[\"UTC+04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(78, 'Malaysia', 'my', '+60', 'MYR', 'https://flagcdn.com/w320/my.png', '[\"UTC+08:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(79, 'Colombia', 'co', '+57', 'COP', 'https://flagcdn.com/w320/co.png', '[\"UTC-05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(80, 'Mauritania', 'mr', '+222', 'MRU', 'https://flagcdn.com/w320/mr.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(81, 'Bahrain', 'bh', '+973', 'BHD', 'https://flagcdn.com/w320/bh.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(82, 'Belgium', 'be', '+32', 'EUR', 'https://flagcdn.com/w320/be.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(83, 'Chile', 'cl', '+56', 'CLP', 'https://flagcdn.com/w320/cl.png', '[\"UTC-06:00\",\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(84, 'North Macedonia', 'mk', '+389', 'MKD', 'https://flagcdn.com/w320/mk.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(85, 'Mozambique', 'mz', '+258', 'MZN', 'https://flagcdn.com/w320/mz.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(86, 'Norfolk Island', 'nf', '+672', 'AUD', 'https://flagcdn.com/w320/nf.png', '[\"UTC+11:30\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(87, 'American Samoa', 'as', '+1684', 'USD', 'https://flagcdn.com/w320/as.png', '[\"UTC-11:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(88, 'Ethiopia', 'et', '+251', 'ETB', 'https://flagcdn.com/w320/et.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(89, 'Guadeloupe', 'gp', '+590', 'EUR', 'https://flagcdn.com/w320/gp.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(90, 'Guam', 'gu', '+1671', 'USD', 'https://flagcdn.com/w320/gu.png', '[\"UTC+10:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(91, 'India', 'in', '+91', 'INR', 'https://flagcdn.com/w320/in.png', '[\"UTC+05:30\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(92, 'Puerto Rico', 'pr', '+1787', 'USD', 'https://flagcdn.com/w320/pr.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(93, 'Spain', 'es', '+34', 'EUR', 'https://flagcdn.com/w320/es.png', '[\"UTC\",\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(94, 'Kazakhstan', 'kz', '+76', 'KZT', 'https://flagcdn.com/w320/kz.png', '[\"UTC+05:00\",\"UTC+06:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(95, 'Oman', 'om', '+968', 'OMR', 'https://flagcdn.com/w320/om.png', '[\"UTC+04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(96, 'United Arab Emirates', 'ae', '+971', 'AED', 'https://flagcdn.com/w320/ae.png', '[\"UTC+04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(97, 'Poland', 'pl', '+48', 'PLN', 'https://flagcdn.com/w320/pl.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(98, 'French Guiana', 'gf', '+594', 'EUR', 'https://flagcdn.com/w320/gf.png', '[\"UTC-03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(99, 'Grenada', 'gd', '+1473', 'XCD', 'https://flagcdn.com/w320/gd.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(100, 'Sri Lanka', 'lk', '+94', 'LKR', 'https://flagcdn.com/w320/lk.png', '[\"UTC+05:30\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(101, 'Tajikistan', 'tj', '+992', 'TJS', 'https://flagcdn.com/w320/tj.png', '[\"UTC+05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(102, 'Syria', 'sy', '+963', 'SYP', 'https://flagcdn.com/w320/sy.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(103, 'Libya', 'ly', '+218', 'LYD', 'https://flagcdn.com/w320/ly.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(104, 'Haiti', 'ht', '+509', 'HTG', 'https://flagcdn.com/w320/ht.png', '[\"UTC-05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(105, 'San Marino', 'sm', '+378', 'EUR', 'https://flagcdn.com/w320/sm.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(106, 'Tonga', 'to', '+676', 'TOP', 'https://flagcdn.com/w320/to.png', '[\"UTC+13:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(107, 'British Virgin Islands', 'vg', '+1284', 'USD', 'https://flagcdn.com/w320/vg.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(108, 'Georgia', 'ge', '+995', 'GEL', 'https://flagcdn.com/w320/ge.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(109, 'Eritrea', 'er', '+291', 'ERN', 'https://flagcdn.com/w320/er.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(110, 'Tanzania', 'tz', '+255', 'TZS', 'https://flagcdn.com/w320/tz.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(111, 'Czechia', 'cz', '+420', 'CZK', 'https://flagcdn.com/w320/cz.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(112, 'Kosovo', 'xk', '+383', 'EUR', 'https://flagcdn.com/w320/xk.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(113, 'Bhutan', 'bt', '+975', 'BTN', 'https://flagcdn.com/w320/bt.png', '[\"UTC+06:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(114, 'Egypt', 'eg', '+20', 'EGP', 'https://flagcdn.com/w320/eg.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(115, 'Saint Kitts and Nevis', 'kn', '+1869', 'XCD', 'https://flagcdn.com/w320/kn.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(116, 'Vietnam', 'vn', '+84', 'VND', 'https://flagcdn.com/w320/vn.png', '[\"UTC+07:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(117, 'Marshall Islands', 'mh', '+692', 'USD', 'https://flagcdn.com/w320/mh.png', '[\"UTC+12:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(118, 'Austria', 'at', '+43', 'EUR', 'https://flagcdn.com/w320/at.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(119, 'Papua New Guinea', 'pg', '+675', 'PGK', 'https://flagcdn.com/w320/pg.png', '[\"UTC+10:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(120, 'Bahamas', 'bs', '+1242', 'BSD', 'https://flagcdn.com/w320/bs.png', '[\"UTC-05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(121, 'Croatia', 'hr', '+385', 'HRK', 'https://flagcdn.com/w320/hr.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(122, 'Slovenia', 'si', '+386', 'EUR', 'https://flagcdn.com/w320/si.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(123, 'Uzbekistan', 'uz', '+998', 'UZS', 'https://flagcdn.com/w320/uz.png', '[\"UTC+05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(124, 'Finland', 'fi', '+358', 'EUR', 'https://flagcdn.com/w320/fi.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(125, 'Guyana', 'gy', '+592', 'GYD', 'https://flagcdn.com/w320/gy.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(126, 'Åland Islands', 'ax', '+35818', 'EUR', 'https://flagcdn.com/w320/ax.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(127, 'Monaco', 'mc', '+377', 'EUR', 'https://flagcdn.com/w320/mc.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(128, 'Slovakia', 'sk', '+421', 'EUR', 'https://flagcdn.com/w320/sk.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(129, 'Yemen', 'ye', '+967', 'YER', 'https://flagcdn.com/w320/ye.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(130, 'Malawi', 'mw', '+265', 'MWK', 'https://flagcdn.com/w320/mw.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(131, 'Gambia', 'gm', '+220', 'GMD', 'https://flagcdn.com/w320/gm.png', '[\"UTC+00:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(132, 'Panama', 'pa', '+507', 'PAB', 'https://flagcdn.com/w320/pa.png', '[\"UTC-05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(133, 'Isle of Man', 'im', '+44', 'GBP', 'https://flagcdn.com/w320/im.png', '[\"UTC+00:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(134, 'Ireland', 'ie', '+353', 'EUR', 'https://flagcdn.com/w320/ie.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(135, 'South Korea', 'kr', '+82', 'KRW', 'https://flagcdn.com/w320/kr.png', '[\"UTC+09:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(136, 'Greece', 'gr', '+30', 'EUR', 'https://flagcdn.com/w320/gr.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(137, 'Guernsey', 'gg', '+44', 'GBP', 'https://flagcdn.com/w320/gg.png', '[\"UTC+00:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(138, 'Pakistan', 'pk', '+92', 'PKR', 'https://flagcdn.com/w320/pk.png', '[\"UTC+05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(139, 'Pitcairn Islands', 'pn', '+64', 'NZD', 'https://flagcdn.com/w320/pn.png', '[\"UTC-08:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(140, 'Armenia', 'am', '+374', 'AMD', 'https://flagcdn.com/w320/am.png', '[\"UTC+04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(141, 'Malta', 'mt', '+356', 'EUR', 'https://flagcdn.com/w320/mt.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(142, 'Turkmenistan', 'tm', '+993', 'TMT', 'https://flagcdn.com/w320/tm.png', '[\"UTC+05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(143, 'Dominican Republic', 'do', '+1809', 'DOP', 'https://flagcdn.com/w320/do.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(144, 'Solomon Islands', 'sb', '+677', 'SBD', 'https://flagcdn.com/w320/sb.png', '[\"UTC+11:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(145, 'Vanuatu', 'vu', '+678', 'VUV', 'https://flagcdn.com/w320/vu.png', '[\"UTC+11:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(146, 'Madagascar', 'mg', '+261', 'MGA', 'https://flagcdn.com/w320/mg.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(147, 'Laos', 'la', '+856', 'LAK', 'https://flagcdn.com/w320/la.png', '[\"UTC+07:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(148, 'Cook Islands', 'ck', '+682', 'CKD', 'https://flagcdn.com/w320/ck.png', '[\"UTC-10:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(149, 'Saint Martin', 'mf', '+590', 'EUR', 'https://flagcdn.com/w320/mf.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(150, 'Mongolia', 'mn', '+976', 'MNT', 'https://flagcdn.com/w320/mn.png', '[\"UTC+07:00\",\"UTC+08:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(151, 'Martinique', 'mq', '+596', 'EUR', 'https://flagcdn.com/w320/mq.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(152, 'France', 'fr', '+33', 'EUR', 'https://flagcdn.com/w320/fr.png', '[\"UTC-10:00\",\"UTC-09:30\",\"UTC-09:00\",\"UTC-08:00\",\"UTC-04:00\",\"UTC-03:00\",\"UTC+01:00\",\"UTC+02:00\",\"UTC+03:00\",\"UTC+04:00\",\"UTC+05:00\",\"UTC+10:00\",\"UTC+11:00\",\"UTC+12:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(153, 'Central African Republic', 'cf', '+236', 'XAF', 'https://flagcdn.com/w320/cf.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(154, 'Anguilla', 'ai', '+1264', 'XCD', 'https://flagcdn.com/w320/ai.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(155, 'Eswatini', 'sz', '+268', 'SZL', 'https://flagcdn.com/w320/sz.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(156, 'United Kingdom', 'gb', '+44', 'GBP', 'https://flagcdn.com/w320/gb.png', '[\"UTC-08:00\",\"UTC-05:00\",\"UTC-04:00\",\"UTC-03:00\",\"UTC-02:00\",\"UTC\",\"UTC+01:00\",\"UTC+02:00\",\"UTC+06:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(157, 'Iceland', 'is', '+354', 'ISK', 'https://flagcdn.com/w320/is.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(158, 'Nepal', 'np', '+977', 'NPR', 'https://flagcdn.com/w320/np.png', '[\"UTC+05:45\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(159, 'Ghana', 'gh', '+233', 'GHS', 'https://flagcdn.com/w320/gh.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(160, 'Iraq', 'iq', '+964', 'IQD', 'https://flagcdn.com/w320/iq.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(161, 'Thailand', 'th', '+66', 'THB', 'https://flagcdn.com/w320/th.png', '[\"UTC+07:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(162, 'Denmark', 'dk', '+45', 'DKK', 'https://flagcdn.com/w320/dk.png', '[\"UTC-04:00\",\"UTC-03:00\",\"UTC-01:00\",\"UTC\",\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(163, 'Serbia', 'rs', '+381', 'RSD', 'https://flagcdn.com/w320/rs.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(164, 'Uganda', 'ug', '+256', 'UGX', 'https://flagcdn.com/w320/ug.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(165, 'Cocos (Keeling) Islands', 'cc', '+61', 'AUD', 'https://flagcdn.com/w320/cc.png', '[\"UTC+06:30\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(166, 'Montenegro', 'me', '+382', 'EUR', 'https://flagcdn.com/w320/me.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(167, 'Saudi Arabia', 'sa', '+966', 'SAR', 'https://flagcdn.com/w320/sa.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(168, 'Jordan', 'jo', '+962', 'JOD', 'https://flagcdn.com/w320/jo.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(169, 'Suriname', 'sr', '+597', 'SRD', 'https://flagcdn.com/w320/sr.png', '[\"UTC-03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(170, 'New Zealand', 'nz', '+64', 'NZD', 'https://flagcdn.com/w320/nz.png', '[\"UTC-11:00\",\"UTC-10:00\",\"UTC+12:00\",\"UTC+12:45\",\"UTC+13:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(171, 'Kenya', 'ke', '+254', 'KES', 'https://flagcdn.com/w320/ke.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(172, 'Mexico', 'mx', '+52', 'MXN', 'https://flagcdn.com/w320/mx.png', '[\"UTC-08:00\",\"UTC-07:00\",\"UTC-06:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(173, 'Bosnia and Herzegovina', 'ba', '+387', 'BAM', 'https://flagcdn.com/w320/ba.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(174, 'Saint Vincent and the Grenadines', 'vc', '+1784', 'XCD', 'https://flagcdn.com/w320/vc.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(175, 'Seychelles', 'sc', '+248', 'SCR', 'https://flagcdn.com/w320/sc.png', '[\"UTC+04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(176, 'Saint Pierre and Miquelon', 'pm', '+508', 'EUR', 'https://flagcdn.com/w320/pm.png', '[\"UTC-03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(177, 'Tokelau', 'tk', '+690', 'NZD', 'https://flagcdn.com/w320/tk.png', '[\"UTC+13:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(178, 'Bulgaria', 'bg', '+359', 'BGN', 'https://flagcdn.com/w320/bg.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(179, 'Falkland Islands', 'fk', '+500', 'FKP', 'https://flagcdn.com/w320/fk.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(180, 'Latvia', 'lv', '+371', 'EUR', 'https://flagcdn.com/w320/lv.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(181, 'Réunion', 're', '+262', 'EUR', 'https://flagcdn.com/w320/re.png', '[\"UTC+04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(182, 'Guinea', 'gn', '+224', 'GNF', 'https://flagcdn.com/w320/gn.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(183, 'Lebanon', 'lb', '+961', 'LBP', 'https://flagcdn.com/w320/lb.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(184, 'Luxembourg', 'lu', '+352', 'EUR', 'https://flagcdn.com/w320/lu.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(185, 'Mauritius', 'mu', '+230', 'MUR', 'https://flagcdn.com/w320/mu.png', '[\"UTC+04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(186, 'Estonia', 'ee', '+372', 'EUR', 'https://flagcdn.com/w320/ee.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(187, 'Norway', 'no', '+47', 'NOK', 'https://flagcdn.com/w320/no.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(188, 'Comoros', 'km', '+269', 'KMF', 'https://flagcdn.com/w320/km.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(189, 'Venezuela', 've', '+58', 'VES', 'https://flagcdn.com/w320/ve.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(190, 'Iran', 'ir', '+98', 'IRR', 'https://flagcdn.com/w320/ir.png', '[\"UTC+03:30\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(191, 'Sweden', 'se', '+46', 'SEK', 'https://flagcdn.com/w320/se.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(192, 'Fiji', 'fj', '+679', 'FJD', 'https://flagcdn.com/w320/fj.png', '[\"UTC+12:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(193, 'Philippines', 'ph', '+63', 'PHP', 'https://flagcdn.com/w320/ph.png', '[\"UTC+08:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(194, 'Hong Kong', 'hk', '+852', 'HKD', 'https://flagcdn.com/w320/hk.png', '[\"UTC+08:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(195, 'Uruguay', 'uy', '+598', 'UYU', 'https://flagcdn.com/w320/uy.png', '[\"UTC-03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(196, 'Macau', 'mo', '+853', 'MOP', 'https://flagcdn.com/w320/mo.png', '[\"UTC+08:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(197, 'Switzerland', 'ch', '+41', 'CHF', 'https://flagcdn.com/w320/ch.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(198, 'Trinidad and Tobago', 'tt', '+1868', 'TTD', 'https://flagcdn.com/w320/tt.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(199, 'Rwanda', 'rw', '+250', 'RWF', 'https://flagcdn.com/w320/rw.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(200, 'Albania', 'al', '+355', 'ALL', 'https://flagcdn.com/w320/al.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(201, 'Guinea-Bissau', 'gw', '+245', 'XOF', 'https://flagcdn.com/w320/gw.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(202, 'Ivory Coast', 'ci', '+225', 'XOF', 'https://flagcdn.com/w320/ci.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(203, 'North Korea', 'kp', '+850', 'KPW', 'https://flagcdn.com/w320/kp.png', '[\"UTC+09:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(204, 'Bouvet Island', 'bv', '+47', 'USD', 'https://flagcdn.com/w320/bv.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(205, 'Andorra', 'ad', '+376', 'EUR', 'https://flagcdn.com/w320/ad.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(206, 'Maldives', 'mv', '+960', 'MVR', 'https://flagcdn.com/w320/mv.png', '[\"UTC+05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(207, 'Nauru', 'nr', '+674', 'AUD', 'https://flagcdn.com/w320/nr.png', '[\"UTC+12:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(208, 'Singapore', 'sg', '+65', 'SGD', 'https://flagcdn.com/w320/sg.png', '[\"UTC+08:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(209, 'Zimbabwe', 'zw', '+263', 'ZWL', 'https://flagcdn.com/w320/zw.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(210, 'United States Virgin Islands', 'vi', '+1340', 'USD', 'https://flagcdn.com/w320/vi.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(211, 'Dominica', 'dm', '+1767', 'XCD', 'https://flagcdn.com/w320/dm.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(212, 'Morocco', 'ma', '+212', 'MAD', 'https://flagcdn.com/w320/ma.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(213, 'Mayotte', 'yt', '+262', 'EUR', 'https://flagcdn.com/w320/yt.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(214, 'Qatar', 'qa', '+974', 'QAR', 'https://flagcdn.com/w320/qa.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(215, 'Sint Maarten', 'sx', '+1721', 'ANG', 'https://flagcdn.com/w320/sx.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(216, 'Costa Rica', 'cr', '+506', 'CRC', 'https://flagcdn.com/w320/cr.png', '[\"UTC-06:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(217, 'Niue', 'nu', '+683', 'NZD', 'https://flagcdn.com/w320/nu.png', '[\"UTC-11:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(218, 'Curaçao', 'cw', '+599', 'ANG', 'https://flagcdn.com/w320/cw.png', '[\"UTC-04:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(219, 'Cape Verde', 'cv', '+238', 'CVE', 'https://flagcdn.com/w320/cv.png', '[\"UTC-01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(220, 'Netherlands', 'nl', '+31', 'EUR', 'https://flagcdn.com/w320/nl.png', '[\"UTC-04:00\",\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(221, 'Romania', 'ro', '+40', 'RON', 'https://flagcdn.com/w320/ro.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(222, 'Sierra Leone', 'sl', '+232', 'SLL', 'https://flagcdn.com/w320/sl.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(223, 'Nicaragua', 'ni', '+505', 'NIO', 'https://flagcdn.com/w320/ni.png', '[\"UTC-06:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(224, 'Algeria', 'dz', '+213', 'DZD', 'https://flagcdn.com/w320/dz.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(225, 'Jamaica', 'jm', '+1876', 'JMD', 'https://flagcdn.com/w320/jm.png', '[\"UTC-05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(226, 'Togo', 'tg', '+228', 'XOF', 'https://flagcdn.com/w320/tg.png', '[\"UTC\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(227, 'Vatican City', 'va', '+3906698', 'EUR', 'https://flagcdn.com/w320/va.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(228, 'Jersey', 'je', '+44', 'GBP', 'https://flagcdn.com/w320/je.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(229, 'Ecuador', 'ec', '+593', 'USD', 'https://flagcdn.com/w320/ec.png', '[\"UTC-06:00\",\"UTC-05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(230, 'Samoa', 'ws', '+685', 'WST', 'https://flagcdn.com/w320/ws.png', '[\"UTC+13:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(231, 'British Indian Ocean Territory', 'io', '+246', 'USD', 'https://flagcdn.com/w320/io.png', '[\"UTC+06:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(232, 'Nigeria', 'ng', '+234', 'NGN', 'https://flagcdn.com/w320/ng.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(233, 'Zambia', 'zm', '+260', 'ZMW', 'https://flagcdn.com/w320/zm.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(234, 'French Southern and Antarctic Lands', 'tf', '+262', 'EUR', 'https://flagcdn.com/w320/tf.png', '[\"UTC+05:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(235, 'Chad', 'td', '+235', 'XAF', 'https://flagcdn.com/w320/td.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(236, 'Svalbard and Jan Mayen', 'sj', '+4779', 'NOK', 'https://flagcdn.com/w320/sj.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(237, 'Lithuania', 'lt', '+370', 'EUR', 'https://flagcdn.com/w320/lt.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(238, 'Ukraine', 'ua', '+380', 'UAH', 'https://flagcdn.com/w320/ua.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(239, 'China', 'cn', '+86', 'CNY', 'https://flagcdn.com/w320/cn.png', '[\"UTC+08:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(240, 'United States Minor Outlying Islands', 'um', '+268', 'USD', 'https://flagcdn.com/w320/um.png', '[\"UTC-11:00\",\"UTC-10:00\",\"UTC+12:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(241, 'Northern Mariana Islands', 'mp', '+1670', 'USD', 'https://flagcdn.com/w320/mp.png', '[\"UTC+10:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(242, 'Palestine', 'ps', '+970', 'EGP', 'https://flagcdn.com/w320/ps.png', '[\"UTC+02:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(243, 'Greenland', 'gl', '+299', 'DKK', 'https://flagcdn.com/w320/gl.png', '[\"UTC-04:00\",\"UTC-03:00\",\"UTC-01:00\",\"UTC+00:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(244, 'South Sudan', 'ss', '+211', 'SSP', 'https://flagcdn.com/w320/ss.png', '[\"UTC+03:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(245, 'Bangladesh', 'bd', '+880', 'BDT', 'https://flagcdn.com/w320/bd.png', '[\"UTC+06:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(246, 'Equatorial Guinea', 'gq', '+240', 'XAF', 'https://flagcdn.com/w320/gq.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(247, 'Namibia', 'na', '+264', 'NAD', 'https://flagcdn.com/w320/na.png', '[\"UTC+01:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(248, 'Timor-Leste', 'tl', '+670', 'USD', 'https://flagcdn.com/w320/tl.png', '[\"UTC+09:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(249, 'Brunei', 'bn', '+673', 'BND', 'https://flagcdn.com/w320/bn.png', '[\"UTC+08:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28'),
(250, 'Kiribati', 'ki', '+686', 'AUD', 'https://flagcdn.com/w320/ki.png', '[\"UTC+12:00\",\"UTC+13:00\",\"UTC+14:00\"]', '2022-08-24 17:01:28', '2022-08-24 17:01:28');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'particulier',
  `telephone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telephone_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT json_array() COMMENT 'DC2Type:json' CHECK (json_valid(`roles`)),
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `region_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `avatar`, `nom`, `prenom`, `nin`, `type`, `telephone`, `telephone_verified_at`, `password`, `roles`, `remember_token`, `created_at`, `updated_at`, `region_id`) VALUES
(1, NULL, 'Abdoul-wahid', 'Hassa', NULL, 'particulier', '3255924', '2022-08-24 17:10:42', '$2y$10$cKz7GdSvsqs7yc3Bm0gI/O3Z/ElDaY9cHEA.rqmmX5ONcD0ynRtSi', '[]', NULL, '2022-08-24 17:11:08', '2022-08-24 17:11:08', 188),
(2, NULL, 'Raissa', 'Oumary', NULL, 'particulier', '3204423', '2022-08-24 17:11:53', '$2y$10$pfZeTw8dq0vYJ0/rt9vtretMgAKVuSy4IHsWI2.LS/3srZJ9l.1Ue', '[]', NULL, '2022-08-24 17:11:57', '2022-08-24 17:11:57', 188),
(3, NULL, 'Zainaba', 'Ibouroi Macheme', NULL, 'particulier', '3691544', '2022-08-24 17:12:42', '$2y$10$R3x6OONdjeuOF8yOidzSpulxqAmISwJ.glu1baDcgJcHZahMxHtYq', '[]', NULL, '2022-08-24 17:12:45', '2022-08-24 17:12:45', 188),
(4, NULL, 'Imamou', 'Mina', NULL, 'particulier', '3324710', '2022-08-24 17:13:35', '$2y$10$EtT2z0.SMBJXv7ob/8rL8OP0H893djfWx7pV2OARK0EFcAEqTj5Ke', '[]', NULL, '2022-08-24 17:13:39', '2022-08-24 17:13:39', 188),
(5, NULL, 'Idaroussi', 'Djambae', NULL, 'particulier', '3575287', '2022-08-24 17:14:29', '$2y$10$VAkMWmEjoeV419V3QSKAWOcT12fvI.nGUlx8wsQF7axu0BO91hkZ2', '[]', NULL, '2022-08-24 17:14:32', '2022-08-24 17:14:32', 188),
(6, NULL, 'Soulaiman', 'Rayan', NULL, 'particulier', '3260433', '2022-08-24 17:15:12', '$2y$10$8CRLqAMyV9q3vduFvBSZfuUd9ktSMF9OYk8PpBZ/RlAFsr4MutTW6', '[]', NULL, '2022-08-24 17:15:15', '2022-08-24 17:15:15', 188),
(7, NULL, 'Absoir', 'Moissuli', NULL, 'particulier', '3579071', '2022-08-24 17:16:31', '$2y$10$quOFIK8l17owLcjOLixSG.Qqk7F8nUn8d61eqRV.yxb3jyGYE9cUS', '[]', NULL, '2022-08-24 17:16:34', '2022-08-24 17:16:34', 188),
(8, NULL, 'Badrou', 'Ahamada', NULL, 'particulier', '4357630', '2022-08-24 17:17:30', '$2y$10$a0Js8Fb/CRCM8YBvo5F6j.76g0bB8k5HwXaXTYOTVSoRWUW5zcmoW', '[]', NULL, '2022-08-24 17:17:34', '2022-08-24 17:17:34', 188),
(9, NULL, 'Faidji', 'M\'madi', NULL, 'particulier', '774487058', '2022-08-24 17:18:51', '$2y$10$RJOBrrExkD5GG.c6oH/Gr.XFHn5fdDQHfND0A831f5n6NAX6Ikrq2', '[]', NULL, '2022-08-24 17:18:55', '2022-08-24 17:18:55', 34);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comptes`
--
ALTER TABLE `comptes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comptes_user_id_foreign` (`user_id`);

--
-- Index pour la table `etats`
--
ALTER TABLE `etats`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `frequences`
--
ALTER TABLE `frequences`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groups_user_admin_foreign` (`user_admin`),
  ADD KEY `groups_frequence_id_foreign` (`frequence_id`),
  ADD KEY `groups_montant_id_foreign` (`montant_id`),
  ADD KEY `groups_etat_id_foreign` (`etat_id`);

--
-- Index pour la table `group_user`
--
ALTER TABLE `group_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_user_group_id_foreign` (`group_id`),
  ADD KEY `group_user_user_id_foreign` (`user_id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `montants`
--
ALTER TABLE `montants`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `operations`
--
ALTER TABLE `operations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `operations_compte_id_foreign` (`compte_id`),
  ADD KEY `operations_emetteur_foreign` (`emetteur`),
  ADD KEY `operations_beneficiaire_foreign` (`beneficiaire`),
  ADD KEY `operations_agent_foreign` (`agent`);

--
-- Index pour la table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_telephone_unique` (`telephone`),
  ADD UNIQUE KEY `users_nin_unique` (`nin`),
  ADD KEY `users_region_id_foreign` (`region_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comptes`
--
ALTER TABLE `comptes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `etats`
--
ALTER TABLE `etats`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `frequences`
--
ALTER TABLE `frequences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `group_user`
--
ALTER TABLE `group_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `montants`
--
ALTER TABLE `montants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `operations`
--
ALTER TABLE `operations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `regions`
--
ALTER TABLE `regions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=251;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comptes`
--
ALTER TABLE `comptes`
  ADD CONSTRAINT `comptes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_etat_id_foreign` FOREIGN KEY (`etat_id`) REFERENCES `etats` (`id`),
  ADD CONSTRAINT `groups_frequence_id_foreign` FOREIGN KEY (`frequence_id`) REFERENCES `frequences` (`id`),
  ADD CONSTRAINT `groups_montant_id_foreign` FOREIGN KEY (`montant_id`) REFERENCES `montants` (`id`),
  ADD CONSTRAINT `groups_user_admin_foreign` FOREIGN KEY (`user_admin`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `group_user`
--
ALTER TABLE `group_user`
  ADD CONSTRAINT `group_user_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  ADD CONSTRAINT `group_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `operations`
--
ALTER TABLE `operations`
  ADD CONSTRAINT `operations_agent_foreign` FOREIGN KEY (`agent`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `operations_beneficiaire_foreign` FOREIGN KEY (`beneficiaire`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `operations_compte_id_foreign` FOREIGN KEY (`compte_id`) REFERENCES `comptes` (`id`),
  ADD CONSTRAINT `operations_emetteur_foreign` FOREIGN KEY (`emetteur`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_region_id_foreign` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
