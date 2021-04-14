import { RolesEnum } from 'src/app/core/auth/enums/roles.enum';
import { TokenStorageService } from '../services/token-storage.service';

export class RolesFilteringBaseClass {
  protected tokenStorageService: TokenStorageService;

  constructor(tokenStorageService: TokenStorageService) {
    this.tokenStorageService = tokenStorageService;
  }

  public hasAccessRole(accessRoles: string[]): boolean {
    return this.tokenStorageService.hasAccessRole(accessRoles);
  }

  public get rolesEnum(): typeof RolesEnum {
    return RolesEnum;
  }

  public get isLoggedIn(): boolean {
    return this.tokenStorageService.isUserLoggedIn();
  }
}
