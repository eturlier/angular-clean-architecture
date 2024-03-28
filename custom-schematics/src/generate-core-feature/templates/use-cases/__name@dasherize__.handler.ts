import { <%= classify(name) %> } from '@core/<%= dasherize(name) %>/domain/models/<%= dasherize(name) %>.model';
import { AbstractBaseHandler } from '@core/base/use-cases/base.abstract.handler';
import { <%= classify(name) %>Client } from '@core/<%= dasherize(name) %>/domain/clients/<%= dasherize(name) %>.interface.client';

/**
 * La classe `<%= classify(name) %>Handler` est un gestionnaire qui définit les cas d'utilisation pour les entités.
 * Elle utilise l'interface `<%= classify(name) %>Loader` pour charger les entités qui sera defini :
 * - via '<%= classify(name) %>Factory' par provide sur les composants en ayant besoin dans le dossier ui/ 
 * - directement dans les test. pour les TU
 * Les méthodes communes sont déjà définies dans `AbstractBaseHandler`.
 */
export class <%= classify(name) %>Handler extends AbstractBaseHandler<<%= classify(name) %>> {
    constructor(private _<%= camelize(name) %>LoaderLoader: <%= classify(name) %>Client) {
        super(_<%= camelize(name) %>LoaderLoader);
    }
}
