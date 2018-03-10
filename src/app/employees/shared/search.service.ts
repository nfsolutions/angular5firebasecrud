import {Injectable} from '@angular/core';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Employee} from './employee.model';
import {Criteria} from './criteria';

@Injectable()
export class SearchService {
  employeeList: AngularFireList<any>;
  result: [any];

  constructor(public firebase: AngularFireDatabase) {
  }

  search(criteria: Criteria): AngularFireList<Employee> {
    // this.result = this.firebase.database.ref('employees').limitToLast(100);
    this.employeeList = this.firebase.list('/employees', ref => ref.orderByChild('name').equalTo(criteria.query))
    return this.employeeList;
  }
}
