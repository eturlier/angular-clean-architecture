import { AbstractHttpBaseClient } from '@core/base/gateways/http/http-base.abstract.client';
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
    /**
     * La méthode `all` est utilisée pour récupérer tous les entités.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne l'Observable reçu ou un observable de tableau vide avec une erreur.
     * @returns {Observable<<%= classify(name) %>[]>} Un Observable qui émet un tableau vide ou contenant tous les entités.
     */
    public all(): Observable<<%= classify(name) %>[]> {
        /* [TODO] Implémentation */
        throw new Error('Methode "all" not implemented');

        /*
        * EXEMPLE
        * return this._get<BaseEntityDTO[]>('GetAll').pipe(
        *     map(response => {
        *         if (response) {
        *             return response.map(dto =>
        *                 <%= classify(name) %>[]>Mapper.mapDTOToEntity(dto as BaseEntityDTO)
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
     * @returns {Observable<<%= classify(name) %>>} Un Observable qui émet un l'entité récupéré.
     */
    public get(id: string): Observable<<%= classify(name) %>> {
        /* [TODO] Implémentation */
        throw new Error('Methode "get(' + id + ')" not implemented');

        /*
        * EXEMPLE
        * return this._get<BaseEntityDTO>('Get', id).pipe(
        *     map<BaseEntityDTO, User>(dto => <%= classify(name) %>[]>Mapper.mapDTOToEntity(dto))
        * );
        */
    }

    /**
     * La méthode `create` est utilisée pour créer une entité.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne un Observable avec la nouvelle entitée ou une erreur.
     * @param {<%= classify(name) %>} entity L'entitée' à créer.
     * @returns {Observable<<%= classify(name) %>>} Un Observable qui émet le nouveau entitée créé.
     */
    public create(entity: <%= classify(name) %>): Observable<<%= classify(name) %>> {
        /* [TODO] Implémentation */
        throw new Error('Methode "create(' + JSON.stringify(entity.json) + ')" not implemented');

        /*
        * EXEMPLE
        * return this._post<BaseEntityDTO>('Update', <%= classify(name) %>[]>Mapper.mapDTOFromEntity(entity)).pipe(
        *     map<BaseEntityDTO, <%= classify(name) %>[]>>(dto => <%= classify(name) %>[]>Mapper.mapDTOToEntity(dto))
        * );
        */
    }

    /**
     * La méthode `update` est utilisée pour mettre à jour une entité.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne un Observable avec l'entitée mis à jour ou une erreur.
     * @param {<%= classify(name) %>} entity L'entitée à mettre à jour.
     * @returns {Observable<<%= classify(name) %>>} Un Observable qui émet l'entitée mis à jour.
     */
    public update(entity: <%= classify(name) %>): Observable<<%= classify(name) %>> {
        /* [TODO] Implémentation */
        throw new Error('Methode "update(' + JSON.stringify(entity.json) + ')" not implemented');

        /*
        * EXEMPLE
        * return this._post<BaseEntityDTO>('Create', <%= classify(name) %>[]>Mapper.mapDTOFromEntity(entity)).pipe(
        *     map<BaseEntityDTO, <%= classify(name) %>[]>>(dto => <%= classify(name) %>[]>Mapper.mapDTOToEntity(dto))
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
