import { MAX_LENGTH_PAGING } from '@utils/constants';

export class UiPaging {
    /**
     * Numéro de la première ligne ou page (0 par default)
     */
    offset: number;

    /**
     * Nombre d'éléments chargé ou nombre d'éléments par page (MAX_LENGTH_PAGING par default)
     */
    range: number;

    /**
     * Nombre d'éléments total
     */
    count: number;

    /**
     * Permet de savoir si on est en pagination lazyloadé
     */
    lazyLoading: boolean;

    constructor(
        lazyLoading = true,
        offset = 0,
        range = MAX_LENGTH_PAGING,
        count = 0
    ) {
        this.offset = offset;
        this.range = range;
        this.count = count;
        this.lazyLoading = lazyLoading;
    }
}
