import { Component, OnInit } from '@angular/core';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './board-users-component.component.html',
})
export class BoardUsersComponent implements OnInit {
  public users;

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Email',
      field: 'email',
    },
    {
      header: 'User Name',
      field: 'userName',
    },
    {
      header: 'Fullname',
      field: 'fullname',
    }
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fillProfileForm();
  }

  private fillProfileForm(): void {
    this.userService.getUserBoard()
      .subscribe(users => this.users = users);
  }
}
