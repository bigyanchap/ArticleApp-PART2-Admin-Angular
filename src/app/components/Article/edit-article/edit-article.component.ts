import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../shared/service/Article/article-service';
import { Article, ArticleImage } from '../../../shared/models/article';

import { Keyword, KeywordBundle, displayValue } from '../../../shared/models/keyword';
import { AlertyfyService } from 'src/app/shared/service/alertyfy.service';
import { KeywordService } from 'src/app/shared/service/Keyword/keyword.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment, environmentconstants } from 'src/environments/environment';


@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  baseUrlForImage = environmentconstants.baseUrlForFile;
  articleId: any;
  article: Article;
  public articleForm: FormGroup;
  public keywordForm: FormGroup;
  public tagForm: FormGroup;
  files: File[] = [];
  keywords: displayValue[] = []; /*[{value: 1, display: "test1"},{value: 2, display: "test2"}]*/
  seasons = [];
  twentyFourHourTimings = [];
  articleStatuses = [];
  public formData = new FormData();
  baseUrl = environment.apiUrl;
  disableSaveTag = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private alertyfy: AlertyfyService,
    private articleService: ArticleService,
    private keywordService: KeywordService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.createArticleForm();
    this.createKeywordForm();
    this.getArticleStatuses();
    this.getSeasons();
    this.getTwentyFourHourTimings();
    this.route.paramMap.subscribe(params => {
      this.articleId = params.get('articleId');
      this.getArticle(this.articleId);
      this.getTags();
    });
  }

  onSelect(event) {
    this.files=[];
    this.formData = new FormData();
    this.files.push(...event.addedFiles);
    for (let i = 0; i < this.files.length; i++) {
      this.formData.append('files[]', this.files[i]);
    }
    this.onSaveImage(); 
  }
  onSelect_icon(event) {
    console.log("icon Selected!!!");
  }
  onRemove(event) {
    this.formData.delete('files[]');
    this.files.splice(this.files.indexOf(event), 1);
    for (let i = 0; i < this.files.length; i++) {
      this.formData.append('files[]', this.files[i]);
    }
  }
  onSaveImage() {
    this.articleService.saveImage(this.articleId, this.formData)
      .subscribe(res => {
        this.article =res;
      },
        error => {
          this.alertyfy.error(error);
        });
  }

  deleteImage(id, imageName) {
    this.alertyfy.confirmDeletion(imageName, () => {
      this.articleService.deleteImage(id)
      .subscribe(res => {
          this.article=res;
          this.alertyfy.success("Deleted Image, " + imageName);
        },
          error => {
            this.alertyfy.error(error);
          });
    });
  }
  onImageSelectRadio(event, url) {

  }

  //#endregion images

  getArticle(id: number) {
    this.articleService.getArticle(id).subscribe((article: any) => {
      this.articleForm.setValue({
        title: article.title,
        status: article.status,
        description: article.description,
        season: article.season,
        twentyFourHourTiming: article.twentyFourHourTiming,
        shortDescription: article.shortDescription
      });
      this.article=article;
    });
  }

  createArticleForm() {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, this.noWhitespace]],
      status: [''],
      season: [''],
      twentyFourHourTiming: [''],
      description: [''],
      shortDescription: ['', [Validators.required, this.noWhitespace]]
    });
  }

  createKeywordForm() {
    this.keywordForm = this.fb.group({
      myKeywords: ['']
    });
  }

  onSubmit() {
    const fb = this.articleForm.value;
    const _article = new Article();
    _article.id = Number(this.articleId);
    _article.title = fb.title;
    _article.status = Number(fb.status);
    _article.season = Number(fb.season);
    _article.twentyFourHourTiming = Number(fb.twentyFourHourTiming);
    _article.description = fb.description;
    _article.shortDescription = fb.shortDescription;
    this.articleService.saveArticle(_article).subscribe(x => {
      this.alertyfy.success('Article saved successfully.');
    }, err => {
      this.alertyfy.error(err.error);
    });
  }
  getTags() {
    this.keywordService.getKeywords(this.articleId)
      .subscribe(keywords => {
        this.keywords = keywords;
        this.keywordForm.setValue({
          myKeywords: keywords
        })
      },
        error => {
          console.log(error);
        });
  }
  onSaveTag() {
    var keywordBundle: KeywordBundle = { displayValues: this.keywords, articleId: Number(this.articleId) };
    this.keywordService.saveKeywordBundle(keywordBundle)
      .subscribe(res => {
        if (res.success) {
          this.alertyfy.success("Saved Keywords.");
          this.disableSaveTag = true;
        } else {
          this.alertyfy.error("Failed to Save.");
        }
      },
        error => {
          this.alertyfy.error(error);
        });
  }
  onAddKW(event: displayValue) {
    this.keywords.push(event);
    this.disableSaveTag = false;
    console.log(this.keywords);
  }
  onRemoveKW(event: displayValue) {
    this.disableSaveTag = false;
    var toRemoveIndex = this.keywords.map(x => {
      return x.value;
    }).indexOf(event.value);
    this.keywords.splice(toRemoveIndex, 1);
    console.log(this.keywords);
  }

  saveImage() {
    this.articleService.saveImage(this.articleId, this.formData).subscribe(x => {
      this.alertyfy.success('The image of the article saved successfully.')
    }, err => {
      this.alertyfy.error(err.error);
    });
  }

  //#region autocomplete
  public requestKeywords = (text: string) => {
    return this.keywordService.getKeywordsBySubStr({ word: text });
  };
  //#endregion
  private blobify(url) {
    return URL.createObjectURL(url);
  }
  getArticleStatuses() {
    this.articleService.getArticleStatuses()
      .subscribe(res => {
        this.articleStatuses = res;
        console.log(this.articleStatuses);
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
  public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').toString().trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }
}

/*Ref: https://www.npmjs.com/package/ngx-chips*/