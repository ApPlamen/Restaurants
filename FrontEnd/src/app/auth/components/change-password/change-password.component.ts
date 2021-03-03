import { Component, OnInit } from '@angular/core';
import { ChangePasswordForm } from '../../forms/change-password.form';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: ChangePasswordForm

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.changePasswordForm = new ChangePasswordForm();
  }

  onSubmit(): void {
    if (this.changePasswordForm.formGroup.valid) {
      this.userService.changePasswordUser(this.changePasswordForm.model).subscribe();
    }
  }
}
