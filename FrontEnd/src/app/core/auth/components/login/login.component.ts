import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { LogInForm } from '../../forms/login.form';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
})
export class LogInComponent implements OnInit {
  roles: string[] = [];
  logInForm: LogInForm = new LogInForm();

  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.roles = this.tokenStorageService.getUser().roles;
    }
  }

  onSubmit(): void {
    if (this.logInForm.formGroup.valid) {
      this.authService.login(this.logInForm.model).subscribe(
        data => {
          this.tokenStorageService.saveToken(data.accessToken);
          this.tokenStorageService.saveUser(data);

          this.toastr.success('Success!');

          this.router.navigate(['/home']);
        },
      );
    }
  }

  get isLoggedIn(): boolean {
    return this.tokenStorageService.isUserLoggedIn();
  }
}
