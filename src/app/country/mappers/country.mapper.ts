import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper { // recibir un RESTCountry y devolver Country

  static mapRESTCountryToCountry( country: RESTCountry ): Country {
    return {
      cca2: country.cca2,
      flag: country.flag,
      flagSvg: country.flags.svg,
      name: country.translations['spa'].common ?? 'No Spanish Name',
      capital: country.capital?.join(',') ?? 'No capital info',
      population: country.population,
    }
  }

  static mapRESTCountryArrayToCountryArray( country: RESTCountry[] ): Country[] {
    return country.map( this.mapRESTCountryToCountry );
  }
}
