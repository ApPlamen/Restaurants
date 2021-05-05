import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { JoinOrderForm } from '../../forms/join-order.form';
import { NewOrderForm } from '../../forms/new-order.form';

@Component({
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  newOrderForm: NewOrderForm = new NewOrderForm();
  joinOrderForm: JoinOrderForm = new JoinOrderForm();

  activeOrderId: string;

  constructor(protected tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
  }

  startNewOrder(): void {
    if (this.newOrderForm.formGroup.valid) {
    }
  }

  joinOrder(): void {
    if (this.joinOrderForm.formGroup.valid) {
    }
  }

  get hasActiveOrder(): boolean {
    return this.activeOrderId != null;
  }
}
