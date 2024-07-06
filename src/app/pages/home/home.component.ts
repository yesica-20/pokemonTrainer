import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { ProfileImageComponent } from '../../profile/profile-image/profile-image.component';
import { FormComponent } from '../../profile/form/form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,ProfileImageComponent,FormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
