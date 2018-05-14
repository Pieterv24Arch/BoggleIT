import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Highscore } from '../models/Highscore';

const apiUrl = 'http://localhost:55037';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HighScoreService {
  public constructor(private http: HttpClient) {
  }

  public getHighscores(): Observable<Array<Highscore>> {
    return this.http.get<Array<Highscore>>(apiUrl + '/api/highscore');
  }

  public postHighscore(id: string, highscore: Highscore): Observable<Highscore> {
    return this.http.post<Highscore>(apiUrl + '/api/highscore/' + id,
      JSON.stringify(highscore),
      httpOptions
    );
  }
}
