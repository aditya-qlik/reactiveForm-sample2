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
  // rows: any = [];
  // columns: any = [
  //   { name: 'FirstName' },
  //   { name: 'LastName' },
  //   { name: 'Email' },
  //   { name: 'Street' },
  //   { name: 'PostalCode' },
  //   { name: 'PhoneNumber' }
  // ];
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
      postcode: ['', Validators.required],
      phonenumber: this.fb.array([
        this.initNumber()
      ])
    });
  }
  initNumber() {
    return this.fb.group({
      number: ['', Validators.required]
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

  // addTable() {
  //   // console.log(JSON.stringify(this.signUpInfo, null, 4))
  //     const row = {
  //       firstName: this.signUpForm.value.fName,
  //       lastName: this.signUpForm.value.lName,
  //       email: this.signUpForm.value.emailId,
  //       street: this.signUpForm.value.addresses[0].street,
  //       postalCode: this.signUpForm.value.addresses[0].postcode,
  //       phoneNumber: this.signUpForm.value.addresses[0].phonenumber[0].number
  //     }
  //     this.rows.push(row)
  //     this.rows = [...this.rows];
  // }

  // addressTable(index:any){
  //   for (let i in this.signUpInfo[index].address){
  //     this.rowsAddress.push(
  //       {
  //         Street: this.signUpInfo[index].address[i].street,
  //         Postcode: this.signUpInfo[index].address[i].postcode
  //       }
  //     )
  //   }
  // }

  onReset() {
    this.submitted = false;
    this.signUpForm.reset();
  }
}
