import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UsersListComponent } from '@ui/pages/user/components/users-list.component';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [UsersListComponent, TranslateModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
})
export class UsersComponent {}
