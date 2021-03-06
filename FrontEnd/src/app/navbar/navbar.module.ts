import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    AuthModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [],
})
export class NavbarModule { }
