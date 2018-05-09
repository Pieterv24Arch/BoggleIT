import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Board } from '../models/Board';

const apiUrl = 'http://localhost:52964';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BoggleService {
  public constructor(private http: HttpClient) {
  }

  public getBoard(): Observable<Board> {
    return this.http.get<Board>(apiUrl + '/api/board');
  }

  public getBoardById(id: string): Observable<Board> {
    return this.http.get<Board>(apiUrl + '/api/board/' + id);
  }

  private isValidGuid(guid: string): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return guidRegex.test(guid);
  }
}
