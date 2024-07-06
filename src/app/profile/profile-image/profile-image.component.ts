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

  // previewImage() {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imageUrl = reader.result;
  //     console.log('readerr',reader.result)
  //   };
  //   if (this.selectedFile) {
  //     reader.readAsDataURL(this.selectedFile);
  //   }
  //   localStorage.setItem('profileImage', reader.result);
  //   //localStorage.setItem('profileImage', JSON.stringify(this.selectedFile));
  // }
  previewImage() {
    if (!this.selectedFile) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        this.imageUrl = result; // Establece la imagen previa en tu componente
        localStorage.setItem('profileImage', result); // Guarda la imagen en localStorage como Base64
      } else {
        console.error('El resultado del FileReader no es una cadena.');
      }
    };
    
    reader.onerror = (error) => {
      console.error('Error al leer el archivo:', error);
    };
  
    reader.readAsDataURL(this.selectedFile);
  }
  
  uploadImage() {
    // Aquí implementarías la lógica para subir la imagen al servidor
    // Puedes usar HttpClient de Angular para hacer una solicitud POST al backend
    // Por ejemplo:
    // this.http.post('url_del_backend', formData).subscribe(response => {
    //   console.log('Imagen subida exitosamente', response);
    // });
  }

}
