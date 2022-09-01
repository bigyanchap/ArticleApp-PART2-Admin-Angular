import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertyfyService } from './alertyfy.service';

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(
    private http: HttpClient,
    private alertyfy: AlertyfyService,
  ) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: any={}): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params })
      .pipe(
        tap((res) => this.getReutnData(res)),
        catchError((err) => this.getformatErrors(err))
      );
  };

  getWithParms(path: string, params: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params })
      .pipe(
        tap((res) => this.getReutnData(res)),
        catchError((err) => this.getformatErrors(err))
      );
  };

  put(path: string, body: Object = {}): Observable<any> {
    console.log(body);
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    ).pipe(
      tap((res) => this.putReutnData(res)),
      catchError((err) => this.postPutFormatErrors(err))
    );
  }

  private putReutnData(res: any) {
    return res || {};
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body
    ).pipe(
      tap((res) => this.postReutnData(res)),
      catchError((err) => this.postPutFormatErrors(err))
    );
  };

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${path}`
    ).pipe(
      tap((res) => this.deleteReturnData(res)),
      catchError(this.formatErrors)
    );
  }

  private deleteReturnData(res: any) {
    if (res && res.status && res.message) {
      if (res && res.code == 0) {
        this.alertyfy.message(res.message);
      } else {
        this.alertyfy.success('Success');
      }
    }
    return res || {};
  }

  private getReutnData(res: any) {
    return res || {};
  }
  public getformatErrors(error: any): any {
    return throwError(error);
  }

  private postReutnData(res: any) {
    return res || {};
  }


  public postPutFormatErrors(error: any): any {
    try {

    } catch{

    } finally {

      return throwError(error.error);
    }
  }
}
