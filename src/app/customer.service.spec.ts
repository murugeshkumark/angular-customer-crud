import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { JsonC } from './testing/testTest';

describe('CustomerService', () => {
  const apiUrl = 'api/customers';
  let httpTestingController: HttpTestingController;
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);


  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getCustomers should use get request and should return the observable', (done: DoneFn) => {
    const service: CustomerService = TestBed.get(CustomerService);
    service.getCustomers().subscribe(value => {

      expect(value).toEqual(JsonC.getJson());
      done();
    });
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(JsonC.getJson());
  });

  it('Test1 getCustomer should use get request and should return Observable value', (done: DoneFn) => {
    const service: CustomerService = TestBed.get(CustomerService);
    service.getCustomer(1565896455530).subscribe(value => {
      expect(value).toEqual(JsonC.getJsonCustomer(1));
      done();
    });
    const req = httpTestingController.expectOne(apiUrl + '/1565896455530');
    expect(req.request.method).toEqual('GET');
    req.flush(JsonC.getJsonCustomer(1));

  });

  it('Test2 getCustomer should use get request and should return Observable value', (done: DoneFn) => {
    const service: CustomerService = TestBed.get(CustomerService);

    service.getCustomer(1565896455532).subscribe(value => {
      expect(value).toEqual(JsonC.getJsonCustomer(0));
      done();
    });
    const req1 = httpTestingController.expectOne(apiUrl + '/1565896455532');
    expect(req1.request.method).toEqual('GET');
    req1.flush(JsonC.getJsonCustomer(0));

  });

  it('deleteCustomer should Delete the customer and should use delete request', (done: DoneFn) => {
    const service: CustomerService = TestBed.get(CustomerService);

    service.deleteCustomer(1565896455532).subscribe(value => {
      expect(value).toEqual(null);
      done();
    });
    const req = httpTestingController.expectOne(apiUrl + '/1565896455532');
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);

  });

  it('addNewCustomer should Add the customer and should use POST request', (done: DoneFn) => {
    const service: CustomerService = TestBed.get(CustomerService);
    var obj = JsonC.getJsonCustomer(0);
    obj.id = 0;
    service.addNewCustomer(obj).subscribe(value => {
      expect(value).toEqual(JsonC.getJsonCustomer(0));
      done();
    });
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(obj);
    req.flush(JsonC.getJsonCustomer(0));

  });

  it('updateCustomer should update the customer and should use PUT request', (done: DoneFn) => {
    const service: CustomerService = TestBed.get(CustomerService);
    service.updateCustomer(JsonC.getJsonCustomer(0)).subscribe(value => {
      expect(value).toBe(null);
      done();
    });
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(JsonC.getJsonCustomer(0));
    req.flush(null);

  });

});
