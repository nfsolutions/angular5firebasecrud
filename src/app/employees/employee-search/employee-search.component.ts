import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SearchService} from '../shared/search.service';
import {Criteria} from '../shared/criteria';
import {AngularFireList} from 'angularfire2/database';
import {Employee} from '../shared/employee.model';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css'],
  providers: [SearchService]
})
export class EmployeeSearchComponent implements OnInit {

  searchResultEmployeeList: Employee[] = [];
  result: AngularFireList<any>;

  constructor(public searchService: SearchService) {
  }

  public criteria: Criteria;

  ngOnInit() {
    this.criteria = {
      query: 'test'
    };
    this.resetForm();
  }

  onSubmit(searchForm: NgForm) {
    const result: AngularFireList<any> = this.searchService.search(this.criteria);
    result.snapshotChanges().subscribe(item => {
      this.searchResultEmployeeList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.searchResultEmployeeList.push(y as Employee);
      });
    });

    this.resetForm(searchForm);
  }

  resetForm(searchForm?: NgForm) {
    if (searchForm != null) {
      searchForm.reset();
    }
  }
}
