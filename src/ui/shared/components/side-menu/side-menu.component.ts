import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UiItem } from '@ui/shared/models/ui-item.model';
import menuData from '@config/menu.json';

@Component({
    selector: 'app-side-menu',
    standalone: true,
    imports: [CommonModule, TranslateModule, RouterModule],
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
    /**
     * Liste des items du menu
     */
    public menu: UiItem[] = menuData;

    /**
     * Injection du router
     */
    private router: Router = inject(Router);

    /**
     * Action au click sur un item
     * Si il y a un chemin, on fait appel à l'envoi d'évènement 'opened'
     * @param {UiItem} item item du menu sur lequel on a cliqué
     */
    public clickOnItem(item: UiItem): void {
        if (item.path) {
            this.router.navigate([item.path]);
        }
    }

    /**
     * Gestion du keyup sur un item du menu
     * @param {KeyboardEvent} event - L'évènement keyup
     * @param {UiItem} item - L'item sur lequel on a cliqué
     */
    public handleKeyUp(event: KeyboardEvent, item: UiItem): void {
        if (event.key === 'Enter') {
            this.clickOnItem(item);
        }
    }

    /**
     * Vérifie si un item est actif
     * @param {UiItem} item - L'item sur lequel on a cliqué
     * @returns {boolean} - Vrai si l'item est actif, faux sinon
     */
    public isActive(item: UiItem): boolean {
        if (item.path) {
            return this.router.url.includes(item.path);
        } else {
            return false;
        }
    }
}
