import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  // TODO: вынести в настройки  (environment?)
  private url = 'http://127.0.0.1:8081';

  constructor(private http: HttpClient) {
  }

  startSearch(text: string): string {
    return '';
  }

  getResult(requestId: string, page: number, size: number) {
  }

}
