import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthEffects } from './+state/auth/auth.effects';
import { AuthFacade } from './+state/auth/auth.facade';
import * as fromAuth from './+state/auth/auth.reducer';
import { AuthService } from './services';
import { AuthHeaderInterceptor } from './services/auth-header.interceptor';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    AuthFacade,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    }
  ]
})
export class SharedDataAccessAuthModule {}
