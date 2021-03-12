import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "./components/input/input.component";


@NgModule({
  declarations: [
    InputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    InputComponent,
  ],
})
export class SharedModule {}
