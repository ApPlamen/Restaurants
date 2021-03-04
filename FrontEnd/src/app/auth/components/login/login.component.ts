import { Component, OnInit } from '@angular/core';
import { LogInForm } from '../../forms/login.form';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  templateUrl: './login.component.html',
})
export class LogInComponent implements OnInit {
  logInForm: LogInForm
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.roles = this.tokenStorageService.getUser().roles;
    } else {
      this.logInForm = new LogInForm();
    }
  }

  onSubmit(): void {
    if (this.logInForm.formGroup.valid) {
      this.authService.login(this.logInForm.model).subscribe(
        data => {
          this.tokenStorageService.saveToken(data.accessToken);
          this.tokenStorageService.saveUser(data);
          
          this.roles = this.tokenStorageService.getUserRoles();
          this.reloadPage();
        },
      );
    }
  }

  get isLoggedIn() {
    return this.tokenStorageService.isUserLoggedIn();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
