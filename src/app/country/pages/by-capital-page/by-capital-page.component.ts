import { Component, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';

@Component({
  selector: 'app-by-capital-page',
  imports: [
    CountrySearchInputComponent,
    CountryListComponent,
  ],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  search = signal<string>('');

  onSearch(value: string) {
    console.log('search value:', value);

  }
}
