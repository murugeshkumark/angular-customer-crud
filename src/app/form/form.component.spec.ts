import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';

import { AppRoutingModule } from '../app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JsonC } from '../testing/testTest';

import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { DeleteConsentDialogComponent } from '../dialogBoxes/delete-consent-dialog/delete-consent-dialog.component';


describe('FormComponent', () => {

  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let customerSerMock: any;
  let activatedRoute: ActivatedRouteStub;

  let dialogvalue: any;

  let maTref = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
  maTref.afterClosed.and.returnValue(of(false));

  dialogvalue = jasmine.createSpyObj('MatDialog', ['open']);
  dialogvalue.open.and.returnValue(maTref);

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
    customerSerMock = jasmine.createSpyObj('CustomerService', ['getCustomer', 'addNewCustomer', 'updateCustomer', 'deleteCustomer']);
    customerSerMock.getCustomer.and.returnValue(of(JsonC.getJsonCustomer(1)));
    customerSerMock.addNewCustomer.and.returnValue(of(null));
    customerSerMock.updateCustomer.and.returnValue(of(null));
    customerSerMock.deleteCustomer.and.returnValue(of(null));

  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent, DashboardComponent],
      imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatTableModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: CustomerService, useValue: customerSerMock },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: MatDialog, useValue: dialogvalue },
        { provide: MatDialogRef, useValue: maTref },
      ],
    })
      .compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(FormComponent);


    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('ngOnInit should get param and call getCustomer', (done: DoneFn) => {
    activatedRoute.setParamMap({ id: 1565896455530 });
    let spy = spyOn(component, 'getCustomer');
    component.ngOnInit();

    activatedRoute.paramMap.subscribe((res) => {
      expect(component.customerId).toBe(1565896455530);
      expect(spy).toHaveBeenCalledWith(1565896455530);
      done();
    });


  });

  it('ngOnInit should get param and should not call getCustomer when new entry', (done: DoneFn) => {
    activatedRoute.setParamMap({ id: 0 });
    var spy = spyOn(component, 'getCustomer');
    component.ngOnInit();

    activatedRoute.paramMap.subscribe((res) => {
      expect(component.customerId).toBe(0);
      expect(spy).not.toHaveBeenCalled();
      done();
    });
  });

  it('getCustomer() should use getCustomer service function', () => {
    activatedRoute.setParamMap({ id: 1565896455530 });
    component.getCustomer(1565896455530);
    expect(customerSerMock.getCustomer).toHaveBeenCalledWith(1565896455530)
  });

  it('getCustomer service function should assign the response data to customerForm', (done: DoneFn) => {
    activatedRoute.setParamMap({ id: 1565896455530 });
    component.getCustomer(1565896455530);
    customerSerMock.getCustomer(1565896455530).subscribe((res) => {
      expect(component.customerId).toBe(1565896455530);
      expect(component.customerForm.value).toEqual(res);
      done();
    });
  });


  it('onSubmitAdd should use addNewCustomer service function', () => {
    activatedRoute.setParamMap({ id: 0 });
    let obj = JsonC.getJsonCustomer(1);
    obj.id = 0;
    component.customerForm.setValue(obj);
    component.onSubmitAdd();
    expect(customerSerMock.addNewCustomer).toHaveBeenCalledWith(obj);
  });

  it('After adding new customer, the page should go back to dashboard', () => {
    activatedRoute.setParamMap({ id: 0 });
    let obj = JsonC.getJsonCustomer(1);
    obj.id = 0;
    component.customerForm.setValue(obj);

    let spy = spyOn(component.location, 'back');

    component.onSubmitAdd();
    customerSerMock.addNewCustomer(obj).subscribe(res => {
      expect(spy).toHaveBeenCalled();
    });
  });


  it('onSubmitEdit should use customerServiceObj service function when flag is 0', () => {
    activatedRoute.setParamMap({ id: 1565896455530 });
    let obj = JsonC.getJsonCustomer(1);

    component.customerForm.setValue(obj);
    component.onSubmitEdit(0);

    expect(customerSerMock.updateCustomer).toHaveBeenCalledWith(obj);
  });

  it('After updating customer details, the page should go back to dashboard', () => {
    activatedRoute.setParamMap({ id: 1565896455530 });
    let obj = JsonC.getJsonCustomer(1);
    component.customerForm.setValue(obj);
    let spy = spyOn(component.location, 'back');
    component.onSubmitEdit(0);
    customerSerMock.updateCustomer(obj).subscribe(res => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('onSubmitEdit should open dialog when flag is 1', () => {
    activatedRoute.setParamMap({ id: 1565896455530 });
    let obj = JsonC.getJsonCustomer(1);

    component.customerForm.setValue(obj);
    component.onSubmitEdit(1);
    expect(dialogvalue.open).toHaveBeenCalledWith(DeleteConsentDialogComponent, {
      data: { name: 'Customerthree KL', id: 1565896455530 }
    });

  });

  it('Should not delete when dialog returns false', (done: DoneFn) => {

    maTref.afterClosed.and.returnValue(of(false));
    component.customerId = 1565896455530;
    component.onSubmitEdit(1);

    maTref.afterClosed().subscribe(value => {
      expect(value).toBe(false);
      expect(customerSerMock.deleteCustomer).not.toHaveBeenCalled();
      done();
    });

  });

  it('Should delete when dialog returns true and should go back to dashboard', (done: DoneFn) => {

    maTref.afterClosed.and.returnValue(of(true));
    let spy = spyOn(component.location, 'back');
    component.customerId = 1565896455530;
    component.onSubmitEdit(1);


    maTref.afterClosed().subscribe(value => {
      expect(value).toBe(true);
      expect(customerSerMock.deleteCustomer).toHaveBeenCalledWith(1565896455530);
      expect(spy).toHaveBeenCalled();
      done();
    });

  });


});
