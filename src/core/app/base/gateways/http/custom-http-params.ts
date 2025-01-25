import { HttpParams } from '@angular/common/http';

export class CustomHttpParams {
    private httpParams: HttpParams = new HttpParams();

    /**
     * Le constructeur prend optionnellement un nom et un valeur pour une définition directe d'un paramètre.
     * @param {string} name Nom du paramètre
     * @param {string | number | boolean} value  Valeur du paramètre
     */
    constructor(name?: string, value?: string | number | boolean) {
        if (name != null) {
            this.httpParams = this.httpParams.set(name, <string>value);
        }
    }

    /**
     * Ajoute un paramètre en utilisant toString. Le name et la valeur doivent exister.
     * @param {string} name Nom du paramètre
     * @param {string | number | boolean} value Valeur du paramètre (format string, number ou boolean, pour les dates, utiliser les fonctions correspondantes)
     */
    public setValue(
        name: string,
        value: string | number | boolean
    ): CustomHttpParams {
        if (value != null && name !== undefined) {
            this.httpParams = this.httpParams.append(name, <string>value);
        }
        return this;
    }

    /**
     * Permets d'ajouter un paramètre de type array de string ou de number
     * @param {string} name Nom du paramètre
     * @param {unknown[]} value Valeur du paramètre
     */
    public setStringArrayValue(
        name: string,
        value: unknown[]
    ): CustomHttpParams {
        if (value !== null && name !== undefined) {
            this.httpParams = this.httpParams.append(
                name,
                JSON.stringify(value)
            );
        }
        return this;
    }

    /**
     * Récupère les paramètres HTTP
     * @returns {HttpParams}
     */
    public getParams(): HttpParams {
        return this.httpParams;
    }
}
