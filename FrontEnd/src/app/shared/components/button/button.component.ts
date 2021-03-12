import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonDesign } from './button-design.model';

@Component({
  selector: 'tmc-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() label = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() design = ButtonDesign.Primary;
  @Input() iconName: string;
  @Input() isDisabled = false;
  @Input() isLoading = false;

  @Output() clicked = new EventEmitter<MouseEvent>();

  onButtonClick(event: MouseEvent) {
    if (!this.isLoading) {
      this.clicked.emit(event);
    }
  }
}
