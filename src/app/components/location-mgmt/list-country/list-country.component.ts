import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertyfyService } from 'src/app/shared/service/alertyfy.service';
import { QueryObject } from '../../../shared/models/queryObject';
import { SpinnerManagerService } from 'src/app/shared/service/widget/spinnerManager.service';
import { Country } from 'src/app/shared/models/location';
import { CountryService } from 'src/app/shared/service/location/country.service';
import { environmentconstants } from 'src/environments/environment';

@Component({
  selector: 'app-list-country',
  templateUrl: './list-country.component.html',
  styleUrls: ['./list-country.component.scss']
})

export class ListCountryComponent implements OnInit {
  pageSize=environmentconstants.pageSizeMd;
  public country = [];
  public countryList: Country[] = [];
  public countryItem: any = [];
  noDataFound: string;
  queryObject = new QueryObject();

  columns = [
    { title: 'Name', key: 'Name', isSortable: true },
    { title: 'Country Code', key: 'code', isSortable: true },
    { title: 'Action' }
  ];


  constructor(
    private countryService: CountryService,
    private _router: Router,
    private alertyfy: AlertyfyService,
    private spinningManager: SpinnerManagerService
  ) 
  {
    this.spinningManager.showSpinner("Loading...");
  }

  ngOnInit() {
    this.queryObject.page = 1;
    this.queryObject.pageSize = 3;
    this.Reset();
  }

  
 
  loadCountry() {
    this.countryService.getCountry(this.queryObject).subscribe((res: any) => {
      this.countryList = [];
      this.queryObject.pageCount = res.totalItems;
      this.spinningManager.hideSpinner();
      console.log(res);
      for (const item of res.items) {
        const countryItem = new Country();
        countryItem.id = item.id;
        countryItem.name = item.name;
        countryItem.code = item.code;
        this.countryList.push(countryItem);
      }
    }, error => {
      this.noDataFound = error;
      this.spinningManager.hideSpinner();
    })
  }

  
  onAddNewButtonClick() {
    this._router.navigateByUrl('/location-mgmt/upsert-country')
  }

  onDeleteConfirm(id) {
    this.alertyfy.confirm(
      "Are you sure you want to delete?",
      () => {
        this.countryService.deleteCountry(id)
          .subscribe(res => {
            this.alertyfy.success("Deleted Successfully.");
            this.loadCountry();
          },
            (error) => {
              this.alertyfy.error("Something went wrong. Delete Failed.");
            })

      });
  }
  onCreateConfirm(event) {
    this._router.navigateByUrl('/location-mgmt/upsert-country');
  }
  onEdit(id) {
    this._router.navigate(['location-mgmt/upsert-country/', { 'id': id }])
  }

  public Reset() {
    this.queryObject.page = 1;
    this.queryObject.pageSize = this.pageSize;
    this.queryObject.isSortAsc = true;
    this.queryObject.sortBy = '';
    this.queryObject.searchString = '';
    this.loadCountry();
  }
  public Search() {
    this.loadCountry();
  }
  sortBy(columnName) {
    if (this.queryObject.sortBy === columnName) {
      this.queryObject.isSortAsc = !this.queryObject.isSortAsc;
    } else {
      this.queryObject.sortBy = columnName;
      this.queryObject.isSortAsc = true;
    }
    this.loadCountry();
  }

  onPageChange(page) {
    this.queryObject.page = page;
    this.loadCountry();
  }
  public changePageSize(event) {
    this.queryObject.pageSize = Number(event.target.value);
    this.loadCountry();
  }
  
}
