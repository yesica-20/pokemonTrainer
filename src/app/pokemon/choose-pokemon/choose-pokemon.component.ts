import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonesService } from '../../domains/shared/services/pokemones.service';
import { Router,NavigationExtras  } from '@angular/router';
// import { SwiperModule } from 'swiper/core';
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper/core';
import { FormsModule } from '@angular/forms';

interface Pokemon {
  id: number;
  name: string;
  img: object;
  selected: boolean;
  type:any;
  abilities:any
}
@Component({
  selector: 'app-choose-pokemon',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './choose-pokemon.component.html',
  styleUrl: './choose-pokemon.component.css',
})
export class ChoosePokemonComponent {
  pokemons: any[] = [];
  urlsArray: any[] = [];
  searchPokemon:string ='';
  allPokemons:any[]=[];
  selectedPokemons: Pokemon[] = [];
  constructor(private pokemonesService: PokemonesService,private router: Router) {}
  ngOnInit() {
    this.getPokemons();
  }
  getPokemons() {
    this.pokemonesService.getPokemons().subscribe({
      next: (data: any) => {
        console.log('typeee', typeof data, data.results);
        this.urlsArray = data.results.map((pokemon: any) => pokemon.url);
        console.log('urlsArray', this.urlsArray);
    
        this.getDetailsPokemon();
      },
      error: (err: any) => {
        console.error('Error fetching pokemons', err);
      }
    });
  }
  getDetailsPokemon() {
    const limitedUrls = this.urlsArray.slice(0, 9);
    try {
    limitedUrls.forEach((element) => {
        this.pokemonesService
          .getPokemonDetails(element)
          .subscribe((data: any) => {
            console.log("dataaa",data)
            let listPokemon = {
            name:data.name,
            img:data.sprites.front_default,
            id:data.id,
            type:data.types,
            abilities:data.abilities

            }
          this.pokemons.push(listPokemon);
          this.allPokemons=this.pokemons
          });
      });
    } catch (e) {
      console.log('un error ha ocurrido', e);
    }
  }
  filterPokemons(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.searchPokemon = inputElement.value;
    const searchTermLower = this.searchPokemon.toLowerCase().trim();
    if (!searchTermLower) {
      this.pokemons = this.allPokemons;
    } else {
      this.pokemons = this.allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTermLower) ||
        pokemon.id.toString().includes(searchTermLower)
      );
    }
  }
  toggleSelection(pokemon: any) {
    console.log("pokemonse",pokemon)
    const index = this.selectedPokemons.findIndex((p) => p.id === pokemon.id);
    if (index === -1) {
      
      if (this.selectedPokemons.length < 3) {
        pokemon.selected = true;
        this.selectedPokemons.push(pokemon);
      }
    } else {
      pokemon.selected = false;
      this.selectedPokemons.splice(index, 1);
    }
  }
  goToListPokemon() {
    const navigationExtras: NavigationExtras = {
      state: {
        selectedPokemons: this.selectedPokemons
      }
    };
    this.router.navigate(['list-pokemon'], navigationExtras);
  }
  
}
