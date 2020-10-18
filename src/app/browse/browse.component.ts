import { Component, OnInit } from '@angular/core';
import { CocktailService, ListBy } from '../shared/cocktail.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  constructor(readonly cocktail: CocktailService) { }
  list = [
    { label: 'Ingredient', value: ListBy.Ingredient },
    { label: 'Category', value: ListBy.Category },
  ];

  listBy = ListBy.Ingredient;

  response = null;
  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.cocktail.list(this.listBy).subscribe(success => {
      this.response = success && success.drinks;
      if (!this.response || !this.response.length) {
        this.setError();
      }
    }, () => {
      this.setError();
    });
  }

  setError(): void {
    this.response = null;
  }

  get loading(): boolean {
    return this.cocktail.loading;
  }

}
