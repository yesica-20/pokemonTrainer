import { Component, effect,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
interface TrainerUser {
  name: string;
  birthday: Date;
  hobby:string
  document: string;
  age:number;
}
@Component({
  selector: 'app-trainer-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainer-user.component.html',
  styleUrl: './trainer-user.component.css'
})
export class TrainerUserComponent {
  @Input() viewPokemons:boolean=false;
  trainerUser: TrainerUser = { name: '', birthday: new Date(),hobby:'', document: '',age:0 };
  imageUrl: SafeUrl | null  = null;

  constructor(private domSanitizer: DomSanitizer){
    

   
  }

   ngOnInit() {
     this.getTrainerUser();
     this.loadSavedImage();
   }


   getTrainerUser() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.trainerUser = JSON.parse(userData);
      console.log('Loading data...', this.trainerUser.name);
    }
  }
  loadSavedImage(): void {
    let savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      this.imageUrl = savedImage;
    }
  }
}

