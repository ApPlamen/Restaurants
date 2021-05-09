import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tmc-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() label = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() design = 'primary';
  @Input() class: string;
  @Input() iconName: string;

  @Input()
  get isDisabled(): boolean {
    return this._isDisabled;
  }
  set isDisabled(value: boolean) {
    this._isDisabled = '' + value !== 'false';
  }
  @Input()
  get isLoading(): boolean {
    return this._isLoading;
  }
  set isLoading(value: boolean) {
    this._isLoading = '' + value !== 'false';
  }
  @Input()
  get hideLabelOnSmall(): boolean {
    return this._hideLabelOnSmall;
  }
  set hideLabelOnSmall(value: boolean) {
    this._hideLabelOnSmall = '' + value !== 'false';
  }

  @Output() clicked = new EventEmitter<MouseEvent>();

  get hideLabelOnSmallClass(): string {
    return this._hideLabelOnSmall ? 'd-none d-md-block' : '';
  }

  private _isDisabled: boolean;
  private _isLoading: boolean;
  private _hideLabelOnSmall: boolean;

  onButtonClick(event: MouseEvent): void {
    if (!this._isLoading) {
      this.clicked.emit(event);
    }
  }
}
