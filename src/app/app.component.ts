import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, FormArray } from '@angular/forms';
import { DataTableComponent } from './data-table/data-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactiveForm-sample';
  signUpForm: FormGroup | any;
  submitted = false;
  
  @ViewChild(DataTableComponent) datatable: any;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      addresses: this.fb.array([
        this.initAddress(),
      ]),
      emailId: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  initAddress() {
    return this.fb.group({
      street: ['', Validators.required],
      postcode: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]\d*$/)])],
      phonenumber: this.fb.array([
        this.initNumber()
      ])
    });
  }
  initNumber() {
    return this.fb.group({
      number: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]\d*$/)])]
    })
  }
  addAddress() {
    const control = <FormArray>this.signUpForm.controls['addresses'];
    control.push(this.initAddress());
  }

  removeAddress(i: number) {
    const control = <FormArray>this.signUpForm.controls['addresses'];
    control.removeAt(i);
  }

  addNumber(address: any): void {
    const control = <FormArray>address.controls.phonenumber;
    control.push(this.initNumber());
  }

  removeNumber(address: any, j: number) {
    const control = <FormArray>address.controls.phonenumber;
    control.removeAt(j);
  }

  onSubmit() {
    this.submitted = true;

    // console.log(this.signUpForm)

    if (this.signUpForm.invalid) {
      return;
    }
    
    this.datatable.addTable(this.signUpForm.value);

    // console.log(JSON.stringify(this.rows, null, 4))
    // console.log(JSON.stringify(this.signUpForm.value, null, 4))

  }

  onReset() {
    this.submitted = false;
    this.signUpForm.reset();
  }
}
