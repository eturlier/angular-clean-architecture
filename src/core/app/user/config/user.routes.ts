import { Routes } from '@angular/router';
import { UsersComponent } from '@ui/pages/user/users.component';

/**
 * Routes commençant par le path user
 */
export const user_routes: Routes = [
    {
        path: '',
        component: UsersComponent,
    },
];
