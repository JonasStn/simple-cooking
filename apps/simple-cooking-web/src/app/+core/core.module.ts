import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthFacade } from '@simple-cooking/shared/data-access-auth';

import { AppStateModule } from './app-state.module';

const appInitializer = (authFacade: AuthFacade) => {
  return () => {
    authFacade.loadUser();
  };
};
@NgModule({
  imports: [HttpClientModule, AppStateModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [AuthFacade],
      multi: true
    }
  ]
})
export class CoreModule {}
