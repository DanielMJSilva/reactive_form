import { Component, OnInit } from '@angular/core';
//import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PasswordValidator } from './shared/password.validator';
import { forbiddenNameValidador, forbiddenNameValidador1 } from './shared/user-name.validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  [x: string]: any;

  registrationForm!: FormGroup;
  
  //using a getter that returns a form control
  get userName(){
    return this.registrationForm.controls.userName;
  }

  get email(){
    return this.registrationForm.controls.email;
  }

  get alternateEmails(){
    return this.registrationForm.controls.alternateEmails as FormArray;
  }
  //push forme control into form array
  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  constructor(private fb: FormBuilder,
    _registrationService: RegistrationService ) {}

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
      }),
      // add email using dynamic form control
      alternateEmails: this.fb.array([])
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

  onSubmit(){
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
        (response: any) => console.log('Success!', response),
        (error: any) => console.error('Error', error)
      );
  }
}
