import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  rows: any = [];
  columns: any = [
    { name: 'FirstName' },
    { name: 'LastName' },
    { name: 'Email' },
    { name: 'Street' },
    { name: 'PostalCode' },
    { name: 'PhoneNumber' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
  addTable(signUpForm:any) {
    console.log(JSON.stringify(signUpForm, null, 4))
      const row = {
        firstName: signUpForm.fName,
        lastName: signUpForm.lName,
        email: signUpForm.emailId,
        street:signUpForm.addresses[0].street,
        postalCode: signUpForm.addresses[0].postcode,
        phoneNumber: signUpForm.addresses[0].phonenumber[0].number
      }
      this.rows.push(row)
      this.rows = [...this.rows];
  }

}
