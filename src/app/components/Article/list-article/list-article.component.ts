import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../shared/service/Article/article-service';
import { Article } from '../../../shared/models/article';
import { AlertyfyService } from 'src/app/shared/service/alertyfy.service';
import { Router } from '@angular/router';
import { articleQueryObject } from 'src/app/shared/models/queryObject';
import { environment, environmentconstants } from 'src/environments/environment';

@Component({
  selector: 'list-article-route',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  pageSize = environmentconstants.pageSizeMd;
  articles: any;
  statuses = [];
  twentyFourHourTimings = [];
  seasons = [];

  public queryObject = new articleQueryObject();
  columns = [
    { title: 'ID', key: 'Id', isSortable: true },
    { title: 'Title', key: 'Title', isSortable: true },
    { title: 'Status', key: 'Status', isSortable: false },
    { title: 'Description', key: 'Description', isSortable: false },
    { title: 'Action' }
  ];
  constructor(
    private articleService: ArticleService,
    private alertyfyService: AlertyfyService,
    private route: Router
  ) { }

  ngOnInit() {
    this.Reset();
    this.getStatuses();
    this.getSeasons();
    this.getTwentyFourHourTimings();
  }

  getStatuses() {
    this.articleService.getArticleStatuses()
      .subscribe(res => {
        this.statuses = res;
      },
        error => {
          if (error) {
            this.alertyfyService.error(error);
          } else {
            this.alertyfyService.error("No response from Server.");
          }
        });
  }
  getSeasons() {
    this.articleService.getSeasons()
      .subscribe(res => {
        this.seasons = res;
      });
  }
  getTwentyFourHourTimings() {
    this.articleService.getTwentyFourHourTimings()
      .subscribe(res => {
        this.twentyFourHourTimings = res;
      });
  }
  getAllArticle() {
    this.queryObject.status = Number(this.queryObject.status);
    this.queryObject.season = Number(this.queryObject.season);
    this.queryObject.twentyFourHourTiming = Number(this.queryObject.twentyFourHourTiming);
    this.articleService.getAllArticlePaged(this.queryObject)
      .subscribe((response) => {
        this.articles = response.result.items;
        this.queryObject.pageCount = response.result.totalItems;
      },
        error => {
          if (error) {
            this.alertyfyService.error(error);
          } else {
            this.alertyfyService.error("No response from Server.");
          }
        });
  }

  onEdit(id, title) {
    this.route.navigate(['article/edit-article/', { 'articleId': id }])
  }

  //#region pagination and filter
  public getPublishDateRange(value) {
    this.queryObject.publishDate_From = value.startDate;
    this.queryObject.publishDate_To = value.endDate;
    this.queryObject.publishDateEnumSelectedOption = Number(value.selectedOption);
  }
  public Reset() {
    this.queryObject.page = 1;
    this.queryObject.pageSize = this.pageSize;
    this.queryObject.status = -1;
    this.queryObject.isSortAsc = true;
    this.queryObject.sortBy = '';
    this.queryObject.searchString = '';
    this.queryObject.publishDateEnumSelectedOption = 0;
    this.queryObject.publishDate_From = new Date(0);
    this.queryObject.publishDate_To = new Date(0);
    this.queryObject.season = -1;
    this.queryObject.twentyFourHourTiming = -1;
    this.getAllArticle();
  }
  public Search() {
    this.getAllArticle();
  }

  public sortBy(columnName) {
    if (this.queryObject.sortBy === columnName) {
      this.queryObject.isSortAsc = !this.queryObject.isSortAsc;
    } else {
      this.queryObject.sortBy = columnName;
      this.queryObject.isSortAsc = true;
    }
    this.getAllArticle();
  }
  public onPageChange(page) {
    this.queryObject.page = page;
    this.getAllArticle();
  }
  public changePageSize(event) {
    this.queryObject.pageSize = Number(event.target.value);
    this.getAllArticle();
  }
  //#endregion pagination and filter
}
