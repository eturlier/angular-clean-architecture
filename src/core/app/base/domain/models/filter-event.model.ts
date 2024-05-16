import { Sort } from '@angular/material/sort';

export class FilterEvent {
    /**
     *  Tri
     */
    sort?: Sort;

    /**
     * Texte de recherche
     */
    searchText?: string;

    constructor(sort?: Sort, searchText?: string) {
        this.sort = sort ?? {
            active: 'id',
            direction: 'desc',
        };
        this.searchText = searchText;
    }
}
