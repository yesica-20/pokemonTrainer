import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component'
import { SelectPokemonComponent } from './pages/select-pokemon/select-pokemon.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'select-pokemon',
        component:SelectPokemonComponent 
    },
    {
        path:'list-pokemon',
        component:PokemonsComponent 
    }
    
];
