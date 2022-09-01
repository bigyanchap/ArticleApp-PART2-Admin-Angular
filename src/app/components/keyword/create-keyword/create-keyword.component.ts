import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KeywordService } from 'src/app/shared/service/Keyword/keyword.service';
import { AlertyfyService } from 'src/app/shared/service/alertyfy.service';
import { Keyword } from 'src/app/shared/models/keyword';

@Component({
  selector: 'app-create-keyword',
  templateUrl: './create-keyword.component.html',
  styleUrls: ['./create-keyword.component.css']
})
export class CreateKeywordComponent implements OnInit {
  public keywordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private keywordSerivce: KeywordService,
    private _router: Router,
    private alertyfy: AlertyfyService
  ) {
  }

  ngOnInit() {
    this.createKeywordForm();
  }

  createKeywordForm() {
    this.keywordForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), this.noWhitespace]],
      description: ['']
    });
  }

  public onSubmit() {
    var formValue = (this.keywordForm.value);
    this.keywordSerivce.upsertKeyword(formValue)
      .subscribe(keywordId => {
        this.alertyfy.success("Saved.")
        this._router.navigate(['/keyword/edit-keyword', { keywordId: keywordId }]);
      },
        error => {
          console.log(error);
          this.alertyfy.error(error);
        });
  }
  public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').toString().trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }
}
