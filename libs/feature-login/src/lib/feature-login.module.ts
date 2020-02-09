import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {
  CommonCustomMaterialModule,
} from '@simple-cooking/common/custom-material';
import {
  SharedDataAccessAuthModule,
} from '@simple-cooking/shared/data-access-auth';

import { LoginPageComponent } from './login-page';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    CommonCustomMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LoginPageComponent }
    ]),
    SharedDataAccessAuthModule
  ]
})
export class FeatureLoginModule {}
