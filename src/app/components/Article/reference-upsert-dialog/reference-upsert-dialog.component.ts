import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { reference } from 'src/app/shared/models/reference';
import { AlertyfyService } from 'src/app/shared/service/alertyfy.service';
import { ArticleService } from 'src/app/shared/service/Article/article-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reference-upsert-dialog',
  templateUrl: './reference-upsert-dialog.component.html',
  styleUrls: ['./reference-upsert-dialog.component.scss']
})
export class ReferenceUpsertDialogComponent implements OnInit {
  baseUrlForImage = environment.apiUrl.replace("/api", "");
  referenceForm: FormGroup;
  public closeResult: string;
  modalContent: any;
  languages = [];
  @Input() articleId: number;
  @Input() referenceId: number;
  public formData: FormData;
  public files: File[] = [];
  imagesUrl = [];

  constructor(
    public activeModal: NgbActiveModal,
    private _router: Router,
    private alertyfy: AlertyfyService,
    private articleService: ArticleService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.referenceForm = this.fb.group({
      id: '',
      articleId: '',
      title: ['', [Validators.required, this.noWhitespace]],
      description: ['', [Validators.required, this.noWhitespace]],
      imagePath: ['']
    });
    if (Number(this.referenceId) > 0) { this.getArticleReference(); }
  }

  onSelect(event) {
    this.formData = new FormData();
    this.files.push(...event.addedFiles);
    for (let i = 0; i < this.files.length; i++) {
      this.formData.append('files', this.files[i]);
    }
    this.files = [];
    this.formData.append('Id', this.referenceId.toString());

    this.articleService.uploadRefImages(this.referenceId, this.formData)
      //.pipe(map(event => this.getEventMessage(event)))
      .subscribe(res => {
        this.imagesUrl.push(res);
        var alerted = this.loadReferenceImages();
        //if(!alerted){this.alertyfy.success("Image Saved Successfully.");}
      });
  }

  loadReferenceImages() {
    var hadImage = this.imagesUrl.length > 0;
    this.imagesUrl = [];
    this.articleService.getReferenceImages(this.referenceId)
      .subscribe((images) => {
        if (images != null) {
          this.imagesUrl.push(images);
          if (hadImage) {
            this.alertyfy.success("Image Replaced and Saved Successfully.");
            return true;
          }
        }
      });
    return false;
  }

  onRemove(event) {
    this.formData.delete('files[]');
    this.files.splice(this.files.indexOf(event), 1);
    for (let i = 0; i < this.files.length; i++) {
      this.formData.append('files[]', this.files[i]);
    }
  }

  getArticleReference() {
    this.articleService.getReferenceById(this.referenceId)
      .subscribe(res => {
        this.referenceForm.setValue({
          id: res.id,
          articleId: res.articleId,
          title: res.title,
          description: res.description,
          imagePath: res.imagePath
        });
      });
    this.loadReferenceImages();
  }

  onSave() {
    const saveToObj = this.referenceForm.value;
    const ref = new reference();
    ref.articleId = Number(this.articleId);
    ref.id = Number(saveToObj.id) || 0;
    ref.title = saveToObj.title;
    ref.description = saveToObj.description;
    if (ref.id === 0) {
      this.articleService.createRef(ref)
        .subscribe(response => {
          console.log(response);
          this.referenceForm.reset();
          this.activeModal.close({ 'isSavePressed': true });
        }, error => {
          this.alertyfy.error(error);
        });
    }
    else {
      this.articleService.updateRef(ref)
        .subscribe(response => {
          console.log(response);
          this.referenceForm.reset();
          this.activeModal.close({ 'isSavePressed': true });
        }, error => {
          this.alertyfy.error(error);
        });
    }
  }

  public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').toString().trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
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
}
