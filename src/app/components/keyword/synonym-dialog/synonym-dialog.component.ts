import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Synonym } from 'src/app/shared/models/synonym';
import { AlertyfyService } from 'src/app/shared/service/alertyfy.service';
import { KeywordService } from 'src/app/shared/service/Keyword/keyword.service';

@Component({
  selector: 'app-synonym-dialog',
  templateUrl: './synonym-dialog.component.html',
  styleUrls: ['./synonym-dialog.component.scss']
})
export class SynonymDialogComponent implements OnInit {

  synonymForm: FormGroup;
  public closeResult: string;
  modalContent: any;
  languages = [];
  @Input() keywordId: number;
  @Input() synonymId: number;

  constructor(
    public activeModal: NgbActiveModal,
    private _router: Router,
    private alertyfy: AlertyfyService,
    private keywordService: KeywordService,
    private fb: FormBuilder,
  ) {
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit() {
    this.getLanguages();
    this.synonymForm = this.fb.group({
      id: '',
      keywordId: '',
      name: ['', [Validators.required, this.noWhitespace]],
      language: ['', [Validators.required]]
    });
    if (Number(this.synonymId) > 0) { this.getSynonym(); }
  }
  getLanguages() {
    this.keywordService.getLanguageEnum()
      .subscribe(res => {
        if (res) {
          this.languages = res;
        }
      }, error => {
        console.log("something went wrong while trying to get Languages.");
      });
  }

  getSynonym() {
    this.keywordService.getSynonymById(this.synonymId)
      .subscribe(res => {
        this.synonymForm.setValue({
          id: res.id,
          keywordId: res.keywordId,
          name: res.name,
          language: res.language
        });
      });
  }

  onSave() {
    const saveToObj = this.synonymForm.value;
    const syn = new Synonym();
    syn.keywordId = Number(this.keywordId);
    syn.id = Number(saveToObj.id) || 0;
    syn.name = saveToObj.name;
    syn.language = Number(saveToObj.language);
    this.keywordService.upsertSynonym(syn)
      .subscribe(response => {
        console.log(response);
        this.synonymForm.reset();
        this.activeModal.close({ 'isSavePressed': true });
      }, error => {
        this.alertyfy.error(error);
      });
  }
  public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').toString().trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }
}
