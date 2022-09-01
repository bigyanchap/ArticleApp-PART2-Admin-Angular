import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Article, ArticleImage } from '../../models/article';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseUrl = environment.apiUrl;

  constructor(private apiService: ApiService) { }

  getArticleStatuses() {
    return this.apiService.get('Article/getArticleStatuses');
  }
  getSeasons() {
    return this.apiService.get('Article/getSeasons');
  }
  getTwentyFourHourTimings() {
    return this.apiService.get('Article/getTwentyFourHourTimings');
  }

  saveArticle(article: any) {
    return this.apiService.post('Article/upsert', article);
  }

  getAllArticlePaged(query) {
    return this.apiService.post('Article/allPaged', query);
  }
  getArticle(id: number) {
    return this.apiService.get('Article/getById/' + id);
  }

  deleteImage(Id: number) {
    return this.apiService.delete('Article/DeleteImage/' + Id);
  }
  saveImage(id, formData) {
    return this.apiService.post('Article/uploadImage/' + id, formData);
  }
  
  
  //#region article-references
  createRef(obj) {
    return this.apiService.post('Article/createRef', obj);
  }
  updateRef(obj) {
    return this.apiService.post('Article/updateRef', obj);
  }
  getReferenceById(id) {
    return this.apiService.get('Article/getReferenceById/' + id);
  }
  getReferencesByArticleId(articleId) {
    return this.apiService.get('Article/getReferencesByArticleId/' + articleId);
  }
  uploadRefImages(id, formdata) {
    return this.apiService.post("Article/UploadRefImage/" + id, formdata);
  }
  getReferenceImages(id) {
    return this.apiService.get('Article/GetReferenceImage/' + id);
  }
  deleteReference(referenceId) {
    return this.apiService.delete('Article/DeleteRef/' + referenceId);
  }
  //#endregion article-references
}