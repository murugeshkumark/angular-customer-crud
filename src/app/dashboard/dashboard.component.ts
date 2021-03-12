import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { DeleteConsentDialogComponent } from '../dialogBoxes/delete-consent-dialog/delete-consent-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class DashboardComponent implements OnInit {

  dataSource: MatTableDataSource<Customer>;

  columnsToDisplay = ['id', 'firstName', 'lastName', 'email', 'mobileNumber'];

  expandedElement: Customer;

  constructor(private customerServiceObj: CustomerService, public dialog: MatDialog) { }

  ngOnInit() {
    // get the Customers
    console.log("init")
    this.dataSource = new MatTableDataSource<Customer>();

    this.getCustomers();

    const customers = this.customerServiceObj.getCustomers();

    if (typeof customers != undefined) {
      customers.subscribe(cs => {
        this.dataSource.data = cs;
      })
    }

  }

  deleteCustomer(customerName, customerId) {
    console.log("delete customer " + customerId);
    // open the delete mat-dialog

    let dialogRef = this.dialog.open(DeleteConsentDialogComponent, {
      data: { name: customerName, id: customerId },
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 

      if(result == true){
        this.customerServiceObj.deleteCustomer(customerId);
      }


    });

   

    // delete mat-dialog component is inside dialogBoxes/delete-consent-dialog folder
    // after deleting customer Update the table
    // send the json data to DeleteConsentDialogComponent
    // eg:{data:{name:cusomtername,id:customerid}}

  }

  getCustomers() {
    // get the Customers
    console.log("get customers");
    return this.customerServiceObj.getCustomers();
  }

  filterTable(filterValue: string) {
    // filter the table
    console.log("filter customer " + filterValue);
    this.dataSource.filter = filterValue;
  }

}
