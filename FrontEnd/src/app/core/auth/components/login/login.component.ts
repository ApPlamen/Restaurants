import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ButtonDesign } from 'src/app/shared/components/button/button-design.model';
import { LogInForm } from '../../forms/login.form';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  templateUrl: './login.component.html',
})
export class LogInComponent implements OnInit {
  logInForm: LogInForm
  roles: string[] = [];

  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private toastr: ToastrService) { }

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

          this.toastr.success("Success!");

          this.router.navigate(['/home']);
        },
      );
    }
  }

  get isLoggedIn() {
    return this.tokenStorageService.isUserLoggedIn();
  }
}
