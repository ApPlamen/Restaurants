import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { CompanyService } from '../../services/company.service';

@Component({
  templateUrl: './board-company.component.html',
})
export class BoardCompanyComponent implements OnInit {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;

  public companies;

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Name',
      field: 'name',
    },
  ];

  constructor(private companyService: CompanyService) { }

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
    this.companyService.getCompanyBoard()
      .subscribe(companies => this.companies = companies);
  }
}
