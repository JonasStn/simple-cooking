import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthFacade,
  AuthService
} from '@simple-cooking/shared/data-access-auth';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'simple-cooking-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(
    private authFacade: AuthFacade,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /**
     * calling url api/auth/google in login-form causes google-login flow to kick in
     * when property loginSucess is true login flow was successfully
     */

    this.authFacade.loginSuccess$.pipe(filter(success => success)).subscribe({
      next: () => {
        this.authFacade.loadUser();
        this.router.navigate([this.authService.getRedirectUrl() || '/']);
      }
    });
  }
}
