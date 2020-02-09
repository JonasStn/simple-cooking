import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardPageComponent } from './dashboard-page';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DashboardPageComponent }
    ])
  ]
})
export class FeatureDashboardModule {}
