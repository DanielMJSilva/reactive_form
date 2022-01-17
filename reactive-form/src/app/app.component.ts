import { Component, OnInit } from '@angular/core';
//import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from './shared/password.validator';
import { forbiddenNameValidador, forbiddenNameValidador1 } from './shared/user-name.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  registrationForm!: FormGroup;

  //using a getter that returns a form control
  get userName(){
    return this.registrationForm.controls.userName;
  }

  get email(){
    return this.registrationForm.controls.email;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
        // Using Form Builder Service
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidador1, forbiddenNameValidador(/password/)]],
      email: [''],
      subscribe: [false],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      })
      // Cross validation is passed in the Form Group
    }, {validator: PasswordValidator});


    //add conditional validation
    this.registrationForm.get('subscribe')?.valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if (checkedValue){
          //add validator when checkbox is true
          email?.setValidators(Validators.required);
        } else {
          //otherwise remove all validators
          email?.clearValidators();
        }
        // restart validation of email
        email?.updateValueAndValidity();
      });

  }



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
      email: 'daniel@example.com',
      subscribe: true,
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
