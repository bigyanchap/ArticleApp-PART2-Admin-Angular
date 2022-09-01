import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularTreeGridModule } from 'angular-tree-grid';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { KeywordRoutingModule } from '../keyword/keyword-routing.module';
import { ListKeywordComponent } from '../keyword/list-keyword/list-keyword.component';
import { CreateKeywordComponent } from '../keyword/create-keyword/create-keyword.component';
import { EditKeywordComponent } from './edit-keyword/edit-keyword.component';
import { SynonymDialogComponent } from './synonym-dialog/synonym-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListKeywordComponent,
    CreateKeywordComponent,
    EditKeywordComponent,
    SynonymDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    KeywordRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxDatatableModule,
    NgxDropzoneModule,
    AngularTreeGridModule,
    Ng2SmartTableModule
  ]
})

export class KeywordModule {
}
