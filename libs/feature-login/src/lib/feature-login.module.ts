import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonCustomMaterialModule } from '@simple-cooking/common/custom-material';

import { LoginPageComponent } from './login-page';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    CommonCustomMaterialModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LoginPageComponent }
    ])
  ]
})
export class FeatureLoginModule {}
