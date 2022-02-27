import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { classTypes } from './Models/classTypes';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  getClasses() {
    const url = `${environment.apiClass}GetClasses?`;
    return this.httpClient.get(url);
  }

  getClassTypes(obj: classTypes) {
    const url = `${environment.apiClass}getClassTypes?`;
    const params = new HttpParams()
      .append("IdType", obj.IdType.toString())
      .append("TypeName", obj.TypeName);
    return this.httpClient.get(url, {params});
  }

  insertClassType(obj: classTypes): Observable<any> {
    const url = `${environment.apiClass}insertClassType`;
    // const params = new HttpParams()
    //   .append('typeName', obj.typeName);
    return this.httpClient.post(url, obj);
  }

  updateClassType(obj: classTypes): Observable<any> {
    const url = `${environment.apiClass}updateClassType`;
    // const params = new HttpParams()
    //   .append('typeName', obj.typeName);
    return this.httpClient.post(url, obj);
  }

  deleteClassType(obj: classTypes): Observable<any> {
    const url = `${environment.apiClass}deleteClassType`;
    // const params = new HttpParams()
    //   .append('typeName', obj.typeName);
    return this.httpClient.post(url, obj);
  }
}
