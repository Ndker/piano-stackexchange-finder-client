import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  startSearch(text: string) {
    const params = new HttpParams()
      .set('text', text);

    return this.http.post<IStartResult>(`${environment.url}/api/search`, null, {params: params});
  }

  getResult(requestId: string, page: number, size: number) {
    const params = new HttpParams()
      .set('requestId', requestId)
      .set('page', `${page}`)
      .set('size', `${size}`);

    return this.http.get<ISearchResult>(`${environment.url}/api/search/result`, {observe: 'response', params: params});
  }
}

export interface IStartResult {
  requestId: string;
}

export interface ISearchResult {
  data: ISearchResultItem[];
  meta: ISearchResultMeta;
}

export interface ISearchResultMeta {
  currentPage: number;
  hashNext: boolean;
  totalPages: number;
}

export interface ISearchResultItem {
  date: string;
  title: string;
  author: string;
  sourceLink: string;
  answered: boolean;
}
