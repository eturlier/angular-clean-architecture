import { AbstractHttpBaseClient } from '@core/base/gateways/http/http-base.abstract.client';
import { UserClient } from '@core/user/domain/clients/user.interface.client';
import { User } from '@core/user/domain/models/user.model';
import { KeyValueObject } from '@ui/shared/models/utils.model';
import { map, Observable } from 'rxjs';
import { UserMapper } from './http-user.mapper';
import { BaseEntityDTO } from '@core/base/domain/models/base-entity-DTO.model';

/**
 * La classe `HttpUserClient` est une implémentation de l'interface `UserLoader` qui utilise le protocole HTTP pour charger les entités.
 */
export class HttpUserClient
    extends AbstractHttpBaseClient
    implements UserClient
{
    protected readonly basePathApi = 'users';

    /**
     * La méthode `all` est utilisée pour récupérer tous les entités.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne l'Observable reçu ou un observable de tableau vide avec une erreur.
     * @returns {Observable<User[]>} Un Observable qui émet un tableau vide ou contenant tous les entités.
     */
    public all(): Observable<User[]> {
        return this._get<BaseEntityDTO[]>('GetAll').pipe(
            map(response => {
                if (response) {
                    return response.map(dto => UserMapper.mapDTOToEntity(dto));
                } else {
                    return [];
                }
            })
        );
    }

    /**
     * La méthode `get` est utilisée pour récupérer une entité avec l'ID passe en param.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne un Observable avec l'entité retournée ou une erreur.
     * @param {string} id  L'ID de l'entité à récupérer.
     * @returns {Observable<User>} Un Observable qui émet un l'entité récupérée.
     */
    public get(id: string): Observable<User> {
        return this._get<BaseEntityDTO>(`Get`, id).pipe(
            map(dto => UserMapper.mapDTOToEntity(dto))
        );
    }

    /**
     * La méthode `create` est utilisée pour créer une entité.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne un Observable avec la nouvelle entitée ou une erreur.
     * @param {User} entity L'entitée' à créer.
     * @returns {Observable<User>} Un Observable qui émet le nouveau entitée créé.
     */
    public create(entity: User): Observable<User> {
        return this._post<BaseEntityDTO>(
            'Create',
            UserMapper.mapDTOFromEntity(entity)
        ).pipe(map(dto => UserMapper.mapDTOToEntity(dto)));
    }

    /**
     * La méthode `update` est utilisée pour mettre à jour une entité.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne un Observable avec l'entitée mis à jour ou une erreur.
     * @param {User} entity L'entitée à mettre à jour.
     * @returns {Observable<User>} Un Observable qui émet l'entitée mis à jour.
     */
    public update(entity: User): Observable<User> {
        return this._put<BaseEntityDTO>(
            `Update`,
            UserMapper.mapDTOFromEntity(entity)
        ).pipe(map(dto => UserMapper.mapDTOToEntity(dto)));
    }

    /**
     * La méthode `delete` est utilisée pour supprimer une entité.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne un Observable avec un message de succès ou une erreur.
     * @param {string} id  L'ID de l'entitée à supprimer.
     * @returns {Observable<void>}
     */
    public delete(id: string): Observable<void> {
        return this._delete(`Delete`, id);
    }
}
