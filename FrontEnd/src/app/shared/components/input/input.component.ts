import { Component, Input } from '@angular/core';
import { CustomControlDirective } from '../../services/base/custom-control.directive';

@Component({
  selector: 'tmc-input',
  templateUrl: './input.component.html',
})
export class InputComponent extends CustomControlDirective {
  @Input() type = 'text';
  @Input() label = '';
  @Input() placeholder = '';

  public onBlur(event: Event): void {
    this.onTouch(event);
  }
}
