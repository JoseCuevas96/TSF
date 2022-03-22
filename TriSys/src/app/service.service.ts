import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { classTypes } from './Models/classTypes';
import { ResponseAPI } from './Models/Response.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private host: string;
  private routes: any;
  private routesClass: any;

  constructor(private httpClient: HttpClient, private datePipe: DatePipe) {
    this.host = environment.apiClass;
    this.routes = environment.routes;
    this.routesClass = environment.routesClasses;
  }

  getClasses() {
    const url = `${environment.apiClass}GetClasses?`;
    return this.httpClient.get(url);
  }

  insertClass(c: any): Observable<any> {
    return this.httpClient.post(
      `${this.host}${this.routesClass.insertClass}`,
      {
        IdClass: c.IdClass === '' ? 0 : Number(c.IdClass),
        IdClassName: Number(c.IdClassName),
        IdClassLocation: Number(c.IdClassLocation),
        Schedule: new Date(c.Schedule),
        MaxStudents: c.MaxStudents,
        StartTime: this.datePipe.transform(c.StartTime, 'HH:mm'),
        FinishTime: this.datePipe.transform(c.FinishTime, 'HH:mm'),
        RegisterCost: c.RegisterCost,
        Enabled: c.Enabled,
        Spanish: c.Spanish,
        instructorId: Number(c.instructorId),
        Note: c.Note,
        SearchKey: c.SearchKey,
        CreateDate: new Date(),
      }
    );
  }

  updateClass(c: any): Observable<any> {
    return this.httpClient.post(
      `${this.host}${this.routesClass.updateClass}`,
      {
        IdClass: c.IdClass === '' ? 0 : Number(c.IdClass),
        IdClassName: Number(c.IdClassName),
        IdClassLocation: Number(c.IdClassLocation),
        Schedule: new Date(c.Schedule),
        MaxStudents: c.MaxStudents,
        StartTime: this.datePipe.transform(c.StartTime, 'HH:mm'),
        FinishTime: this.datePipe.transform(c.FinishTime, 'HH:mm'),
        RegisterCost: c.RegisterCost,
        Enabled: c.Enabled,
        Spanish: c.Spanish,
        instructorId: Number(c.instructorId),
        Note: c.Note,
        SearchKey: c.SearchKey,
        CreateDate: new Date(),
      }
    );
  }

  deleteClass(c: any): Observable<any> {
    return this.httpClient.post(
      `${this.host}${this.routesClass.deleteClass}`,
      {
        IdClass: c.idClass === '' ? 0 : Number(c.idClass)
      }
    );
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
