import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { JoinOrderForm } from '../../forms/join-order.form';
import { NewOrderForm } from '../../forms/new-order.form';
import { OrderService } from '../../services/order.service';

@Component({
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  newOrderForm: NewOrderForm = new NewOrderForm();
  joinOrderForm: JoinOrderForm = new JoinOrderForm();

  activeOrderId: string;

  constructor(private orderService: OrderService,
              protected tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getActiceOrder();
  }

  startNewOrder(): void {
    if (this.newOrderForm.formGroup.valid) {
      this.orderService.startOrder(this.newOrderForm.model)
        .subscribe(activeOrderId => this.activeOrderId = activeOrderId.code);
    }
  }

  joinOrder(): void {
    if (this.joinOrderForm.formGroup.valid) {
      this.orderService.joinOrder(this.joinOrderForm.model)
        .subscribe(_ => this.activeOrderId = this.joinOrderForm.model.code);
    }
  }

  getActiceOrder(): void {
    this.orderService.getActiceOrder()
      .subscribe(activeOrderId => this.activeOrderId = activeOrderId.code);
  }

  get hasActiveOrder(): boolean {
    return this.activeOrderId != null;
  }
}
