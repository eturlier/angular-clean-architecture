import { Sort } from '@angular/material/sort';
import { MAX_LENGTH_PAGING } from '@utils/constants';
import { UiPaging } from './ui-paging.model';

export class FilterEvent {
    /**
     * Pagination
     */
    paging?: UiPaging;

    /**
     *  Tri
     */
    sort?: Sort;

    /**
     * Filtres
     */
    filters?: Filter[];

    /**
     * Terme de recherche
     */
    searchText?: string;

    constructor(
        sort?: Sort,
        searchText?: string,
        paging?: UiPaging,
        filters: Filter[] = []
    ) {
        this.sort = sort;
        this.filters = filters;
        this.searchText = searchText ?? '';
        this.paging = paging;
    }

    /**
     * Récuperation d'une valeur de filtre
     * @param {string} name Nom du filtre
     * @returns {T | undefined} Valeur du filtre
     */
    public getFilterDefinition<T>(name: string): T | undefined {
        return this.getFilter(name)?.definition as T;
    }

    /**
     * Récuperation d'une valeur de filtre
     * @param {string} name Nom du filtre
     * @returns {T | undefined} Valeur du filtre
     */
    public getFilter(name: string): Filter | undefined {
        return this.filters?.find(filter => filter.name === name);
    }

    /**
     * Ajout d'un filtre
     * @param {string} name Nom du filtre
     * @param {T} definition Definition du filtre
     * @param {boolean} additional Indique si le filtre est additionnel
     * @returns {FilterEvent}
     */
    public setFilter<T>(
        name: string,
        definition: T,
        additional?: boolean
    ): FilterEvent {
        const filter = this.getFilter(name);
        if (filter) {
            filter.definition = definition;
        } else {
            this.filters?.push(new Filter(name, definition, additional));
        }
        return this;
    }

    /**
     * Suprime le filtre suivant le nom passé en paramètre
     * @param {string} name Nom du filtre à supprimer
     * @returns {FilterEvent} Instance de l'objet
     */
    public deleteFilter(name: string): FilterEvent {
        this.filters = this.filters?.filter(f => f.name !== name);
        return this;
    }

    /**
     * Supprimer tous les filtres
     * @returns {FilterEvent} Instance de l'objet
     */
    public clearFilters(): FilterEvent {
        this.filters = [];
        return this;
    }

    /**
     * Transforme l'objet en DTO
     * @returns {FilterDto} DTO
     */
    public transformToDTO(): FilterDto {
        return new FilterDto(
            this.paging?.offset,
            this.paging?.range,
            this.sort
                ? [
                      {
                          name: this.sort?.active,
                          descending: this.sort?.direction === 'desc',
                      },
                  ]
                : undefined,
            // Si la définition du filtre est un tableau, on l'envoie sous forme de string
            this.filters
                ? this.filters?.map(filter => {
                      return {
                          name: filter.name,
                          definition: Array.isArray(filter.definition)
                              ? filter.definition.join(',')
                              : filter.definition,
                      };
                  })
                : undefined
        );
    }
}

export class Filter {
    /**
     * Nom du filtre
     */
    name: string;

    /**
     * Définition du filtre (valeur simple ou array)
     */
    definition: unknown;

    /**
     * Filtre additionnel
     */
    additional: boolean;

    constructor(
        name: string,
        definition: unknown,
        additional: boolean = false
    ) {
        this.name = name;
        this.definition = definition;
        this.additional = additional;
    }
}

export interface Order {
    name: string;
    descending: boolean;
}

export class FilterDto {
    firstLineIndex?: number;
    linesCount?: number;
    orders?: Order[];
    filters?: { name: string; definition: unknown }[];

    constructor(
        firstLineIndex?: number,
        linesCount?: number,
        orders?: Order[],
        filters?: { name: string; definition: unknown }[]
    ) {
        this.firstLineIndex = firstLineIndex ?? 0;
        this.linesCount = linesCount ?? MAX_LENGTH_PAGING;
        this.orders = orders ?? [];
        this.filters = filters ?? [];
    }
}
