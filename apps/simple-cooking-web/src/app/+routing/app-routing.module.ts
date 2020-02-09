import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@simple-cooking/shared/data-access-auth';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
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
      ],
      { initialNavigation: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
