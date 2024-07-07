import { Injectable ,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonesService {
private http = inject(HttpClient);
  constructor() { }
  getPokemons() {
    return this.http.get('https://pokeapi.co/api/v2/pokemon')

  }
  getPokemonDetails(url: string): any {
    return this.http.get<any>(url);
  }
  getPokemonColor(id: string): any {
    return this.http.get('https://pokeapi.co/api/v2/contest-type/1/')
  }
}
