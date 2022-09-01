import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; 
import { CategoryRoutingModule } from './category-routing';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'; import { NgxDropzoneModule } from 'ngx-dropzone';
import { TagInputModule } from 'ngx-chips';
import { UpsertCategoryComponent } from './upsert-category/upsert-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ListCategoryComponent } from './list-category/list-category.component';

@NgModule({
  declarations: [ListCategoryComponent, UpsertCategoryComponent], 
  imports: [
    SharedModule,
    AngularEditorModule,
    TagInputModule,
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule, FormsModule,
    NgxDropzoneModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})

export class CategoryModule {
}
