import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export enum ListBy {
  Ingredient = '?i=list',
  Category = '?c=list',
}
export enum SearchBy {
  NAME = 'name',
  LETTER = 'letter',
  // ING = 'ing',
}
@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(private readonly http: HttpClient) { }

  loading = false;

  search(query: string, type: SearchBy = SearchBy.NAME): Observable<any> {
    this.loading = true;
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
    let params: any = { s: query };

    switch (type) {
      case SearchBy.LETTER:
        params = { f: query };
        break;

      default:
        break;
    }
    return this.http.get(url, { params }).pipe(finalize(() => {
      this.loading = false;
    }));
  }

  list(listBy: ListBy): Observable<any> {
    this.loading = true;

    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php';
    return this.http.get(url + listBy).pipe(finalize(() => {
      this.loading = false;
    }));
  }
}
