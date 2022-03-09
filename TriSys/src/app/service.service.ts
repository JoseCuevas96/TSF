import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { classTypes } from './Models/classTypes';
import { ResponseAPI } from './Models/Response.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private host: string;
  private routes: any;

  constructor(private httpClient: HttpClient) {
    this.host = environment.apiClass;
    this.routes = environment.routes;
  }

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

  //#region Class Locations
  getClassLocations(): Observable<any> {
    return this.httpClient.get(`${this.host}${this.routes.getClassLocation}`);
  }

  insertClassLocation(cL: any): Observable<any> {
    return this.httpClient.post(
      `${this.host}${this.routes.insertClassLocation}`,
      {
        Name: cL.Name,
        Address: cL.Address,
        State: cL.State,
        City: cL.City,
        ZIP: cL.ZIP
      }
    );
  }

  updateClassLocation(cL: any): Observable<any> {
    return this.httpClient.post(
      `${this.host}${this.routes.updateClassLocation}`,
      {
        IdLocation: cL.IdLocation,
        Name: cL.Name,
        Address: cL.Address,
        State: cL.State,
        City: cL.City,
        ZIP: cL.ZIP
      }
    );
  }

  deleteClassLocation(cL: any): Observable<any> {
    return this.httpClient.post(
      `${this.host}${this.routes.deleteClassLocation}`,
      {
        IdLocation: cL.idLocation,
        Name: cL.name,
        Address: cL.address,
        State: cL.state,
        City: cL.city,
        ZIP: cL.zip
      }
    );
  }
  //#endregion
}
