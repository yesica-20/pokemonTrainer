import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { ChoosePokemonComponent} from '../../pokemon/choose-pokemon/choose-pokemon.component';
import { TrainerUserComponent } from '../../profile/trainer-user/trainer-user.component';

@Component({
  selector: 'app-select-pokemon',
  standalone: true,
  imports: [HeaderComponent,ChoosePokemonComponent,TrainerUserComponent],
  templateUrl: './select-pokemon.component.html',
  styleUrl: './select-pokemon.component.css'
})
export class SelectPokemonComponent {

}
