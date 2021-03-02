import { Component, OnInit } from '@angular/core';
import { LogInForm } from '../../forms/login.form';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  templateUrl: './login.component.html',
})
export class LogInComponent implements OnInit {
  logInForm: LogInForm
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    } else {
      this.logInForm = new LogInForm();
    }
  }

  onSubmit(): void {
    if (this.logInForm.formGroup.valid) {
      this.authService.login(this.logInForm.model).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.reloadPage();
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
