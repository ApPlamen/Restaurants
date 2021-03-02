import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '../../forms/register.form';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: RegisterForm

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new RegisterForm();
  }

  onSubmit(): void {
    if (this.registerForm.formGroup.valid) {
      this.authService.register(this.registerForm.model).subscribe();
    }
  }
}
