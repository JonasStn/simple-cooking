import { Routes } from '@angular/router';
import { AuthGuard } from '@simple-cooking/shared/data-access-auth';

export const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'app/dashboard'
      },
      {
        path: 'login',
        loadChildren: () =>
          import('@simple-cooking/feature-login').then(
            module => module.FeatureLoginModule
          )
      },
      {
        path: 'app',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'dashboard',
            loadChildren: () =>
              import('@simple-cooking/feature-dashboard').then(
                module => module.FeatureDashboardModule
              )
          }
        ]
      }
];
