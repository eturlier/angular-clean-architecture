import { AbstractHttpBaseClient } from '@core/base/gateways/http/http-base.abstract.client';
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
    /**
     * La méthode `all` est utilisée pour récupérer tous les entités.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne l'Observable reçu ou un observable de tableau vide avec une erreur.
     * @returns {Observable<User[]>} Un Observable qui émet un tableau vide ou contenant tous les entités.
     */
    public all(): Observable<User[]> {
        /* [TODO] Implémentation */
        throw new Error('Methode "all" not implemented');

        /*
         * EXEMPLE
         * return this._get<BaseEntityDTO[]>('GetAll').pipe(
         *     map(response => {
         *         if (response) {
         *             return response.map(dto =>
         *                 User[]>Mapper.mapDTOToEntity(dto as BaseEntityDTO)
         *             );
         *         } else {
         *             return [];
         *         }
         *     })
         * );
         */
    }

    /**
     * La méthode `get` est utilisée pour récupérer une entité avec l'ID passé en param.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne un Observable avec l'entité retournée ou une erreur.
     * @param {string} id  L'ID de l'entité à récupérer.
     * @returns {Observable<User>} Un Observable qui émet un l'entité récupéré.
     */
    public get(id: string): Observable<User> {
        /* [TODO] Implémentation */
        throw new Error('Methode "get(' + id + ')" not implemented');

        /*
         * EXEMPLE
         * return this._get<BaseEntityDTO>('Get', id).pipe(
         *     map<BaseEntityDTO, User>(dto => User[]>Mapper.mapDTOToEntity(dto))
         * );
         */
    }

    /**
     * La méthode `create` est utilisée pour créer une entité.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne un Observable avec la nouvelle entitée ou une erreur.
     * @param {User} entity L'entitée' à créer.
     * @returns {Observable<User>} Un Observable qui émet le nouveau entitée créé.
     */
    public create(entity: User): Observable<User> {
        /* [TODO] Implémentation */
        throw new Error(
            'Methode "create(' +
                JSON.stringify(entity.json) +
                ')" not implemented'
        );

        /*
         * EXEMPLE
         * return this._post<BaseEntityDTO>('Update', User[]>Mapper.mapDTOFromEntity(entity)).pipe(
         *     map<BaseEntityDTO, User[]>>(dto => User[]>Mapper.mapDTOToEntity(dto))
         * );
         */
    }

    /**
     * La méthode `update` est utilisée pour mettre à jour une entité.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne un Observable avec l'entitée mis à jour ou une erreur.
     * @param {User} entity L'entitée à mettre à jour.
     * @returns {Observable<User>} Un Observable qui émet l'entitée mis à jour.
     */
    public update(entity: User): Observable<User> {
        /* [TODO] Implémentation */
        throw new Error(
            'Methode "update(' +
                JSON.stringify(entity.json) +
                ')" not implemented'
        );

        /*
         * EXEMPLE
         * return this._post<BaseEntityDTO>('Create', User[]>Mapper.mapDTOFromEntity(entity)).pipe(
         *     map<BaseEntityDTO, User[]>>(dto => User[]>Mapper.mapDTOToEntity(dto))
         * );
         */
    }

    /**
     * La méthode `delete` est utilisée pour supprimer une entité.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne un Observable avec un message de succès ou une erreur.
     * @param {string} id  L'ID de l'entitée à supprimer.
     * @returns {Observable<void>}
     */
    public delete(id: string): Observable<void> {
        /* [TODO] Implémentation */
        throw new Error('Methode "get(' + id + ')" not implemented');

        /*
         * EXEMPLE
         * return this._delete<void>('Delete', id);
         */
    }
}
