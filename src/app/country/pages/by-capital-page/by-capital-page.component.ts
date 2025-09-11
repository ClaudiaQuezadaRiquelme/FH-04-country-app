import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital-page',
  imports: [
    CountrySearchInputComponent,
    CountryListComponent,
  ],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal<string>('');

  // COUNTRYRESOURCE CON OBSERVABLES
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({request}) => {
      if ( !request.query ) return of([]);
      return this.countryService.searchByCapital(request.query);
    },
  });


  // COUNTRYRESOURCE CON PROMESAS
  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({request}) => {
  //     if ( !request.query ) return [];

  //     return await firstValueFrom( // convierte el observable en una promesa
  //       this.countryService.searchByCapital(request.query)
  //     );
  //   },
  // });

  // NO ES NECESARIO SI SE UTILIZA "Async reactivity with resources"
  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading()) return; // evitar hacer peticiones a la api innecesarias.

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //   .subscribe({
  //     next: (res) => {
  //       this.isLoading.set(false);
  //       this.countries.set(res);
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(`${err} (${query}).`);
  //     },
  //   });
  // }
}
