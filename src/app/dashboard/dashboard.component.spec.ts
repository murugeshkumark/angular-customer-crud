import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';


import { AppRoutingModule } from '../app-routing.module';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { CustomerService } from '../customer.service';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { JsonC } from '../testing/testTest';
import { of } from 'rxjs';
import { DeleteConsentDialogComponent } from '../dialogBoxes/delete-consent-dialog/delete-consent-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
describe('DashboardComponent', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let customerSerMock: any;
  let dialogvalue: any;

  let maTref = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
  maTref.afterClosed.and.returnValue(of(false));

  dialogvalue = jasmine.createSpyObj('MatDialog', ['open']);
  dialogvalue.open.and.returnValue(maTref);

  customerSerMock = jasmine.createSpyObj('CustomerService', ['getCustomers', 'deleteCustomer']);
  customerSerMock.deleteCustomer.and.returnValue(of(null));
  customerSerMock.getCustomers.and.returnValue(of(JsonC.getJson()));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, FormComponent, DeleteConsentDialogComponent],
      imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatTableModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientModule
      ],
      providers: [
        { provide: CustomerService, useValue: customerSerMock },
        { provide: MatDialog, useValue: dialogvalue },
        { provide: MatDialogRef, useValue: maTref },
        { provide: APP_BASE_HREF, useValue: '/dashboard' }
      ],

    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [DeleteConsentDialogComponent],
      },
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnInit should call getCustomers()', () => {
    let spy = spyOn(component, 'getCustomers');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('getCustomers should call CustomerService function getCustomers()', () => {
    component.getCustomers();
    expect(customerSerMock.getCustomers).toHaveBeenCalled();
  });

  it('getCustomers should assign response data to dataSource', (done: DoneFn) => {
    component.getCustomers();
    customerSerMock.getCustomers().subscribe(res => {
      expect(component.dataSource.data).toEqual(res);
      done();
    });
  });

  it('filterTable() should filter the table', () => {
    component.dataSource = new MatTableDataSource(JsonC.getJson());
    component.filterTable('1565896455530');
    expect(component.dataSource.filteredData.pop()).toEqual(JsonC.getJsonCustomer(1));
  });

  it('deleteCustomer should open the dialog', () => {
    component.deleteCustomer('CustomerthreeKL', 1565896455530);
    expect(dialogvalue.open).toHaveBeenCalledWith(DeleteConsentDialogComponent, {
      data: { name: 'CustomerthreeKL', id: 1565896455530 }
    });
  });

  it('Should not delete when dialog returns false', (done: DoneFn) => {

    maTref.afterClosed.and.returnValue(of(false));

    component.deleteCustomer('CustomerthreeKL', 1565896455530);
    expect(maTref.afterClosed).toHaveBeenCalled();
    maTref.afterClosed().subscribe(value => {
      expect(value).toBe(false);
      expect(customerSerMock.deleteCustomer).not.toHaveBeenCalled();
      done();
    });

  });

  it('Should delete when dialog returns true', (done: DoneFn) => {

    maTref.afterClosed.and.returnValue(of(true));

    component.deleteCustomer('CustomerthreeKL', 1565896455530);

    maTref.afterClosed().subscribe(value => {
      expect(value).toBe(true);
      expect(customerSerMock.deleteCustomer).toHaveBeenCalledWith(1565896455530);
      done();
    });

  });

  it('when click add-button, it should navigate to form page', fakeAsync(() => {
    let location: Location = TestBed.get(Location);
    const element: DebugElement = fixture.debugElement;
    let btn = element.query(By.css("#addCustomer")).nativeElement;
    btn.click();
    tick();
    expect(location.path()).toBe('/form/0');
  }));


});


