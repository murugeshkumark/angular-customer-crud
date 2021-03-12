import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customer.service';
import { DeleteConsentDialogComponent } from '../dialogBoxes/delete-consent-dialog/delete-consent-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Customer } from '../customer';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  // Use Reactive Forms

  customerId: number;
  location: Location
  // use customerForm as formGroup
  // refer the html file add the form controls and also add 'id' in the formGroup
  customerForm: FormGroup;

  constructor(public dialog: MatDialog,
    location: Location,
    private route: ActivatedRoute,
    private customerServiceObj: CustomerService) {
    this.location = location;
    this.loadData(new Customer());
  }

  ngOnInit() {

    // get the Route Parameters here and assign the id to customerId
    // if the id is 0 then it is refered to new entry mode
    // if the id is greater than 0 then it is refered to edit mode
    // If it is in edit mode the customer detail should be fetched and displayed in the form.

    this.route.paramMap.subscribe((res) => {
      this.customerId = parseInt(res.get('id'));

      if (this.customerId > 0) {
        let customer = this.getCustomer(this.customerId);

        if (customer != undefined) {
          customer.subscribe(c => {
            this.loadData(c);
          });
        }

      }
    });

  }

  private loadData(c: Customer) {


    if (c != null) {

      this.customerForm = new FormGroup({
        firstName: new FormControl(c.firstName),
        lastName: new FormControl(c.lastName),
        email: new FormControl(c.email),
        mobileNumber: new FormControl(c.mobileNumber),
        country: new FormControl(c.country),
        city: new FormControl(c.city),
        address: new FormControl(c.address),
        pinCode: new FormControl(c.pinCode),
        id: new FormControl(c.id)
      });
    }


  }

  getCustomer(id: any) {
    // get the customer detail
    return this.customerServiceObj.getCustomer(id);

  }

  onSubmitAdd() {
    // Add Customer


    const newCustomer = this.extractData();

    const resCustomer = this.customerServiceObj.addNewCustomer(this.customerForm.value);


    // After adding new customer the page should go back to dashboard

    if (resCustomer != undefined) {
      resCustomer.subscribe(c => {
        this.loadData(c);

      });
    }

    this.location.back();


  }

  private extractData() {
    const customer = new Customer;
    customer.id = this.customerForm.get('id').value;
    customer.firstName = this.customerForm.get('firstName').value;
    customer.lastName = this.customerForm.get('lastName').value;
    customer.email = this.customerForm.get('email').value;
    customer.mobileNumber = this.customerForm.get('mobileNumber').value;
    customer.country = this.customerForm.get('country').value;
    customer.city = this.customerForm.get('city').value;
    customer.address = this.customerForm.get('address').value;
    customer.pinCode = this.customerForm.get('pinCode').value;
    return customer;
  }

  onSubmitEdit(flag: number) {
    // if flag is 0 -> update Customer detail
    // if flag is 1 -> delete Customer detail
    // In delete mode you must open the delete mat-dialog 
    // delete mat-dialog component is inside dialogBoxes/delete-consent-dialog folder
    // send json data to DeleteConsentDialogComponent
    // eg:{data:{name:customername,id:customerid}}
    // customername = firstName+' '+lastName eg: william shakespeare 
    // After delete or update navigate back to dashboard


    const customer = this.extractData();


    if (flag == 0) {            //update
      const resCustomer = this.customerServiceObj.updateCustomer(this.customerForm.value);
      if (resCustomer != undefined) {
        resCustomer.subscribe(c => {
          this.loadData(c);

        });
      }
      this.location.back();
    } else if (flag == 1) {     //delete
      console.log("delete customer " + this.customerId);
      // open the delete mat-dialog

      let dialogRef = this.dialog.open(DeleteConsentDialogComponent, {
        data: { name: customer.firstName + ' ' + customer.lastName, id: customer.id },
      });


      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);

        if (result == true) {
          console.log("deleting... " + this.customerId)
          this.customerServiceObj.deleteCustomer(this.customerId);
          this.location.back();
        }


      });

    } else {
      this.location.back();
    }


  }


}
