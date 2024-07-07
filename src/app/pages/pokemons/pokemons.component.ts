import { Component } from '@angular/core';
import { TrainerUserComponent } from '../../profile/trainer-user/trainer-user.component';
import { PokemonListComponent } from '../../pokemon/pokemon-list/pokemon-list.component';
import { HeaderComponent } from '../../common/header/header.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
interface Pokemon {
  id: number;
  name: string;
  image: string;
  selected: boolean;
}
@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [TrainerUserComponent,PokemonListComponent,HeaderComponent,CommonModule],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css'
})
export class PokemonsComponent {
  selectedPokemons: Pokemon[] = [];
  name:any='';
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.selectedPokemons = navigation.extras.state['selectedPokemons'];
    }
  }
  ngOnInit() {
    console.log('Selected Pokemons:', this.selectedPokemons);
   
   
  }
}
