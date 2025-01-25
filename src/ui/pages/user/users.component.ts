import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UsersListComponent } from '@ui/pages/user/components/users-list.component';

@Component({
    selector: 'app-users',
    imports: [UsersListComponent, TranslateModule],
    templateUrl: './users.component.html',
})
export class UsersComponent {}
