import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocationMgmtRoutingModule} from './location-mgmt-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UpsertCountryComponent } from './upsert-country/upsert-country.component';
import { ListCountryComponent } from './list-country/list-country.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
     UpsertCountryComponent,
     ListCountryComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    LocationMgmtRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgxDatatableModule,
    Ng2SmartTableModule
  ]
})
export class LocationMgmtModule { }