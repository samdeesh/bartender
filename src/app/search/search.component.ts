import { Component, OnInit } from '@angular/core';
import { CocktailService, SearchBy } from '../shared/cocktail.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  error: string = null;
  query = '';
  response = null;

  searchList = [
    { label: 'Name', value: SearchBy.NAME },
    { label: 'First Letter', value: SearchBy.LETTER },
  ];

  searchBy = SearchBy.NAME;

  constructor(readonly cocktail: CocktailService) { }

  ngOnInit(): void { }
  onSubmit(): void {
    this.response = null;

    this.cocktail.search(this.query, this.searchBy)
      .subscribe(success => {
        this.response = success && success.drinks;
        if (!this.response || !this.response.length) {
          this.setError();
        }
      }, () => {
          this.setError();
      });
  }

  get loading(): boolean {
    return this.cocktail.loading;
  }

  private setError(): void {
    this.response = [{ strDrink: `No results found for '${this.query}'` }];
  }
}
