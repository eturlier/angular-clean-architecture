import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { Notification } from '@core/notification/domain/models/notification.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-snackbar',
    standalone: true,
    imports: [CommonModule, TranslateModule, MatButtonModule],
    template: `
        <h4>{{ 'NOTIFICATION.' + data.type | translate }}</h4>
        <p [innerHTML]="data.messageKeyTrad | translate"></p>
        <button
            mat-icon-button
            aria-label="close"
            (click)="snackBar.dismiss()"
            class="close-icon mgc_close_line"
        ></button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: Notification,
        public snackBar: MatSnackBar
    ) {}
}
