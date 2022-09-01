import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {

  constructor(private apiService: ApiService) { }
  //#region keyword
  upsertKeyword(keyword) {
    return this.apiService.post("Keyword/upsert", keyword);
  }
  getKeywordById(id: any) {
    return this.apiService.get("Keyword/getbyId/" + id);
  }
  getAllKeyword(query) {
    return this.apiService.post("Keyword/allPaged", query);
  }
  deleteKeywordById(id: number): any {
    return this.apiService.delete('Keyword/del/' + id);
  }
  //#endregion
  //#region synonym
  getSynonymById(id: number): Observable<any> {
    return this.apiService.get('Keyword/getSynById/' + id);
  }
  getAllSynonymsByKeywordId(keywordId): Observable<any> {
    return this.apiService.get('Keyword/GetManySynonym/' + keywordId);
  }
  upsertSynonym(data: any): any {
    return this.apiService.post('Keyword/upsertSyn', data);
  }
  deleteSynonymById(id: number): any {
    return this.apiService.delete('Keyword/delSynById/' + id);
  }
  getLanguageEnum(): Observable<any> {
    return this.apiService.get('Keyword/getLangEnum');
  }
  //#endregion
  //#region Article Page
  getKeywordsBySubStr(data): Observable<any> {
    return this.apiService.post('Keyword/getKWbySubStr', data);
  }
  saveKeywordBundle(bundle): Observable<any> {
    return this.apiService.post('Keyword/saveKeywordBundle', bundle);
  }
  getKeywords(articleId) {
    return this.apiService.get('Keyword/getKeywords/' + articleId);
  }
  //#endregion Article Page
}


