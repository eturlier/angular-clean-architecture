import { strings } from '@angular-devkit/core';
import {
    Rule,
    SchematicContext,
    SchematicsException,
    Tree,
    apply,
    callRule,
    chain,
    filter,
    mergeWith,
    move,
    template,
    url,
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { addObjectToArrayChange } from '../helpers/helpers';
import { SourceFileModification } from '../helpers/models/source-file-modification.model';
import { GenerateCoreFeatureSchema } from './schema.model';

/**
 * Permet de générer un feature dans le core de l'application à l'aide d'un schéma
 * Les fichier de template sont dans le dossier templates et seront généré dans le dossier src/core/app/feature-name avec la même arborescence que dans le dossier templates
 * @param {GenerateCoreFeatureSchema} _options
 * @returns {Rule}
 */
export function generateCoreFeature(_options: GenerateCoreFeatureSchema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        return callRule(
            async (_tree: Tree, _context: SchematicContext) => {
                const workspace = await getWorkspace(_tree);
                const workspaceConfig = _tree.read('angular.json');

                if (!workspaceConfig) {
                    throw new SchematicsException(
                        'Not an Angular CLI workspace'
                    );
                }

                if (!_options.project) {
                    _options.project = Object.keys(workspace.projects)[0];
                }

                let sourceTemplate = url('./templates');

                // Si les routes ne sont pas activées, on enlève le template config/FEATURE_NAME.routes.ts
                if (!_options.routes) {
                    sourceTemplate = apply(sourceTemplate, [
                        filter(path => !path.endsWith('.routes.ts')),
                    ]);
                }

                // Création des fichiers à partir des templates et les mettre dans le dossier src/core/app/FEATURE_NAME
                const sourceParametrizedTemplates = apply(sourceTemplate, [
                    template({
                        ..._options,
                        ...strings,
                    }),
                    move(`src/core/app/${strings.dasherize(_options.name)}`),
                ]);

                if (_options.routes) {
                    return chain([
                        mergeWith(sourceParametrizedTemplates),
                        addRouteToAppRoutes(_options.name),
                    ]);
                }

                return mergeWith(sourceParametrizedTemplates);
            },
            tree,
            _context
        );
    };
}

/**
 * Ajouter le lien vers les routes dans app/config/app-routes.ts
 * @param {string} name Nom de la feature
 * @returns {Rule}
 */
export function addRouteToAppRoutes(name: string): Rule {
    return (tree: Tree) => {
        const path = 'src/config/app.routes.ts';
        const routeFile = tree.read(path);
        if (!routeFile) throw new SchematicsException(`File does not exist.`);

        const modification: SourceFileModification = addObjectToArrayChange(
            'app.routes.ts',
            routeFile,
            name,
            'featuresRoutes'
        );

        const declarationRecorder = tree.beginUpdate(path);
        declarationRecorder.insertLeft(modification.index, modification.toAdd);
        tree.commitUpdate(declarationRecorder);

        return tree;
    };
}
