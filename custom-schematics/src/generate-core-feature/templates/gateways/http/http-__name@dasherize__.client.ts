import { HttpClient } from '@angular/common/http';
import { AbstractHttpBaseClient } from '@core/base/gateways/http/http-base.abstract..client';
import { <%= classify(name) %>Client } from '@core/<%= dasherize(name) %>/domain/clients/<%= dasherize(name) %>.interface.client';
import { <%= classify(name) %> } from '@core/<%= dasherize(name) %>/domain/models/<%= dasherize(name) %>.model';
import { Observable } from 'rxjs';

/**
 * La classe `Http<%= classify(name) %>Client` est une implémentation de l'interface `<%= classify(name) %>Loader` qui utilise le protocole HTTP pour charger les entités.
 */
export class Http<%= classify(name) %>Client
    extends AbstractHttpBaseClient<<%= classify(name) %>>
    implements <%= classify(name) %>Client
{
    constructor(protected override http: HttpClient) {
        super(http, '<%= camelize(name) %>');
    }

    /**
     * La méthode `all` est utilisée pour récupérer tous les entités.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne l'Observable reçu ou un observable de tableau vide avec une erreur.
     * @returns {Observable<<%= classify(name) %>[]>} Un Observable qui émet un tableau vide ou contenant tous les entités.
     */
    all(): Observable<<%= classify(name) %>[]> {
        /* [TODO] Implémentation + gestion message d'erreur */
        throw new Error('Methode "all" not implemented');
    }

    /**
     * La méthode `get` est utilisée pour récupérer un entité avec l'ID passé en param.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne un Observable avec l'entité retournée ou une erreur.
     * @param {string} id  L'ID de l'entité à récupérer.
     * @returns {Observable<<%= classify(name) %>>} Un Observable qui émet un l'entité récupéré.
     */
    get(id: string): Observable<<%= classify(name) %>> {
        /* [TODO] Implémentation + gestion message d'erreur */
        throw new Error('Methode "get(' + id + ')" not implemented');
    }
}
