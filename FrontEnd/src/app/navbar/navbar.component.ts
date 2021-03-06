import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/services/token-storage.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }

  get isLoggedIn() {
    return this.tokenStorageService.isUserLoggedIn();
  }
}
