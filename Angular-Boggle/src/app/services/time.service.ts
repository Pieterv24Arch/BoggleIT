import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://192.168.178.18:55037';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  public constructor(private http: HttpClient) {
  }

  public getServerTime(): Observable<number> {
    return this.http.get<number>(apiUrl + '/api/time');
  }
}
