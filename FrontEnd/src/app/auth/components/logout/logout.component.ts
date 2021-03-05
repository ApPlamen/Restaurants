import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  templateUrl: './logout.component.html',
})
export class LogOutComponent implements OnInit {
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.tokenStorageService.signOut();

    this.router.navigate(['/login']);
  }
}
