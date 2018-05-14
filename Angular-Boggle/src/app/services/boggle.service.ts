import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Board } from '../models/Board';
import { WordEntry } from '../models/WordEntry';

const apiUrl = 'http://localhost:55037';
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

  public getScore(id: string): Observable<number> {
    return this.http.get<number>(apiUrl + '/api/board/' + id + '/score');
  }

  public getWords(id: string): Observable<Array<WordEntry>> {
    return this.http.get<Array<WordEntry>>(apiUrl + '/api/word/' + id);
  }

  public postWord(id: string, word: WordEntry): Observable<any> {
    return this.http.post(apiUrl + '/api/word/' + id,
      JSON.stringify(word),
      httpOptions);
  }

  private isValidGuid(guid: string): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return guidRegex.test(guid);
  }
}
