import { Component } from '@angular/core';
//import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private fb: FormBuilder) {}

  // Using Form Builder Service
    registrationForm = this.fb.group({
      userName: [''],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      })
    });  

//Using Form Grupo and Forming Control
  // registrationForm = new FormGroup({
  //   userName: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });


  // set value for all field of the form group
  loadApiData(){
    this.registrationForm.setValue({
      userName: 'Daniel Silva',
      password: '12345',
      confirmPassword: '12345',
      address:{
        city: 'Toronto',
        state: 'Ontario',
        postalCode: 'M4P 000'
      }
    });

  }

  // set value for some fields
  loadApiDataPatch() {
    this.registrationForm.patchValue({
      userName: 'Daniel Silva',
      password: '12345',
      confirmPassword: '12345'
    });
}
}
