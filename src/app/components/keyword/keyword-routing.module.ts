import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListKeywordComponent } from '../keyword/list-keyword/list-keyword.component';
import { CreateKeywordComponent } from './create-keyword/create-keyword.component';
import { EditKeywordComponent } from './edit-keyword/edit-keyword.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-keyword',
        component: ListKeywordComponent,
        data: {
          title: "List Keyword",
          breadcrumb: "List Keyword"
        }
      },
      {
        path: 'create-keyword',
        component: CreateKeywordComponent,
        data: {
          title: "Create Keyword",
          breadcrumb: "Create Keyword"
        }
      },
      {
        path: 'edit-keyword',
        component: EditKeywordComponent,
        data: {
          title: "Edit Keyword",
          breadcrumb: "Edit Keyword"
        }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeywordRoutingModule {
}
