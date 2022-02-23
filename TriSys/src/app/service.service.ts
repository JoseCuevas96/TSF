import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  getClasses() {
    const url = `${environment.apiClass}GetClasses?`;
    return this.httpClient.get(url);
  }
}
