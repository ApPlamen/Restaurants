import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordForm } from '../../forms/change-password.form';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  constructor(private userService: UserService,
              private toastr: ToastrService,
              public changePasswordForm: ChangePasswordForm) { }

  onSubmit(): void {
    if (this.changePasswordForm.formGroup.valid) {
      this.userService.changePasswordUser(this.changePasswordForm.model)
        .subscribe(_ => {
          this.changePasswordForm.clear();

          this.toastr.success('Success!');
        });
    }
  }
}
