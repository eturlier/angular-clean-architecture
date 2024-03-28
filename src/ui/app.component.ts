import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import menuData from '@config/menu.json';
import { AppHeaderComponent } from '@ui/shared/components/app-header/app-header.component';
import { SideMenuComponent } from '@ui/shared/components/side-menu/side-menu.component';
import { UiItem } from '@ui/shared/models/ui-item.model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        // Modules
        RouterOutlet,
        RouterModule,
        MatSidenavModule,
        // Components
        SideMenuComponent,
        AppHeaderComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    public title = 'Angular Clean Architecture';
    public menu: UiItem[] = menuData as UiItem[];
}
