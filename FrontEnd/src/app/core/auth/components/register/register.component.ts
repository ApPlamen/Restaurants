import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterForm } from '../../forms/register.form';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  roles: string[] = [];

  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private toastr: ToastrService,
              public registerForm: RegisterForm) { }

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
