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
    { name: 'EmailId' },
    { name: 'Street' },
    { name: 'PostalCode' },
    { name: 'PhoneNumber' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getTableData(signUpForm: any) {
    const { fName: fname, lName: lname, addresses: address, emailId: email } = signUpForm;
    const { streetName, postalCode, phoneNo } = this.getAddress(address);
    // console.log(fname + " " + lname + " " + email + " " + streetName + " " + postalCode + " " + phoneNumber)
    return { fname, lname, email, streetName, postalCode, phoneNo };
  }

  getAddress(addresses: any) {
    const [{ street: streetName, postcode: postalCode, phonenumber: telephoneNo }] = addresses;
    const phoneNo = this.getPhoneNumber(telephoneNo);
    return { streetName, postalCode, phoneNo };
  }

  getPhoneNumber(telephoneNo: any) {
    const [{ number: teleNumber }] = telephoneNo;
    return teleNumber;
  }

  addTable(signUpForm: any) {
    // console.log(JSON.stringify(signUpForm, null, 4));
    const { fname, lname, email, streetName, postalCode, phoneNo } = this.getTableData(signUpForm);
    const row = {
      firstName: fname,
      lastName: lname,
      emailId: email,
      street: streetName,
      postalCode: postalCode,
      phoneNumber: phoneNo
    };
    this.rows.push(row);
    this.rows = [...this.rows];
  }

}
