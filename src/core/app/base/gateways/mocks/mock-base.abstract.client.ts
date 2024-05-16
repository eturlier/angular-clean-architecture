import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';
import { FilterEvent } from '@core/base/domain/models/filter-event.model';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';

/**
 * La classe `AbstractMockBaseClient` est une une classe abstraite permettant les implémentations des interface client et qui sont partagées
 * Elle va permettre de simuler des comportements dans un environnement mockée ou de développement lorsque l'implémentation via le protocole HTTP n'est pas encore disponible.
 */
export abstract class AbstractMockBaseClient<
    B extends BaseEntity,
    F extends FilterEvent,
> {
    protected _entities$: Subject<B[]> = new BehaviorSubject<B[]>(
        this._entities
    );

    constructor(protected _entities: B[] = []) {}

    /**
     * La méthode `all` est utilisée pour récupérer toutes les entité.
     * Dans cette implémentation mockée, elle retourne un Observable d'un tableau vide ou contenant toutes les entités que l'on aura settées via le constructeur.
     * @returns {Observable<B[]>} Un Observable qui émet un tableau vide ou contenant toutes les entités.
     */
    public all(filters?: F): Observable<B[]> {
        if (filters) {
            return this.filterEntities(filters);
        } else {
            return this._entities$;
        }
    }

    /**
     * Implémentation de la méthode générique de filtre des entités pour les mocks uniquement sur les champs texte.
     * @param filters
     */
    protected filterEntities(filters: F): Observable<B[]> {
        if (filters) {
            const filteredEntities = this._entities.filter(value => {
                if (!filters.searchText) {
                    return true;
                } else {
                    return Object.keys(value).some(key => {
                        return (
                            !!value[key as keyof typeof value] &&
                            String(value[key as keyof typeof value])
                                .toLowerCase()
                                .includes(
                                    filters?.searchText?.toLowerCase() ?? ''
                                )
                        );
                    });
                }
            });
            this._entities$.next(filteredEntities);
        }
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

    /**
     * La méthode `create` est utilisée pour créer une entité.
     * Dans cette implémentation mockée, elle retourne un Observable avec la nouvelle entité ou une erreur si la création a échoué.
     * @param {B} entity L'entité à créer.
     * @returns {Observable<B>} Un Observable qui émet la nouvelle entité créée.
     */
    public create(entity: B): Observable<B> {
        this._entities.push(entity);
        this._entities$.next(this._entities);
        return new Observable<B>(subscriber => {
            subscriber.next(entity);
            subscriber.complete();
        });
    }

    /**
     * La méthode `update` est utilisée pour mettre à jour une entité.
     * Dans cette implémentation mockée, elle retourne un Observable avec l'entité mise à jour ou une erreur si la mise à jour a échoué.
     * @param {B} entity L'entité à mettre à jour.
     * @returns {Observable<B>} Un Observable qui émet l'entité mise à jour.
     */
    public update(entity: B): Observable<B> {
        const index = this._entities.findIndex(
            (base: B) => base.id === entity.id
        );
        if (index === -1) {
            throw new Error(
                `Aucun objet n'a été trouvé avec l'ID: ${entity.id}`
            );
        }
        this._entities[index] = entity;
        this._entities$.next(this._entities);
        return new Observable<B>(subscriber => {
            subscriber.next(entity);
            subscriber.complete();
        });
    }

    /**
     * La méthode `delete` est utilisée pour supprimer une entité.
     * Dans cette implémentation mockée, elle retourne un Observable avec un message de succès ou une erreur si la suppression a échoué.
     * @param {string} is Id de l''entité à supprimer.
     * @returns {Observable<void>}
     */
    public delete(id: string): Observable<void> {
        const index = this._entities.findIndex((base: B) => base.id === id);
        if (index === -1) {
            throw new Error(`Aucun objet n'a été trouvé avec l'ID: ${id}`);
        }
        this._entities.splice(index, 1);
        this._entities$.next(this._entities);
        return new Observable<void>(subscriber => {
            subscriber.complete();
        });
    }
}
