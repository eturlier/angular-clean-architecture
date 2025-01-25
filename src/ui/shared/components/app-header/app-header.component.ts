import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';

@Component({
    selector: 'app-app-header',
    imports: [CommonModule],
    templateUrl: './app-header.component.html',
    styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
    /**
     * Chemin du logo à insérer dans le header
     */
    public logoUrl: InputSignal<string | undefined> = input<string>();
}
