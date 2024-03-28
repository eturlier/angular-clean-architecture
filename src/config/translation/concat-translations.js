var path = require('path');
const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

console.log(
    '*************************************************************************************'
);
console.log(
    '******* Concaténation des fichiers de traductions et mise à jour de la config *******'
);
console.log(
    '*************************************************************************************'
);

var fileEncoding = 'utf-8';
var suffixFile = '.json';
var guidTranslation = crypto.randomUUID();
var _resourceFilesFolder = './src/assets/i18n/';
var _destFilesFolder = './src/assets/i18n/langs/';
var configFile = './src/config/translation/translation.ts';

/**
 * Concatène les fichiers de traduction pour une langue spécifique.
 * @param {string} lang - La langue pour laquelle concaténer les fichiers de traduction.
 * @returns {booléen} - `true` si le traitement a réussi, `false` sinon.
 */
function concat(lang) {
    console.log('>>> 🔄 Début du traitement pour la langue ' + lang + ' ...');
    try {
        // Récupère tous les fichiers dans le répertoire spécifié
        var allFiles = _getAllFiles(`${_resourceFilesFolder}${lang}/`);
        // Filtre les fichiers pour ne garder que ceux qui se terminent par le suffixe spécifié (ou '.json' par défaut)
        const fileEndsWith = allFiles.filter(file =>
            file.endsWith(suffixFile || '.json')
        );

        // Fusionne le contenu de tous les fichiers filtrés
        const mergedFile = fileEndsWith
            .map(file => {
                // Lit le contenu du fichier et le parse en JSON
                const fileContents = fs.readFileSync(file, fileEncoding);
                return JSON.parse(fileContents);
            })
            .reduce((prev, curr) => {
                // Fusionne l'objet courant avec l'objet précédent
                return { ...prev, ...curr };
            });

        // On teste si les data du nouveau fichier sont différent de celui existant
        var dirCont = fs.readdirSync(_destFilesFolder);
        dirCont.filter(function (elm) {
            if (elm.endsWith('.json') && elm.startsWith(lang + '_')) {
                var existingFile = path.resolve(_destFilesFolder + elm);
                const existingFileContents = fs.readFileSync(
                    existingFile,
                    fileEncoding
                );
                if (
                    compareValues(JSON.parse(existingFileContents), mergedFile)
                ) {
                    console.log(
                        '>>> ✅ Aucune modification pour la langue ' + lang
                    );
                    return endTreatment();
                } else {
                    console.log(
                        '>>> 🔄 Re-génération du fichier pour la langue ' + lang
                    );
                    // Suppression de l'ancien fichier
                    fs.unlinkSync(existingFile);

                    // Création du nouveau fichier
                    var distPath = path.resolve(
                        _destFilesFolder +
                            lang +
                            '_' +
                            guidTranslation +
                            '.json'
                    );
                    fs.writeFileSync(
                        distPath,
                        JSON.stringify(mergedFile, null, 3),
                        fileEncoding
                    );
                    console.log(
                        '>>> ✅ Traitement ok pour la langue ' +
                            lang +
                            '(' +
                            distPath +
                            ')'
                    );
                }
            }
        });

        return true;
    } catch (e) {
        console.error(
            '>>> ❌ Une erreur est survenu pour la langue ' +
                lang +
                ': ' +
                e.message
        );
        return false;
    }
}

/**
 * Met à jour le guid de traduction dans le fichier de configuration.
 * @param {string} guid - Le guid de traduction à mettre à jour dans le fichier de configuration
 */
async function updateTranslateGuidEnvironment(guid) {
    console.log(
        '>>> 🔄 Début du traitement pour la mise à jour du guid de traduction...'
    );

    // Mise à jour de la variable fichier de config
    try {
        let data = await readFile(configFile, 'utf8');
        const reg = /TRANSLATION_GUID = '(.+)'/gm;
        const updatedData = data.replace(reg, `TRANSLATION_GUID = '${guid}'`);
        await writeFile(configFile, updatedData, fileEncoding);
        console.log(
            '>>> ✅ Traitement ok pour la la mise à jour du guid de traduction dans la fichier ' +
                configFile
        );
    } catch (e) {
        console.error(
            '>>> ❌ Une erreur est survenu pour la mise à jour du guid de traduction dans la fichier ' +
                configFile +
                ': ' +
                e.message
        );
        throw e; // Propager l'erreur pour arrêter le traitement général
    }

    console.log(
        '>>> ✅ Traitement ok pour la mise à jour du guid de traduction.'
    );
}

(async () => {
    if (!concat('fr')) {
        process.exit(1);
    }
    /*if (!concat('en')) {
            process.exit(1);
    }*/

    // Enregistre le guid de l'environnement pour faire appel au nouveau fichier de traduction
    try {
        await updateTranslateGuidEnvironment(guidTranslation);
    } catch (e) {
        process.exit(1);
    }

    endTreatment();
})();

/**
 * Fonctions helpers
 */

function endTreatment() {
    console.log(
        '*************************************************************************************'
    );
    console.log(
        '********************************* Fin du traitement *********************************'
    );
    console.log(
        '*************************************************************************************'
    );
    process.exit(0);
}

/**
 * Récupère tous les fichiers dans un répertoire spécifié.
 * @param {string} dir - Le répertoire dans lequel chercher les fichiers.
 * @param {string[]} [allFilesList=[]] - Un tableau optionnel pour stocker les noms de fichiers.
 * @return {string[]} - Un tableau contenant les noms de tous les fichiers dans le répertoire.
 */
function _getAllFiles(dir, allFilesList = []) {
    // Lit le contenu du répertoire
    const files = fs.readdirSync(dir);
    files.map(file => {
        const name = dir + file;
        if (fs.statSync(name).isDirectory()) {
            // Si le fichier est un répertoire, exécute la fonction récursivement
            _getAllFiles(name, allFilesList);
        } else {
            // Sinon, ajoute le nom du fichier à la liste
            allFilesList.push(name);
        }
    });

    // Retourne la liste de tous les fichiers
    return allFilesList;
}

/**
 * Cette fonction compare deux valeurs `a` et `b`.
 * Si `a` et `b` sont des objets, elle compare leurs clés et leurs valeurs de manière récursive.
 * Si `a` et `b` sont des types primitifs (comme des nombres ou des chaînes), elle les compare directement.
 * @param {any} a - La première valeur à comparer.
 * @param {any} b - La deuxième valeur à comparer.
 * @returns {booléen} - `true` si les valeurs sont égales, `false` sinon.
 */
function compareValues(a, b) {
    // si a et b ne sont pas du même type, ils ne peuvent pas être égaux
    if (typeof a !== typeof b) {
        return false;
    }

    // Besoin de la garde "truthy" parce que typeof null === 'object'
    if (a && typeof a === 'object') {
        // obtenir les clés des objets a et b, triées
        var keysA = Object.keys(a).sort(),
            keysB = Object.keys(b).sort();

        // si a et b sont des objets avec un nombre différent de clés, ils ne sont pas égaux
        if (keysA.length !== keysB.length) {
            return false;
        }

        // si toutes les clés ne sont pas les mêmes, ils ne sont pas égaux
        if (
            !keysA.every(function (k, i) {
                return k === keysB[i];
            })
        ) {
            return false;
        }

        // récursion sur les valeurs pour chaque clé
        return keysA.every(function (key) {
            // si nous sommes arrivés ici, ils ont des clés identiques
            return compareValues(a[key], b[key]);
        });

        // pour les types primitifs, utilisez simplement une vérification directe
    } else {
        return a === b;
    }
}
