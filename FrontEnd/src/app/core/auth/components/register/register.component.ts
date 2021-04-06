import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { RegisterForm } from '../../forms/register.form';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  roles: string[] = [];
  registerForm: RegisterForm = new RegisterForm();

  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.roles = this.tokenStorageService.getUser().roles;
    } else {
      this.registerForm = new RegisterForm();
    }
  }

  onSubmit(): void {
    if (this.registerForm.formGroup.valid) {
      this.authService.register(this.registerForm.model)
        .subscribe(_ => {
          this.toastr.success('Success!');

          this.router.navigate(['/login']);
        });
    }
  }

  get isLoggedIn(): boolean {
    return this.tokenStorageService.isUserLoggedIn();
  }
}
