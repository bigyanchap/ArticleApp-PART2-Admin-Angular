import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertyfyService } from 'src/app/shared/service/alertyfy.service';
import { QueryObject } from '../../../shared/models/queryObject';
import { SpinnerManagerService } from 'src/app/shared/service/widget/spinnerManager.service';
import { category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { environmentconstants } from 'src/environments/environment';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html'
})

export class ListCategoryComponent implements OnInit {
  baseUrlForImage=environmentconstants.baseUrlForFile;
  pageSize = environmentconstants.pageSizeMd;
  public category = [];
  public categories: category[] = [];
  public categoryItem: any = [];
  noDataFound: string;
  queryObject = new QueryObject();

  columns = [
    { title: 'ID', key: 'id', isSortable: false },
    { title: 'Name', key: 'name', isSortable: true },
    { title: 'Description', key: 'description', isSortable: true },
    { title: 'Status', key: 'statusId'},
    { title: 'Image', key: 'imagePath'},
    { title: 'Action' }
  ];


  constructor(
    private categoryService: CategoryService,
    private _router: Router,
    private alertyfy: AlertyfyService,
    private spinningManager: SpinnerManagerService
  ) {
    this.spinningManager.showSpinner("Loading...");
  }

  ngOnInit() {
    this.loadCategory();
  }

  loadCategory() {
    this.categoryService.getAllCategories()
      .subscribe((res: any) => {
        this.categories =res;
        this.spinningManager.hideSpinner();
      },
        error => {
          this.noDataFound = error;
          this.spinningManager.hideSpinner();
        });
  }


  onAddNewButtonClick() {
    this._router.navigateByUrl('/category/create-category');
  }

  onDeleteConfirm(id) {
    this.alertyfy.confirm(
      "Are you sure you want to delete?",
      () => {
        this.categoryService.deleteCategory(id)
          .subscribe(res => {
            if(res.success){
              this.alertyfy.success("Deleted Successfully.");
              this.loadCategory();
            }
          },
            (error) => {
              this.alertyfy.error("Something went wrong. Delete Failed.");
            })
      });
  }
  onCreateConfirm(event) {
    this._router.navigateByUrl('/category/create-category');
  }
  onEdit(id) {
    this._router.navigate(['category/upsert-category/', { 'id': id }])
  }

  
  sortBy(columnName) {
    if (this.queryObject.sortBy === columnName) {
      this.queryObject.isSortAsc = !this.queryObject.isSortAsc;
    } else {
      this.queryObject.sortBy = columnName;
      this.queryObject.isSortAsc = true;
    }
    this.loadCategory();
  }

  onPageChange(page) {
    this.queryObject.page = page;
    this.loadCategory();
  }
  public changePageSize(event) {
    this.queryObject.pageSize = Number(event.target.value);
    this.loadCategory();
  }

}
