import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'simple-cooking-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  loginLoading = false;
}
