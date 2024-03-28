import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UiItem } from '@ui/shared/models/ui-item.model';

/**
 * Description: Composant de menu latéral
 * [TODO]
 * Lors de la navigation vers une page du menu, mettre à jour l'url active (afin de mettre à jour l'item actif)
 */
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
    menu = input.required<UiItem[]>();

    constructor(private router: Router) {}

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

    public handleKeyUp(event: KeyboardEvent, item: UiItem): void {
        if (event.key === 'Enter') {
            this.clickOnItem(item);
        }
    }

    public isActive(item: UiItem): boolean {
        if (item.path) {
            return this.router.url.includes(item.path);
        } else {
            return false;
        }
    }
}
