import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [
    CountrySearchInputComponent,
    CountryListComponent,
  ],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  query = signal<string>('');


  // COUNTRYRESOURCE CON OBSERVABLES
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({request}) => {
      if ( !request.query ) return of([]);
      return this.countryService.searchByCountry(request.query);
    },
  });


  // COUNTRYRESOURCE CON PROMESAS
  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({request}) => {
  //     if ( !request.query ) return [];

  //     return await firstValueFrom( // convierte el observable en una promesa
  //       this.countryService.searchByCountry(request.query)
  //     );
  //   },
  // });
}
