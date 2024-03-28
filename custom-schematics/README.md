# Schematics

Ce référentiel est une implémentation schématiques pour un projet de clean architecture.

### Environnement de développement

Penser à ajouter ceci dans settings.json de vscode pour ne pas avoir les erreurs sur les fichiers de template

```bash
     "files.associations": {
        "**/templates/**/*.ts": "plaintext"
    }
```

### Schematics contenu

## generate-core-feature

Elle permet de génerer une nouvelle _feature_ dans la partie core de l'application `src/core/app/`.

Pour l'utiliser depuis le projet il faut taper la commande:

```sh
`./custom-schematics:generate-core-feature`
```

### Développement (création ou modification de schématics)

[Documentation Angular](https://angular.io/guide/schematics)

Pour tester en mode debug une schematics:

```sh
`schematics ./custom-schematics:generate-core-feature`
```

Après chaque modification dans le dossier, il faut mettre à jour le projet afin que les modif soient prise en compte:

```bash
npm run build
```
