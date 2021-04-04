import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RestaurantForm } from '../../forms/restaurant.form';
import { RestaurantManagementService } from '../../services/restaurant-management.service';
import { RestaurantStoreService } from '../../store/restaurantStore.service';

@Component({
  templateUrl: './create-edit-restaurant.component.html',
})
export class CreateEditRestaurantComponent implements OnInit, OnDestroy {
  isNew = true;

  constructor(private restaurantService: RestaurantManagementService,
              private restaurantStoreService: RestaurantStoreService,
              private activeModalService: NgbActiveModal,
              private toastr: ToastrService,
              public restaurantForm: RestaurantForm) { }

  ngOnInit(): void {
    this.restaurantStoreService.getRestaurantId$.subscribe(
      restaurantId => {
        if ( restaurantId ) {
          this.isNew = false;
          this.restaurantService.getRestaurant(restaurantId).subscribe( restaurant => this.restaurantForm.setModel(restaurant) );
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.restaurantForm.clear();
  }

  onSubmit(): void {
    if (this.restaurantForm.formGroup.valid) {
      this.restaurantService.saveRestaurant(this.restaurantForm.model)
        .subscribe(_ => {
          this.toastr.success('Success!');
          this.activeModalService.close();
        });
    }
  }
}
