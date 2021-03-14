import { Component, OnInit } from '@angular/core';
import { RolesEnum } from '../auth/enums/roles.enum';
import { TokenStorageService } from '../auth/services/token-storage.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }

  public hasAccessRole(accessRoles: string[]): boolean {
    return this.tokenStorageService.hasAccessRole(accessRoles);
  }

  get rolesEnum(): typeof RolesEnum {
    return RolesEnum;
  }

  get isLoggedIn(): boolean {
    return this.tokenStorageService.isUserLoggedIn();
  }
}
