import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Instructor } from './Models/Instructor.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private host: string;
  private routes: any;

  constructor(private httpClient: HttpClient) {
    this.host = environment.apiInstructor;
    this.routes = environment.routesInstructor;
  }

  //#region Class Locations
  getInstructors(): Observable<any> {
    return this.httpClient.get(`${this.host}${this.routes.getInstructors}`);
  }

  insertInstructor(cL: any): Observable<any> {
    return this.httpClient.post(
      `${this.host}${this.routes.insertInstructor}`,
      {
        IdInstructor: cL.IdInstructor,
        Name: cL.Name
      }
    );
  }

  updateInstructor(cL: any): Observable<any> {
    return this.httpClient.post(
      `${this.host}${this.routes.updateInstructor}`,
      {
        Id: cL.Id,
        IdInstructor: cL.IdInstructor,
        Name: cL.Name
      }
    );
  }

  deleteInstructor(cL: any): Observable<any> {
    return this.httpClient.post(
      `${this.host}${this.routes.deleteInstructor}`,
      {
        Id: cL.id,
        IdInstructor: cL.idInstructor,
        Name: cL.name
      }
    );
  }


}
