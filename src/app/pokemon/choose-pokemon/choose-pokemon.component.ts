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
  selectedCount: number = 0;
  isLoading:boolean = true;
  constructor(private pokemonesService: PokemonesService,private router: Router) {}
  ngOnInit() {
    this.getPokemons();
  }
  getPokemons() {
    this.isLoading = true;
    this.pokemonesService.getPokemons().subscribe({
      next: (data: any) => {
        this.urlsArray = data.results.map((pokemon: any) => pokemon.url);
        this.getDetailsPokemon();
      },
      error: (err: any) => {
        console.error('An error occurred in getPokemons', err);
        this.isLoading = false;
      }
    });
  }
  getDetailsPokemon() {
    const limitedUrls = this.urlsArray.slice(0, 9);
    let pendingRequests = limitedUrls.length;
    try {
    limitedUrls.forEach((element) => {
        this.pokemonesService
          .getPokemonDetails(element)
          .subscribe((data: any) => {
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
          pendingRequests--;
          if (pendingRequests === 0) {
            setTimeout(() => {
              this.isLoading = false;
            }, 3000); 
          }
      });
    } catch (e) {
      console.log('An error occurred in getDetailsPokemon', e);
      this.isLoading = false;
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
    const index = this.selectedPokemons.findIndex((p) => p.id === pokemon.id);
    if (index === -1) {
      
      if (this.selectedPokemons.length < 3) {
        pokemon.selected = true;
        this.selectedPokemons.push(pokemon);
        this.selectedCount++;
      }
    } else {
      pokemon.selected = false;
      this.selectedPokemons.splice(index, 1);
      this.selectedCount--;
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
