import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-consent-dialog',
  templateUrl: './delete-consent-dialog.component.html',
  styleUrls: ['./delete-consent-dialog.component.css']
})
export class DeleteConsentDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data) {

     }

  ngOnInit() {

  }
 
}
