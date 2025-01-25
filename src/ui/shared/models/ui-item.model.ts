export class UiItem {
    /**
     * Nom de l'item
     */
    name?: string;
    /**
     * Code de traduction de l'item
     */
    code_trad_label?: string;
    /**
     * Code de l'icone
     */
    icon?: string;
    /**
     * Chemin sur le clic, si chemin il y a
     */
    path?: string;

    constructor(item: object) {
        Object.assign(this, { ...item });
    }
}
