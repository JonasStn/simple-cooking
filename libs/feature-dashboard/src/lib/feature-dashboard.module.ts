import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedDataAccessAuthModule } from '@simple-cooking/shared/data-access-auth';

import { DashboardPageComponent } from './dashboard-page';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DashboardPageComponent }
    ]),
    SharedDataAccessAuthModule
  ]
})
export class FeatureDashboardModule {}
