# NDZIWA

Projet de soutenance pour valider mon DUT. Il s'agit d'un portefeuille de monnaie électronique, qui va prendre en charge le dépôt et le retrait d'argent, un moyen de transfert d'argent et un systeme de <a rel="license" href="https://fr.wikipedia.org/wiki/Tontine#Fonctionnement">tontine</a>

## prérequis

- [Avoir composer installé et PHP ^8.0.0](https://getcomposer.org/download/)
- [Node js 12.22.0 ou plus ](https://nodejs.org/en/download/)
- [CLI react native](https://reactnative.dev/docs/environment-setup)
- [Postman (pour tester l'api)](https://learning.postman.com/docs/getting-started/installation-and-updates/) ou autre

Pour notre projet, nous l'avons organisé en trois parties :

- [Api](#Api)
    - [Objectif](#Objectif-api)
    - [Participer](#Participer_(Api))

- [Administration](#Administration)
    - [Objectif](#Objectif-administration)
    - [Participer](#Participer)

- [App Mobile](#App-Mobile)
    - [Objectif](#Objectif-app-mobile)
    - [Participer](#Participer_(App-mobile))
    
## Api 

### Objectif-api

l'objectif de cette partie est de fournir les differents endpoints pour alimenter le reste de l'application.
Il s'agit d'un API Rest qui sera consomé par une application mobile et une application web pour l'administration.

- Nous utilisons Laravel pour le développement de l'api 

### Participer_(Api)

```bash
cd api
composer install
php -S localhost:8000 -t public dev ## Lancer le serveur de développement, accessible ensuite sur http://localhost:8000
php artisan migrate ## Appliquer les migrations
php artisan db:seed ## Remplir la base de données
```

## Administration

### Objectif-administration

L'administration s'agit d'un SPA qui va utiliser les endpoints génerer par notre api REST, pour administrer les comptes des utilisateurs (dépôt, retrait ...ect)

- Next-js est utilisé pour cette application;

### Participer_(Admin)


```bash
cd admin
npm install next react react-dom
# or
yarn add next react react-dom

```

## App-Mobile

### Objectif-app-mobile

Nous utiliserons une application mobile pour permettre aux utisateurs d'acceder à tout nos fonctionnalités.

- React-native est utilisé pour cette application;

### Participer_(App-mobile)

```bash

```