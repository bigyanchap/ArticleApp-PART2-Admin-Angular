import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertyfyService } from 'src/app/shared/service/alertyfy.service';
import { ArticleService } from 'src/app/shared/service/Article/article-service';
import { ReferenceUpsertDialogComponent } from '../reference-upsert-dialog/reference-upsert-dialog.component';

@Component({
  selector: 'app-article-reference',
  templateUrl: './article-reference.component.html',
  styleUrls: ['./article-reference.component.scss']
})
export class ArticleReferenceComponent implements OnInit {
  @Input() articleId;
  articleReferences = [];
  constructor(
    private articleService: ArticleService
    , private alertyfy: AlertyfyService
    , private modalService: NgbModal

  ) { }

  ngOnInit(): void {
    this.getAllAR();
  }

  getAllAR() {
    this.articleService.getReferencesByArticleId(this.articleId)
      .subscribe(res => {
        this.articleReferences = res;
      },
        error => {
          if (error) {
            this.alertyfy.error(error);
          } else {
            this.alertyfy.error("Cannot reach server.");
          }
        });
  }

  addNewAR() {
    const modalRef = this.modalService.open(ReferenceUpsertDialogComponent, { size: <any>'xl' });
    modalRef.componentInstance.articleId = this.articleId;
    modalRef.componentInstance.referenceId = 0;
    modalRef.result
      .then((emitted) => {
        if (emitted.isSavePressed) {
          this.getAllAR();
        }
      })
      .catch(reason => { });
  }

  onEditAR(title, refenceId, idx) {
    const modalRef = this.modalService.open(ReferenceUpsertDialogComponent, { size: <any>'xl' });
    modalRef.componentInstance.articleId = this.articleId;
    modalRef.componentInstance.referenceId = refenceId;
    modalRef.result
      .then((emitted) => {
        if (emitted.isSavePressed) {
          this.getAllAR();
        }
      })
      .catch(reason => { });
  }

  onDeleteAR(title, referenceId, idx) {
    this.alertyfy.confirmDeletion(title, () => {
      this.articleService.deleteReference(referenceId)
        .subscribe(res => {
          if (res.success) {
            this.alertyfy.success(`Deleted ${title} Successfully.`);
            this.getAllAR();
          }
        })
    });
  }

}
