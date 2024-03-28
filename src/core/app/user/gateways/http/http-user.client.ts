import { HttpClient } from '@angular/common/http';
import { AbstractHttpBaseClient } from '@core/base/gateways/http/http-base.abstract..client';
import { UserClient } from '@core/user/domain/clients/user.interface.client';
import { User } from '@core/user/domain/models/user.model';
import { Observable } from 'rxjs';

/**
 * La classe `HttpUserClient` est une implémentation de l'interface `UserLoader` qui utilise le protocole HTTP pour charger les entités.
 */
export class HttpUserClient
    extends AbstractHttpBaseClient<User>
    implements UserClient
{
    constructor(protected override http: HttpClient) {
        super(http, 'user');
    }

    /**
     * La méthode `all` est utilisée pour récupérer tous les entités.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne l'Observable reçu ou un observable de tableau vide avec une erreur.
     * @returns {Observable<User[]>} Un Observable qui émet un tableau vide ou contenant tous les entités.
     */
    all(): Observable<User[]> {
        /* [TODO] Implémentation + gestion message d'erreur */
        throw new Error('Methode "all" not implemented');
    }

    /**
     * La méthode `get` est utilisée pour récupérer un entité avec l'ID passé en param.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne un Observable avec l'entité retournée ou une erreur.
     * @param {string} id  L'ID de l'entité à récupérer.
     * @returns {Observable<User>} Un Observable qui émet un l'entité récupéré.
     */
    get(id: string): Observable<User> {
        /* [TODO] Implémentation + gestion message d'erreur */
        throw new Error('Methode "get(' + id + ')" not implemented');
    }
}
