import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCountryComponent } from './list-country/list-country.component';
import { UpsertCountryComponent } from './upsert-country/upsert-country.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'upsert-country',
        component: UpsertCountryComponent,
        data: {
          title: "Upsert Country",
          breadcrumb: "Upsert Country"
        } 
      },
      {
        path: 'list-country',
        component: ListCountryComponent,
        data: {
          title: "Countries",
          breadcrumb: "Countries"
        } 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationMgmtRoutingModule { }



