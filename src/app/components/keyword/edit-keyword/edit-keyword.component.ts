import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Keyword } from 'src/app/shared/models/keyword';
import { AlertyfyService } from 'src/app/shared/service/alertyfy.service';
import { KeywordService } from 'src/app/shared/service/Keyword/keyword.service';
import { SynonymDialogComponent } from '../synonym-dialog/synonym-dialog.component';

@Component({
  selector: 'app-edit-keyword',
  templateUrl: './edit-keyword.component.html',
  styleUrls: ['./edit-keyword.component.scss']
})
export class EditKeywordComponent implements OnInit {

  keywordForm: FormGroup;
  keyword: any = [];
  keywordId;
  synonyms: any = [];
  languages = [];
  constructor(
    private modalService: NgbModal,
    private keywordService: KeywordService,
    private fb: FormBuilder,
    private router: Router,
    private alertify: AlertyfyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createKeywordForm();
    this.getLanguages();
    this.getKeywordId();
    this.getAllSynonymsByKeywordId();
  }

  createKeywordForm() {
    this.keywordForm = this.fb.group({
      id: '',
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), this.noWhitespace]],
      description: ''
    });
  }
  getKeywordId() {
    this.route.paramMap
      .subscribe(params => {
        this.keywordId = Number(params.get('keywordId'));
        this.getKeywordById();
      });
  }

  getKeywordById() {
    this.keywordService.getKeywordById(this.keywordId)
      .subscribe(res => {
        this.keywordForm.setValue({
          id: res.id,
          name: res.name,
          description: res.description
        });
        this.getAllSynonymsByKeywordId();
      });
  }

  saveKeyword() {
    const saveToObj = this.keywordForm.value;
    const kwObj = new Keyword();
    kwObj.id = Number(saveToObj.id) || 0;
    kwObj.name = saveToObj.name;
    kwObj.description = saveToObj.description;
    this.keywordService.upsertKeyword(kwObj).subscribe(response => {
      if (response) {
        this.alertify.success("saved.");
      }
    }, error => {
      this.alertify.error(error);
    });
  }

  //#region  synonym
  addNewSynonym() {
    const modalRef = this.modalService.open(SynonymDialogComponent);
    modalRef.componentInstance.keywordId = this.keywordId;
    modalRef.componentInstance.synonymId = 0;
    modalRef.result
      .then((emitted) => {
        if (emitted.isSavePressed) {
          this.getAllSynonymsByKeywordId();
        }
      })
      .catch(reason => { });
  }

  onEditSynonym(optionValue, id, index) {
    const modalRef = this.modalService.open(SynonymDialogComponent);
    modalRef.componentInstance.keywordId = this.keywordId;
    modalRef.componentInstance.synonymId = id;
    modalRef.result
      .then((emitted) => {
        if (emitted.isSavePressed) {
          this.getAllSynonymsByKeywordId();
        }
      })
      .catch(reason => { });
  }
  getAllSynonymsByKeywordId() {
    this.keywordService.getAllSynonymsByKeywordId(this.keywordId)
      .subscribe(res => {
        this.synonyms = res;
        console.log(this.synonyms);
      })
  }

  getLanguages() {
    this.keywordService.getLanguageEnum()
      .subscribe(res => {
        if (res) {
          this.languages = res;
        }
      }, error => {
        console.log("something went wrong.")

      });
  }
  onDeleteSynonym(name, id, index) {
    this.alertify.confirmRemove(name,
      () => {
        this.keywordService.deleteSynonymById(id)
          .subscribe(res => {
            if (res.success) {
              this.synonyms.splice(index, 1);
              this.alertify.success("Deleted Successfully.");
            }
          },
            (error) => {
              this.alertify.error(error);
            });
      });
  }
  //#endregion synonym
  public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').toString().trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }
}
