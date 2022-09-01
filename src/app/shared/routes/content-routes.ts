import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'location-mgmt',
    loadChildren: () => import('../../components/location-mgmt/location-mgmt.module').then(a => a.LocationMgmtModule),
    data: {
      breadcrumb: "Location"
    }
  },
  {
    path: 'category',
    loadChildren: () => import('../../components/category/category.module').then(c => c.CategoryModule),
    data: {
      breadcrumb: "Category"
    }
  },
  {
    path: 'keyword',
    loadChildren: () => import('../../components/keyword/keyword.module').then(m => m.KeywordModule),
    data: {
      breadcrumb: "Keyword"
    }
  },
  {
    path: 'article',
    loadChildren: () => import('../../components/Article/article.module').then(a => a.ArticleModule),
    data: {
      breadcrumb: "Article"
    }
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
  },




];