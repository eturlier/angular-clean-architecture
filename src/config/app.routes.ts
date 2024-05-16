import { Routes } from '@angular/router';
import { HomeComponent } from '@ui/pages/home/home.component';

/**
 * [ATTENTION !!!!] Ne pas modifier le nom de la constante du code ci-dessus.
 * Il est utilisé par la schematics de création de nopuvelle feature dans le core afin d'importer les constante de routes.
 */
const featuresRoutes: Routes = [
    {
        path: 'user',
        loadChildren: () =>
            import('@core/user/config/user.routes').then(r => r.user_routes),
    },
    {
        path: 'user',
        loadChildren: () =>
            import('@core/user/config/user.routes').then(r => r.user_routes),
    },
];

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    ...featuresRoutes,
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];
