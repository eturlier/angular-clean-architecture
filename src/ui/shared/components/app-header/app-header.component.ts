import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './app-header.component.html',
    styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
    /**
     * Chemin du logo à insérer dans le header
     */
    logoUrl = input<string>();

    /**
     * Utilisateur (conditionne aussi l'affichage du menu utilisateur).
     */
    user = input<unknown>();
}
