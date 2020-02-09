import { Component } from '@angular/core';

@Component({
  selector: 'simple-cooking-root',
  template: `
    <section class="mat-typography">
      <router-outlet></router-outlet>
    </section>
  `
})
export class AppComponent {}
