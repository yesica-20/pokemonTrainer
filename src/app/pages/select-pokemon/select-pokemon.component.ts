import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { ChoosePokemonComponent} from '../../pokemon/choose-pokemon/choose-pokemon.component';
import { TrainerUserComponent } from '../../profile/trainer-user/trainer-user.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../common/loading/loading.component';
@Component({
  selector: 'app-select-pokemon',
  standalone: true,
  imports: [CommonModule,HeaderComponent,ChoosePokemonComponent,TrainerUserComponent,LoadingComponent],
  templateUrl: './select-pokemon.component.html',
  styleUrl: './select-pokemon.component.css'
})
export class SelectPokemonComponent {
  isLoading:boolean = true;

   timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
    this.isLoading = false; 
  }, 2000); 

  

}
