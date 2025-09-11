import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    const url = `${API_URL}/capital/${query}`;
    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map( res => CountryMapper.mapRESTCountryArrayToCountryArray(res) ),
        catchError( err => {
          console.log('Error fetching: ', err);
          return throwError( ()=> new Error('No se pudo obtener países con esa query'));
        }),
      )
    ;
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    const url = `${API_URL}/name/${query}`;

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map( res => CountryMapper.mapRESTCountryArrayToCountryArray(res) ),
        delay(1500), // solo se usa para ver el comportamiento del loading
        catchError( err => {
          console.log('Error fetching: ', err);
          return throwError( ()=> new Error('No se pudo obtener países con esa query'));
        }),
      )
    ;
  }
}
