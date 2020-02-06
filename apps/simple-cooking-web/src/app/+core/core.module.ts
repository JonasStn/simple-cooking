import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppStateModule } from './app-state.module';

@NgModule({
  imports: [HttpClientModule, AppStateModule]
})
export class CoreModule {}
