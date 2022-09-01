import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ArticleService } from '../../../shared/service/Article/article-service';
import { Keyword } from '../../../shared/models/keyword';
import { Article } from '../../../shared/models/article';
import { AlertyfyService } from 'src/app/shared/service/alertyfy.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  public articleForm: FormGroup;
  selectedItems = [];
  limitSelection = false;

  constructor(
    private alertyfy: AlertyfyService,
    private fb: FormBuilder,
    private articleService: ArticleService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.createArticleForm();
  }


  onSelectAll(item: any) {
    console.log(item);
  }

  createArticleForm() {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, this.noWhitespace]]
    });
  }


  onSubmit() {
    const fb = this.articleForm.value;
    const _article = new Article();
    _article.title = fb.title;
    this.articleService.saveArticle(_article).subscribe(articleId => {
      this.alertyfy.success('Saved.');
      this._router.navigate(['/article/edit-article', { articleId: articleId }]);

    }, err => {
      this.alertyfy.error(err.error);
    });

  }
  public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').toString().trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

}
