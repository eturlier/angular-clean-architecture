import { strings } from '@angular-devkit/core';
import { SchematicsException } from '@angular-devkit/schematics';
import * as typescript from 'typescript';
import { SourceFileModification } from './models/source-file-modification.model';

/**
 * Ajouter un nouvel objet à un tableau spécifique dans un fichier source TypeScript.
 * @param {string} filename Le nom du fichier source
 * @param {Buffer} routeFile Le contenu du fichier source
 * @param {string} name Le nom de la route à ajouter
 * @param {string} identifier L'identifiant de l'objet dans lequel ajouter la route
 * @returns {SourceFileModification} Les modifications à apporter au fichier source
 */
export function addObjectToArrayChange(
    filename: string,
    routeFile: Buffer,
    name: string,
    identifier: string
): SourceFileModification {
    // Convertir le contenu du fichier en chaîne de caractères
    const sourceText = routeFile.toString('utf-8');
    // Créer un fichier source TypeScript à partir du contenu du fichier
    const sourceFile = typescript.createSourceFile(
        filename,
        sourceText,
        typescript.ScriptTarget.Latest,
        true
    );

    // Obtenir tous les nœuds du fichier source
    const nodes: typescript.Node[] = getSourceNodes(sourceFile);
    // Trouver le nœud qui correspond à l'identifiant
    const node = nodes.find(
        n =>
            n.kind === typescript.SyntaxKind.Identifier &&
            n.getText() === identifier
    );

    // Si le nœud ou son parent n'existe pas, lancer une exception
    if (!node || !node.parent) {
        throw new SchematicsException(
            `expected ${identifier} variable in ${filename} to be defined`
        );
    }

    // Obtenir les nœuds frères du nœud
    let nodeSiblings = node.parent.getChildren();
    // Trouver l'index du nœud parmi ses frères
    const nodeIndex = nodeSiblings.indexOf(node);
    // Récupérer les nœuds frères à partir de l'index du nœud
    nodeSiblings = nodeSiblings.slice(nodeIndex);

    // Trouver le nœud qui représente l'expression de tableau littéral
    const arrayLiteralExpressionNode = nodeSiblings.find(
        n => n.kind === typescript.SyntaxKind.ArrayLiteralExpression
    );

    // Si le nœud d'expression de tableau littéral n'existe pas, lancer une exception
    if (!arrayLiteralExpressionNode) {
        throw new SchematicsException(
            `${identifier} ArrayLiteralExpression node is not defined`
        );
    }

    // Trouver le nœud qui représente la liste de syntaxe
    const listNode = arrayLiteralExpressionNode
        .getChildren()
        .find(n => n.kind === typescript.SyntaxKind.SyntaxList);

    // Si le nœud de liste de syntaxe n'existe pas, lancer une exception
    if (!listNode) {
        throw new SchematicsException(`${identifier} list node is not defined`);
    }

    // Initialiser l'élément à ajouter
    let elementToAdd: string = '';
    // Selon l'identifiant, définir l'élément à ajouter
    switch (identifier) {
        case 'featuresRoutes':
            elementToAdd = `
    {
        path: '${strings.dasherize(name)}',
        loadChildren: () =>
            import('@core/${strings.dasherize(name)}/config/${strings.dasherize(name)}.routes').then(
                r => r.${strings.dasherize(name)}_routes
            ),
    },`;
            break;
        default:
            break;
    }

    // Retourner les modifications à apporter au fichier source
    return {
        index: listNode.getEnd(),
        toAdd: nodeSiblings.length >= 1 ? `${elementToAdd}` : elementToAdd,
    };
}

/**
 * Récupérer toutes les noeuds d'un fichier source.
 * @param {typescript.SourceFile} sourceFile Fichier source contenant les noeuds.
 * @returns {Array<typescript.Node>} Tableau contenant toutes les noeuds du fichier source.
 */
export function getSourceNodes(
    sourceFile: typescript.SourceFile
): typescript.Node[] {
    const nodes: typescript.Node[] = [sourceFile];
    const result: typescript.Node[] = [];

    while (nodes.length > 0) {
        const node = nodes.shift();

        if (node) {
            result.push(node);
            if (node.getChildCount(sourceFile) >= 0) {
                nodes.unshift(...node.getChildren());
            }
        }
    }

    return result;
}
