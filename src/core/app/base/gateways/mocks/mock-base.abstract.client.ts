import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';

/**
 * La classe `AbstractMockBaseClient` est une une classe abstraite permettant les implémentations des interface client et qui sont partagées
 * Elle va permettre de simuler des comportements dans un environnement mockée ou de développement lorsque l'implémentation via le protocole HTTP n'est pas encore disponible.
 */
export abstract class AbstractMockBaseClient<B extends BaseEntity> {
    private _entities$: Subject<B[]> = new BehaviorSubject<B[]>(this._entities);

    constructor(private _entities: B[] = []) {}

    /**
     * La méthode `all` est utilisée pour récupérer toutes les entité.
     * Dans cette implémentation mockée, elle retourne un Observable d'un tableau vide ou contenant toutes les entités que l'on aura settées via le constructeur.
     * @returns {Observable<B[]>} Un Observable qui émet un tableau vide ou contenant toutes les entités.
     */
    public all(): Observable<B[]> {
        return this._entities$;
    }

    /**
     * La méthode `get` est utilisée pour récupérer une entité avec l'ID passé en param.
     * Dans cette implémentation mockée, elle retourne un Observable avec la bonne entité parmis celles que l'on aura settée via le constructeur ou une erreur si elle n'est pas trouvée.
     * @param {string} id  L'ID de l'entité à récupérer.
     * @returns {Observable<B>} Un Observable qui émet un la bonne entité récupéré.
     */
    public get(id: string): Observable<B> {
        return this._entities$.pipe(
            map((bases: B[]) => bases.find((base: B) => base.id === id) as B),
            tap(result => {
                if (!result) {
                    throw new Error(
                        `Aucun objet n'a été trouvé avec l'ID: ${id}`
                    );
                }
            })
        );
    }
}
