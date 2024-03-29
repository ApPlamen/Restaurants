import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileForm } from '../../forms/profile.form';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profileForm: ProfileForm = new ProfileForm();

  constructor(private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fillForm();
  }

  onSubmit(): void {
    if (this.profileForm.formGroup.valid) {
      this.userService.saveUserProfile(this.profileForm.model)
        .subscribe(_ => {
          this.fillForm();

          this.toastr.success('Success!');
        });
    }
  }

  private fillForm(): void {
    this.userService.getUserProfile()
      .subscribe(profile => this.profileForm.setModel(profile));
  }
}
