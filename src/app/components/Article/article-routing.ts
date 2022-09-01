import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateArticleComponent } from './create-article/create-article.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create-article',
        component: CreateArticleComponent,
        data: {
          title: 'Create Article',
          breadcrumb: 'Create Article'
        }
      },
      {
        path: 'list-article',
        component: ListArticleComponent,
        data: {
          title: 'Article List',
          breadcrumb: 'Article List'
        }
      },
      {
        path: 'edit-article',
        component: EditArticleComponent,
        data: {
          title: 'Edit Article',
          breadcrumb: 'Edit Article'
        }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ArticleRoutingModule {
}
