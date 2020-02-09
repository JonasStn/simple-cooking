import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer } from '@angular/platform-browser';


@NgModule({
  imports: [MatIconModule, MatButtonModule,MatFormFieldModule, MatInputModule, MatCardModule],
  exports: [MatIconModule, MatButtonModule,MatFormFieldModule, MatInputModule, MatCardModule]
})
export class CommonCustomMaterialModule {
  constructor(
    iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'google-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
      )
    );
  }
}
