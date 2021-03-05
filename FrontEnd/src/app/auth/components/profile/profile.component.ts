import { Component, OnInit } from '@angular/core';
import { ProfileForm } from '../../forms/profile.form';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profileForm: ProfileForm

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.profileForm = new ProfileForm();

    this.userService.getUserProfile()
      .subscribe(profile => this.profileForm.setModel(profile));
  }

  onSubmit(): void {
    if (this.profileForm.formGroup.valid) {
      this.userService.saveUserProfile(this.profileForm.model).subscribe();
    }
  }
}
