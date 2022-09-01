import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ArticleRoutingModule } from './article-routing';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TagInputModule } from 'ngx-chips';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticleReferenceComponent } from './article-reference/article-reference.component';
import { ReferenceUpsertDialogComponent } from './reference-upsert-dialog/reference-upsert-dialog.component';

@NgModule({
  declarations: [
    ReferenceUpsertDialogComponent,
    CreateArticleComponent,
    ListArticleComponent,
    EditArticleComponent,
    ArticleReferenceComponent
  ],
  imports: [
    SharedModule,
    AngularEditorModule,
    TagInputModule,
    CommonModule,
    ArticleRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule, FormsModule,
    NgxDropzoneModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})

export class ArticleModule {
}
