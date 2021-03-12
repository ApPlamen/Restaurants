import { Component, Input } from '@angular/core';
import { CustomControl } from '../../services/base/custom-control';

@Component({
  selector: 'tmc-input',
  templateUrl: './input.component.html',
})
export class InputComponent extends CustomControl {
  @Input() type = 'text';
  @Input() label = '';
  @Input() placeholder = '';

  public onBlur(event: Event) {
    this.onTouch(event);
  }
}
