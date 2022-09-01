import { Component, OnInit } from '@angular/core';
import { KeywordService } from '../../../shared/service/Keyword/keyword.service';
import { Router } from '@angular/router';
import { AlertyfyService } from 'src/app/shared/service/alertyfy.service';
import {  QueryObject } from 'src/app/shared/models/queryObject';
import { environment, environmentconstants } from 'src/environments/environment';

@Component({
  selector: 'app-list-keyword',
  templateUrl: './list-keyword.component.html',
  styleUrls: ['./list-keyword.component.css']
})
export class ListKeywordComponent implements OnInit {

  pageSize = environmentconstants.pageSizeMd;
  keywords = [];
  public queryObject = new QueryObject();
  columns = [
    { title: 'ID', key: 'Id', isSortable: true },
    { title: 'Name', key: 'Name', isSortable: true },
    { title: 'Description', key: 'Description', isSortable: false },
    { title: 'Action' }
  ];

  constructor(
    private keywordSerivce: KeywordService,
    private _router: Router,
    private alertify: AlertyfyService
  ) { }

  ngOnInit() {
    this.Reset();
  }
  getAllKeywords() {
    this.keywordSerivce.getAllKeyword(this.queryObject)
      .subscribe(data => {
        this.keywords = data.result.items;
        this.queryObject.pageCount = data.result.totalItems;
      },
        error => {
          this.alertify.error(error);
        });
  }

  onDelete(id, index, name) {
    this.alertify.confirmRemove(name,
      () => {
        this.keywordSerivce.deleteKeywordById(id)
          .subscribe(res => {
            if (res.success) {
              this.keywords.splice(index, 1);
              this.alertify.success("Deleted Successfully");
            } else {
              this.alertify.error("Deleted from Database. Something went wrong on view.");
            }
          },
            error => {
              this.alertify.error(error);
            });
      })
  }
  onEdit(id) {
    this._router.navigate(['/keyword/edit-keyword/', { keywordId: id }]);
  }
  addKeyword() {

  }
  //#region pagination and filter
  public Reset() {
    this.queryObject.page = 1;
    this.queryObject.pageSize = this.pageSize;
    this.queryObject.isSortAsc = true;
    this.queryObject.sortBy = '';
    this.queryObject.searchString = '';
    this.getAllKeywords();
  }
  public Search() {
    this.getAllKeywords();
  }

  public sortBy(columnName) {
    if (this.queryObject.sortBy === columnName) {
      this.queryObject.isSortAsc = !this.queryObject.isSortAsc;
    } else {
      this.queryObject.sortBy = columnName;
      this.queryObject.isSortAsc = true;
    }
    this.getAllKeywords();
  }
  public onPageChange(page) {
    this.queryObject.page = page;
    this.getAllKeywords();
  }
  public changePageSize(event) {
    this.queryObject.pageSize = Number(event.target.value);
    this.getAllKeywords();
  }
  //#endregion pagination and filter
}
