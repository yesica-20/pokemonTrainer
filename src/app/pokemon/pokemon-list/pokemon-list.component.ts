import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../common/loading/loading.component';
import { PokemonesService } from '../../domains/shared/services/pokemones.service';
import { Router } from '@angular/router';

interface Pokemon {
  id: number;
  name: string;
  img: string;
  selected: boolean;
}

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule,LoadingComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {
  @Input() selectedPokemons: any[] = [];
 
  
  constructor(private pokemonesService: PokemonesService,private router: Router) {}

  ngOnInit() {
   
   
    
  }
  getColorForType(type: string): string {
   

    switch (type.toLowerCase()) {
        case 'grass':
            return '#78c850'; 
        case 'fire':
            return '#f08030'; 
        case 'water':
            return '#6890f0';
        case 'squirtle':
            return '#6890f0'; 
        default:
            return '#a8a878';
    }
}
calculateWidth(baseStat: number,statLimit: number): string {
  const percentage = (baseStat / statLimit) * 100;
    return `${percentage}%`;
}
editPokemon(){
  this.router.navigate(['select-pokemon']);
}
capitalLetter(namePokemon:string){
  return namePokemon.replace(/^\w/, (c: string) => c.toUpperCase())

}
getStatLimit(statName: string): number {
  switch (statName) {
    case 'salud':
      return 255;
    case 'ataque':
      return 19;
    case 'defensa':
      return 23;
    case 'ataque especial':
      return 194;
    case 'defensa especial':
      return 23;
    case 'velocidad':
      return 18;
    default:
      return 100; 
  }
}

}
