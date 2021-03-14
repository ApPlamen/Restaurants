import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';


@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    InputComponent,
    ButtonComponent,
  ],
})
export class SharedModule {}
