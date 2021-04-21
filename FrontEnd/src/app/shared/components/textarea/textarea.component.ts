import { Component, Input } from '@angular/core';
import { CustomControlDirective } from '../../services/base/custom-control.directive';

@Component({
  selector: 'tmc-textarea',
  templateUrl: './textarea.component.html',
})
export class TextareaComponent extends CustomControlDirective {
  @Input() height = '150px';
  @Input() label = '';
  @Input() placeholder = '';

  public onBlur(event: Event): void {
    this.onTouch(event);
  }
}
