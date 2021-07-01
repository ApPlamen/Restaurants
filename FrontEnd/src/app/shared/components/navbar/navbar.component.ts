import { Component } from '@angular/core';
import { RolesFilteringBaseClass } from '../../base-classes/roles-filtering.class';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent extends RolesFilteringBaseClass {
  constructor(protected tokenStorageService: TokenStorageService) {
    super(tokenStorageService);
  }
}
