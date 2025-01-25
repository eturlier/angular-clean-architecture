const path = require('path');
const fs = require('fs');
const reg = /TRANSLATION_GUID = '(.+)'/gm;

startTreatment();

const fileEncoding = 'utf-8';
const suffixFile = '.json';
const guidTranslation = crypto.randomUUID();
const _resourceFilesFolder = './src/assets/i18n/';
const _destFilesFolder = './src/assets/i18n/langs/';
const configFile = './src/config/translation/translation.ts';

/**
 * Concatène les fichiers de traduction pour une langue spécifique.
 * @param {string} lang - La langue pour laquelle concaténer les fichiers de traduction.
 * @returns {booléen} - `true` si le traitement a réussi, `false` sinon.
 */
function concat(lang) {
    console.info('>>> 🔄 Début du traitement pour la langue ' + lang + ' ...');
    try {
        // Récupère tous les fichiers dans le répertoire spécifié
        const allFiles = _getAllFiles(`${_resourceFilesFolder}${lang}/`);

        // Filtre les fichiers pour ne garder que ceux qui se terminent par le suffixe spécifié (ou '.json' par défaut)
        const fileEndsWith = allFiles.filter(file =>
            file.endsWith(suffixFile || '.json')
        );

        // Si pas de fichiers, on arrete le traitement
        if (fileEndsWith.length === 0) {
            console.info(
                '>>> 🚫 Aucun fichier de traduction pour la langue ' + lang
            );
            return true;
        }

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

        // On vérifie si il existe déjà un fichier de traduction pour cette langue
        const dirCont = fs
            .readdirSync(_destFilesFolder)
            .filter(
                file => file.startsWith(lang + '_') && file.endsWith('.json')
            );
        console.info(
            '>>> 🔄 Nombre de fichiers de traduction pour la lang ' +
                lang +
                ' : ' +
                dirCont.length
        );

        // SI il n'y en a pas on creer le fichier
        if (dirCont.length === 0) {
            return generateTranslationFile(mergedFile, lang);
        }

        // Si il y en a plus d'1 on les suppriment tous et on en recrée un
        if (dirCont.length > 1) {
            dirCont.forEach(file => {
                fs.unlinkSync(_destFilesFolder + file);
            });
            return generateTranslationFile(mergedFile, lang);
        }

        // Si il y en a qu'un, on check si il y a des changements dans les données
        const traductionFilename = dirCont[0];
        console.info('>>> 🔄 Fichier de traduction : ' + traductionFilename);

        const existingFile = path.resolve(
            _destFilesFolder + traductionFilename
        );

        const existingFileContents = fs.readFileSync(
            existingFile,
            fileEncoding
        );

        // On teste si les data du nouveau fichier sont les mêmes que celles du fichier existant et si le TRANSLATION_GUID correspond bien sinon à celui contenu dans le nom du fichier existant
        if (compareValues(JSON.parse(existingFileContents), mergedFile)) {
            console.info('>>> ✅ Aucune modification pour la langue ' + lang);
            // Vérification de la définition de configFile
            if (!path.resolve(configFile)) {
                throw new Error(
                    "Le fichier de configuration de traduction n'est pas défini => " +
                        configFile
                );
            }

            // Si le TRANSLATION_GUID ne correspond pas on le met à jour sinon le traitement s'arrete
            // Récupération des datas du fichier de config de traductions et comparaison avec le nom du fichier de traduction
            const traductionConfigData = fs.readFileSync(configFile, 'utf8');
            const traductionGuidString = traductionConfigData.match(reg);
            const TRANSLATION_GUID =
                traductionGuidString && traductionGuidString[0]
                    ? traductionGuidString[0].match(/'([^']+)'/)
                    : undefined;
            const EXISTING_GUID = traductionFilename
                .split('_')[1]
                .split('.')[0];
            if (
                TRANSLATION_GUID &&
                TRANSLATION_GUID[1] &&
                TRANSLATION_GUID[1] !== EXISTING_GUID
            ) {
                return updateTranslateGuidEnvironment(EXISTING_GUID);
            } else {
                return true;
            }
        }

        // Dans les autres cas on récris le fichier
        return generateTranslationFile(mergedFile, lang, existingFile);
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
 * Génère le fichier de traduction pour une langue spécifique.
 * @param {any} mergedFile - Le contenu fusionnée des fichiers de traduction
 * @param {string} lang - La langue pour laquelle concaténer les fichiers de traduction.
 * @param {string} existingFile - Le nom du fichier existant
 */
function generateTranslationFile(mergedFile, lang, existingFile) {
    console.info('>>> 🔄 Re-génération du fichier pour la langue ' + lang);
    // Suppression de l'ancien fichier
    if (existingFile) fs.unlinkSync(existingFile);

    // Création du nouveau fichier
    const distPath = path.resolve(
        _destFilesFolder + lang + '_' + guidTranslation + '.json'
    );
    fs.writeFileSync(
        distPath,
        JSON.stringify(mergedFile, null, 3),
        fileEncoding
    );
    console.info(
        '>>> ✅ Traitement ok pour la langue ' + lang + '(' + distPath + ')'
    );

    // Enregistre le guid de l'environnement pour faire appel au nouveau fichier de traduction
    updateTranslateGuidEnvironment(guidTranslation);

    return true;
}

/**
 * Met à jour le guid de traduction dans le fichier de configuration.
 * @param {string} guid - Le guid de traduction à mettre à jour dans le fichier de configuration
 */
function updateTranslateGuidEnvironment(guid) {
    console.info(
        '>>> 🔄 Début du traitement pour la mise à jour du guid de traduction ' +
            guid +
            '...'
    );

    // Mise à jour de la variable fichier de config
    const data = fs.readFileSync(configFile, fileEncoding);
    const updatedData = data.replace(reg, `TRANSLATION_GUID = '${guid}'`);
    fs.writeFileSync(configFile, updatedData, fileEncoding);
    console.info(
        '>>> ✅ Traitement ok pour la la mise à jour du guid de traduction ' +
            guid +
            ' dans le fichier ' +
            configFile
    );

    return true;
}

(async () => {
    if (!concat('fr')) {
        process.exit(1);
    }

    // TODO : implementer la gestion de la langue 'en' par exemple
    // if (!concat('en')) {
    //     process.exit(1);
    // }

    endTreatment();
})();

/**
 * Fonctions helpers
 */

function startTreatment() {
    console.info(
        '*************************************************************************************'
    );
    console.info(
        '******* Concaténation des fichiers de traductions et mise à jour de la config *******'
    );
    console.info(
        '*************************************************************************************'
    );
}

function endTreatment() {
    console.info(
        '*************************************************************************************'
    );
    console.info(
        '********************************* Fin du traitement *********************************'
    );
    console.info(
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
        const keysA = Object.keys(a).sort(),
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
