import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'login',
          loadChildren: () =>
            import('@simple-cooking/feature-login').then(
              module => module.FeatureLoginModule
            )
        },
        {
          path: 'dashboard',
          loadChildren: () =>
            import('@simple-cooking/feature-dashboard').then(
              module => module.FeatureDashboardModule
            )
        }
      ],
      { initialNavigation: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
