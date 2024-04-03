# Angular Clean Architecture

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

## Initialisation du projet

Afin d'installer le projet et le projet contenant les schematics lancer la commande:

```sh
npm run init
```

Cette commande va installer ou réinstaller les 2 projets en supprimant les dossiers nodes_modules et en nettoyant les caches si ils existent ainsi que faire un build du projet `custom-schematics` afin de pouvoir utiliser les schematics qu'il contient.

## Development

L'application peut être utilisé avec 2 modes:

-   MOCK qui lancera l'application sans utiliser le serveur (seul des fichiers de mocks seront utilisé pour la manipulation de données)

```sh
npm run start:mock
```

-   CLASSIQUE pour lequel il faudra lancer le serveur en parallèle afin d'avoir accèsz aux api

```sh
npm run start
```

Dans les 2 cas l'interface sera accessible via `http://localhost:4200/` et se rechargera automatiquement si vous modifiez l'un des fichiers source.

## Architecture: Clean architecture

Pour ce projet, une approche en clean arhitecture a été utilisée afin de découpler le coeur applicatif métier de l’interface utilisateur de la solution.

Ainsi a été séparer le code dit **"Core"** (logique métier, contrat d'interfaçage et implémentations des sources de données) de la partie code **"UI"** qui sert à l'affichage.

Le code métier (`src/core/app/FEATURE_NAME/use-cases/`), les implémentations des sources de données (`src/core/app/FEATURE_NAME/gateways/`) et les contrats d'interfaces (`src/core/app/FEATURE_NAME/domain/`) vont se trouver dans le dossier `src/core/` et le code ui (les composant de l'interface) dans le dossier `src/ui/`

![Clean architecture](./src/assets/images-readme/clean-archi.png 'Clean architecture')

Le concept:

-   Les règles métiers **"Core"** sont agnostiques de tout framework.
    ICI => Elle ne dépendent que du language Typescript.
-   Les intéractions avec l'extérieur sont possible via l'implémentations d'interface définis dans le core (elles répondent à des contrats). On a la possibilité d'en implémenter autant qu'on le souhaite, ce qui permet qu'un changement de source de données est moins couteux (il suffira de d'écrire une nouvelle implémentation)
    ICI => On utilise une implémentation pour des api REST et une implémentation pour des mocks
-   La partie **"UI"** (intéraction avec l'utilisateur) va utiliser un handler (class permettant de traiter des évènements) en spécifiant une source de données (via un modèle factory) dans sa configuration afin de dialoguer avec le **"Core"**. Cette partie est utilisé pour construire les parties périphériques au domaine applicatif comme la gestion des routes, l’affichage des données, le style, ...
    Celà ouvre la possibilité à un changement de framework (avec ré-écriture des nouveaux écrans bien sur) comme c'est uniquement du comportemant dit d'écran qui est ici.
    ICI => Le framework Angular utilise un provider afin de définir la source de données (classique http ou mock) et appeler le handler avec.

Le changement de framework n'étant pas envisagé pour l'instant, le projet angular embarque un dossier `src/core` contenant le code **"Core"**.
Pour aller jusqu'au bout de l'idée il faudrait sortir le core dans un projet à part.
Aujourd'hui pour un changement de framework, il faudrait copier le dossier core dans la nouvelle architecture.

## Architecture: code Core

Dans le dossier `src/core/` on trouve le dossier `app/` avec le code métier et le dossier `tests/` contenant les tu.

Dans `src/core/app/` le code métier est regroupé par _feature_ ou groupe de fonctionnalités par exemple les factures ou les dossiers sont 2 _feature_ différentes.

### Architecture des fichiers

A l'intérieur de chaque _feature_ le rangement des fichiers est le même:
| Dossiers / Fichiers | | | Commentaires |
| ------ | ------ | ------ | ------ |
| configuration/ | | | Ce dossier contient ce qui va être utilisé dans la configuration de l'application angular |
| ------ | feature.factory.ts | | Cette class est utilisée pour créer un chargeur données via un provider dans les composants de la partie `src/ui/`: soit en mode mock soit en mode classique via les api. |
| ------ | feature.routes.ts | | Cette constante contient les routes en lien avec la _feature_ et qui seront implémentées dans la partie configuration de l'application `src/config/` |
| domain/ | | | Ce dossier contient les contrats d'interface que sont les modèles de données des entités et les clients |
| ------ | clients/ | | |
| ------ | ------ | feature.interface.client.ts | Cet interface définit les méthodes qui devront être implémentées par les classes qui chargent les données (via mock ou http). C'est notre contrat pour charger les données. |
| ------ | models/ | | |
| ------ | ------ | feature.model.ts | Il peut y avoir un ou plusieurs fichiers. Ce sont les classes de représentations des données uniquement avec un constructeur et des getter. |
| gateways/ | | | Ce dossier contient les implémentations des clients défini dans domain. On trouve ici les intérations avec l'extérieur (les api ou les mocks par exemple). |
| ------ | http/ | | |
| ------ | ------ | http-feature.client.ts | Cette classe est une implémentation de l'interface `FeatureClient` (créé dans `src/core/app/FEATURE_NAME/domain/clients/`) qui utilise le protocole HTTP pour charger les dossiers. |
| ------ | mocks/ | | |
| ------ | ------ | mock-feature.client.ts | Cette classe est une implémentation de l'interface `FeatureClient` (créé dans `src/core/app/FEATURE_NAME/domain/clients/`) qui est utilisé pour simuler le comportement de `FeatureClient` dans un environnement mockée ou de développement lorsque l'implémentation via le protocole HTTP n'est pas encore disponible. |
| ------ | ------ | mocks-feature.ts | Se sont les données mockées qui nous sevicrons de sources. |
| use-cases/ | | | Ce dossier contient les constructeurs et les cas d'utilisations. La partie dite "métier" des intération avec les données va se retrouver ici. |
| ------ | feature.builder.ts | | Il peut y avoir plusieurs fichiers. La classe `FeatureBuilder` est un constructeur d'un objet `Feature` par exemple (défini dans `src/core/app/FEATURE_NAME/domain/models/`). Elle utilise le pattern Builder pour créer des instances du model `Feature`. |
| ------ | feature.handler.ts | | Cette classe est un gestionnaire qui définit les cas d'utilisation pour les données de notre feature. Elle utilise l'interface `FeatureClient` (défini dans `src/core/app/FEATURE_NAME_NAME/domain/clients`) pour charger données et sera defini soit via 'FeatureFactory' (`src/core/app/FEATURE_NAME/configuration`) par provider sur les composants en ayant besoin dans le dossier `src/ui/` soit directement dans les fichier de test (les .spec.ts) pour les TU |

### Fonctionnement d'ajout d'une nouvelle feature dans le core

Pour générer une nouvelle _feature_ dans le core avec tout ce qui va bien un schematic a été. Il suffit d'éxécuter:

```sh
`ng generate ./custom-schematics:generate-core-feature`
```

Cela va générer un nouveau dossier dans la partie `src/core/` avec le nom de la feature qui aura été renseigné.

A l'intérieur de ce dossier on retrouvera l'architecture ci-dessus avec les fichiers généré avec le code par défault ainsi que l'ajout des routes de cette nouvelle feature dans la configuration des routes de l'appli `src/config/app.routes.ts`.

Il ne reste plus qu'à implémenter le code et à créer l'ui correspondante.

### Fonctionnement du mode MOCK

Concernant les mocks, il faudra remplir le fichier généré `src/core/app/FEATURE_NAME/gateways/mocks//mocks-FEATURE_NAME.ts` et à utiliser les entités créée pour populer le client de mock `src/core/app/FEATURE_NAME/config/FEATURE_NAME.factory.ts`. Les mocks peuvent également être utilisé dans les TU.

### Amélioration du core

Lorsque l'on rajoute dans le core des fonctionnalitées ou autres pouvant être partager, il faut penser à :

-   Soit le mettre dans le core basique duquel dépend toute le feature
-   Soit modifier le schematic afin que se soit pris en compte lors de la génération

## Architecture: code UI

Dans le dossier `src/ui/` le code est celui classque d'une application angular.

On y retrouvera les composants de pages correspondant aux routes et les composants qui la composent.
On trouvera également les composants partagés.

## Comment utiliser le core dans la partie ui/

Exécuter la commande suivante pour générer un nouveau composant, en se plaçant au bon endroit.

```sh
ng generate component component-name
```

Pour pouvoir manipuler les données, il faudra implémenter le provider suivant dans le component

```sh
providers: [
    {
        provide: FeatureHandler,
        useFactory: () =>
            new FeatureHandler(FeatureFactory.getClient()),
    },
    ...
  ],
```

Il suffira ensuite de l'injecter dans le composant afin de pour voir l'utiliser.

Exemple pour récupérer une liste de la feature:

```sh
public featureItems$: WritableSignal<Feature[]> = signal<Feature[]>([]);
private featureHandler$: FeatureHandler = inject(FeatureHandler);

  ngOnInit(): void {
    this.featureHandler$.all().subscribe((featureItems: Feature[]) => {
      this.featureItems$.set(featureFiles);
    });
  }
```

Exemple pour récupérer un objet de la feature:

```sh
public featureItem$: WritableSignal<Feature> = signal<Feature>(undefined);
private featureHandler$: FeatureHandler = inject(FeatureHandler);

constructor(private route: ActivatedRoute) {}

ngOnInit(): void {
  this.featureHandler$.get(this.route.snapshot.paramMap.get('id')).subscribe((featureItem: Feature) => {
    this.featureItem$.set(featureFiles);
  });
}
```

## Architecture: configuration

Elle se trouve dans la partie `src/config/`

Il faut penser à implémenter les routes définie dans le core (ex: `src/core/app/FEATURE_NAME/config/FEATURE_NAME.routes.ts`) dans `app.routes.ts`. Si on a utilisé le schematic pour générer la feature dans le core alors c'est déjà fait ;)

## Test unitaires

Exécutez la commande suivante pour exécuter les tests unitaires existants (ceux du core + ceux de la partie ui)

```sh
ng test
```
