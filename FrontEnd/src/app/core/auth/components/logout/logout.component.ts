import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  templateUrl: './logout.component.html',
})
export class LogOutComponent implements OnInit {
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.tokenStorageService.signOut();

    this.toastr.success('Success!');

    this.router.navigate(['/login']);
  }
}
