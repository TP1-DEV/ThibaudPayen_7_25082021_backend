# GROUPOMANIA - BACKEND

Projet 7 du parcours développeur web Openclassrooms : "Créez un réseau social d’entreprise"

#### Prérequis

- [NodeJs](https://nodejs.org/en/) en version 14 LTS minimum.

## INSTALLATION

- Exécuter `npm install`
- Démarrer le serveur en exécutant la commande `npm run start:dev`
- Le serveur écoute à l'adresse http://localhost:3000
- Renommer le fichier .env.exemple en .env et compléter le champ requis avec vos données.
- Renommer le fichier ormconfig.json.exemple en ormmconfig.json et compléter les champs requis avec les paramètres de votre base de donnée.


## SCENARIO

Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.

Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle ! Elle vient de signer un contrat pour un nouveau projet ambitieux !

Le client en question est Groupomania, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

Groupomania à déjà réfléchi aux fonctionnalités à intégrer dans le réseau social. Il s'agit en fait de produits déjà existants : 
9GAG - Ils veulent que les employés partagent et commentent les gifs avec d'autres collègues.
Reddit - Ils veulent que les employés écrivent et/ou partagent des articles avec leurs collègues sur des sujets qui les intéressent.

La seule contrainte est que le client utilise une base de données relationnelles qui se manipule avec le langage SQL pour le stockage de données. Il faudra donc en tenir compte lorsque tu construiras ton application. Tu devras t’assurer que l’utilisateur puisse requêter les données requises depuis SQL et puisse soumettre ces changements à la base de données SQL. Les données de connexion doivent également être sécurisées.

Tu devras faire en sorte que la web app puisse se connecter et se déconnecter à l’application et que la session de l’utilisateur persiste pendant qu’il est connecté.

Pour ce projet, il faut que tu utilises un framework Front-End. Tu peux utiliser celui que tu préfères (React, Vue, Angular, Ember, Meteor, Aurelia...). Par contre, le projet doit être codé en Javascript, donc n'utilise pas le framework Symfony par exemple. Enfin, tes pages devront respecter les standards WCAG.

## COMPETENCES EVALUEES

- Personnaliser le contenu envoyé à un client web.
- Authentifier un utilisateur et maintenir sa session.
- Gérer un stockage de données à l'aide de SQL.
- Implémenter un stockage de données sécurisé en utilisant SQL.

## TRAVAIL REALISE

- Création de la partie Backend du projet.
- Utilisation de Typescript, NodeJS, NestJS, TypeORM, MySQL.
- Création d'une suite de test avec Jest, Sqlite, Supertest. `npm run test` depuis le dossier backend pour les exécuter.