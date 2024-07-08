import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-image',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './profile-image.component.html',
  styleUrl: './profile-image.component.css'
})
export class ProfileImageComponent {
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor() { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.previewImage();
  }


  previewImage() {
    if (!this.selectedFile) {
      console.error('No file has been selected.');
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        this.imageUrl = result;
        localStorage.setItem('profileImage', result); 
      } else {
        console.error('The result of the FileReader is not a string.');
      }
    };
    
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
  
    reader.readAsDataURL(this.selectedFile);
  }
  


}
