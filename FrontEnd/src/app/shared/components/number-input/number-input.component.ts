import { Component, Input } from '@angular/core';
import { CustomControlDirective } from '../../services/base/custom-control.directive';

@Component({
  selector: 'tmc-number-input',
  templateUrl: './number-input.component.html',
})
export class NumberInputComponent extends CustomControlDirective {
  @Input() type = 'number';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() step = 1;
  @Input() min: number;
  @Input() max: number;

  public onBlur(event: Event): void {
    this.onTouch(event);
  }
}
