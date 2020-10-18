import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResultsComponent } from '../results/results.component';
import { SpinnerComponent } from './spinner/spinner.component';

const declarations = [ResultsComponent, SpinnerComponent];
@NgModule({
  declarations,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ], exports: declarations
})
export class SharedModule { }
