import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { RestaurantManagementService } from '../../services/restaurant-management.service';

@Component({
  templateUrl: './board-restaurant-management.component.html',
})
export class BoardRestaurantComponent implements OnInit {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;

  public restaurants;

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Name',
      field: 'name',
    },
    {
      header: 'Company',
      field: 'companyName',
    },
  ];

  constructor(private restaurantManagementService: RestaurantManagementService) { }

  ngOnInit(): void {
    this.columns = [
      ...this.columns,
      {
        field: 'id',
        cellTemplate: this.tableActionCellTemplate
      }
    ];

    this.fillProfileForm();
  }

  private fillProfileForm(): void {
    this.restaurantManagementService.getRestaurantBoard()
      .subscribe(restaurants => this.restaurants = restaurants);
  }
}
