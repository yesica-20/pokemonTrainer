import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  myForm: FormGroup = new FormGroup({});
  isAdult: boolean = false;
  age: number = 0;
  constructor(private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      hobby: [''],
      birthday: ['', Validators.required],
      document: [''],
    });
    this.myForm.get('birthday')?.valueChanges.subscribe((value) => {
      this.isAdult = this.validateAge();
      this.updateDocumentValidator();
    });
  }

  ngOnInit() {
    this.myForm.get('birthday')?.valueChanges.subscribe((value) => {
      this.isAdult = this.validateAge();
    });
  }

  validateAge() {
    let dateSelect = this.myForm.get('birthday')?.value;
    const birthDate = new Date(dateSelect);
    const today = new Date();
    this.age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      this.age--;
    }

    return this.age >= 18 ? true : false;
  }

  submitForm() {
    if (this.myForm && this.myForm.valid) {
      let dataUser = {
        ...this.myForm.value,
        age: this.age,
      };
      localStorage.setItem('userData', JSON.stringify(dataUser));
      this.router.navigate(['/select-pokemon']);
    }
  }

  updateDocumentValidator(): void {
    const documentControl = this.myForm.get('document');
    if (documentControl) {
      if (this.age < 18) {
        documentControl.clearValidators();
      } else {
        documentControl.setValidators([Validators.required]);
      }
      documentControl.updateValueAndValidity();
    }
  }
}
