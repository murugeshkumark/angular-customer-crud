import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Injectable } from '@angular/core';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const customers: Customer[] =
      [
        {
          id: 1565896455528,
          firstName: 'Customerone',
          lastName: 'CT',
          email: 'customermail1@gmail.com',
          mobileNumber: 8111111111,
          country: 'xxxxx',
          city: 'xxxxx',
          address: 'one xxx,xxxx xxxx xxxx xx,xxxx-xxx',
          pinCode: 100001
        },
        {
          id: 1565896455529,
          firstName: 'Customertwo',
          lastName: 'CV',
          email: 'customermail2@gmail.com',
          mobileNumber: 2222222222,
          country: 'xxxxx',
          city: 'xxxxx',
          address: 'two xxx,xxxx xxxx xxxx xx,xxxx-xxx',
          pinCode: 100002
        },
        {
          id: 1565896455530,
          firstName: 'Customerthree',
          lastName: 'KL',
          email: 'customermail3@gmail.com',
          mobileNumber: 3333333333,
          country: 'xxxxx',
          city: 'xxxxx',
          address: 'three xxx,xxxx xxxx xxxx xx,xxxx-xxx',
          pinCode: 100003
        },
        {
          id: 1565896455531,
          firstName: 'Customerfour',
          lastName: 'MH',
          email: 'customermail4@gmail.com',
          mobileNumber: 4444444444,
          country: 'xxxxx',
          city: 'xxxxx',
          address: 'four xxx,xxxx xxxx xxxx xx,xxxx-xxx',
          pinCode: 1000444
        }
        , {
          id: 1565896455532,
          firstName: 'Customerfive',
          lastName: 'VH',
          email: 'customermail5@gmail.com',
          mobileNumber: 5555555555,
          country: 'xxxxx',
          city: 'xxxxx',
          address: 'five xxx,xxxx xxxx xxxx xx,xxxx-xxx',
          pinCode: 100055
        }

      ]
      ;
    return { customers };
  }
  genId(customers: Customer[]): number {
    return Date.now();
  }
}
