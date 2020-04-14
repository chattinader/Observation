# Observation
## Description
![](https://lh3.googleusercontent.com/eBEGw6seysuIue_-wdYJ8SpGb3H69AFK8ZnTtkTGc17ESdfyjFkO3g_PFVmDEG-13YrGPg=s170)

Le **GEIPAN**, Groupe d’Études et d’Information sur les Phénomènes Aérospatiaux Non Identifiés fait partie intégrante des missions du Centre National d'Études Spatiales (CNES).

Il a pour charge la collecte des témoignages d’observations de PAN sur le territoire français mais pas que....

![](https://scontent.fcdg1-1.fna.fbcdn.net/v/t1.0-9/50539509_1264729240356913_5469609442360164352_n.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=rEX6Qy253akAX_w1qML&_nc_ht=scontent.fcdg1-1.fna&oh=a0d1fd9df3bc0cbadc157f8597164a3e&oe=5EBC3414)

Dans le cadre du cursus **MBDS** et du module d'enseignement de **Michel BUFFA**, cette application REACT a été développée par **Nader CHATTI** et **Hamza JRAD**.

Les données sur les témoignages ont été récupéré sur le site officiel de GEIPAN et stockées dans une base de données distante MongoDB Atlas.

Vous trouverez dans cette application un formulaire permettant d'effectuer des recherches sur l'ensemble des témoignages ainsi qu'un dashboard dynamique contenant une bref analyse statistique de ceux-ci.

-------------------------------------------------------

## Lancement du projet
_Le lancement du projet requière **NodeJS** et **Npm**_

1. Base de donnée MongoDB
    - Aucune action à faire pour la base de données car celle-ci est hébergée sur **MongoDB Atlas**

2. Lancement du serveur
    - Ouvrir un 1er terminal et aller dans le dossier du projet _./Observation/server_
    - Executer la commande `npm install` (pour l'installation des packages nécessaires)
    - Lancer le serveur avec la commande `node server.js` ou `nodemon server.js` 
        - Il est possible d'avoir une erreur si vous n'avez pas nodemon installé sur votre machine, il faut donc executer la commande `npm install nodemon -g` et réessayer de relancer le serveur

3. Lancement de l'application React
    - Ouvrir un 2ème terminal et aller dans le dossier du projet _./Observation_
    - Executer la commande `npm install` (pour l'installation des packages nécessaires)
    - Lancer l'application avec la commande `npm start`, après chargement vous allez être redirigé vers la page _http://localhost:3030_ dans votre navigateur par défaut