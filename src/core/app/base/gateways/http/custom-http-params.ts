import { HttpParams } from '@angular/common/http';

export class CustomHttpParams {
    private httpParams: HttpParams = new HttpParams();

    /**
     * Le constructeur prend optionnellement un nom et un valeur pour une définition directe d'un paramètre.
     */
    constructor(name?: string, value?: string | number | boolean) {
        if (name != null) {
            this.httpParams = this.httpParams.set(name, <string>value);
        }
    }

    /**
     * Ajoute un paramètre en utilisant toString. Le name et la valeur doivent exister.
     * @param name Nom du paramètre
     * @param value Valeur du paramètre (format string, number ou boolean, pour les dates, utiliser les fonctions correspondantes)
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

    public getParams(): HttpParams {
        return this.httpParams;
    }
}
