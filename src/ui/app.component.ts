import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RouterModule, RouterOutlet } from '@angular/router';
import menuData from '@config/menu.json';
import { Notification } from '@core/notification/domain/models/notification.model';
import { NotificationHandler } from '@core/notification/use-cases/notification.handler';
import { AppHeaderComponent } from '@ui/shared/components/app-header/app-header.component';
import { SideMenuComponent } from '@ui/shared/components/side-menu/side-menu.component';
import { UiItem } from '@ui/shared/models/ui-item.model';
import { SnackbarComponent } from '@ui/shared/snackbar/snackbar.component';
import { NOTIFICATION_DURATION } from '@utils/constants';

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
    private notificationService: NotificationHandler =
        inject(NotificationHandler);

    constructor(private snackBar$: MatSnackBar) {
        this.notificationService.notifications$.subscribe(
            (notifications: Notification[]) => {
                if (notifications) {
                    notifications.forEach((notification: Notification) => {
                        const config: MatSnackBarConfig = {
                            duration:
                                notification?.duration ?? NOTIFICATION_DURATION,
                            panelClass: [
                                'notification',
                                `notification-${notification?.type}`,
                            ],
                            horizontalPosition: 'right',
                            verticalPosition: 'top',
                            data: notification,
                        };
                        this.snackBar$.openFromComponent(
                            SnackbarComponent,
                            config
                        );
                    });
                }
            }
        );
    }
}
