import { BaseEntityDTO } from '@core/base/domain/models/base-entity-DTO.model';
import { AbstractHttpBaseClient } from '@core/base/gateways/http/http-base.abstract.client';
import { UserClient } from '@core/user/domain/clients/user.interface.client';
import { User } from '@core/user/domain/models/user.model';
import { UserMapper } from '@core/user/gateways/http/http-user.mapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    all(): Observable<User[]> {
        return this._get<BaseEntityDTO[]>('users').pipe(
            map(response => {
                if (response) {
                    return response.map((obj: BaseEntityDTO) =>
                        UserMapper.mapTo(obj as BaseEntityDTO)
                    );
                } else {
                    return [];
                }
            })
        );
    }

    /**
     * La méthode `get` est utilisée pour récupérer un entité avec l'ID passé en param.
     * Dans cette implémentation http, elle fait un appel au serveur et retourne un Observable avec l'entité retournée ou une erreur.
     * @param {string} id  L'ID de l'entité à récupérer.
     * @returns {Observable<User>} Un Observable qui émet un l'entité récupéré.
     */
    get(id: string): Observable<User> {
        return this._get<BaseEntityDTO>('user', id).pipe(
            map<BaseEntityDTO, User>(file => UserMapper.mapTo(file))
        );
    }
}
