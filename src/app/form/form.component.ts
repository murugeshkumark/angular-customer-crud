import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customer.service';
import { DeleteConsentDialogComponent } from '../dialogBoxes/delete-consent-dialog/delete-consent-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
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
  customerForm:FormGroup;

  constructor(public dialog: MatDialog, location: Location
    , private route: ActivatedRoute, private customerServiceObj: CustomerService) {
    this.location = location;
  }

  ngOnInit() {

    // get the Route Parameters here and assign the id to customerId
    // if the id is 0 then it is refered to new entry mode
    // if the id is greater than 0 then it is refered to edit mode
    // If it is in edit mode the customer detail should be fetched and displayed in the form.

    this.route.paramMap.subscribe((res) => {
      this.customerId = parseInt(res.get('id'));

      if (this.customerId > 0) {
        this.getCustomer(this.customerId);
      }
    });

  }

  getCustomer(id) {
    // get the customer detail
 
    
  }

  onSubmitAdd() {
    // Add Customer
    // After adding new customer the page should go back to dashboard

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

  }

}
