import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailsService } from '../services/details.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { takeWhile, debounceTime } from 'rxjs/operators';
import { state } from '@angular/animations';
import { DataShareService } from '../services/data-share.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  missionForm: FormGroup;
  cityForm: FormGroup;
  displayedColumns: string[] = ['select', 'id', 'bank_name', 'city'];
  missionData = new MatTableDataSource<IMissionElement>();
  newData = new MatTableDataSource<IMissionElement>();
  tableData;
  selected;
  selection = new SelectionModel<string>(true, []);
  public searchText: string;
  filteredValues = {
    city: ''
  };
  city = [{ cities: '' }, { cities: 'MUMBAI' }, { cities: 'DELHI' }, { cities: 'PUNE' }, { cities: 'BANGALORE' }, { cities: 'CHANDIGARH' }];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dataService: DetailsService, private formBuilder: FormBuilder,
    private share: DataShareService, private route: Router) { }

  ngOnInit() {

    if (!localStorage.getItem('res')) {
      this.fetchAllData();
    }
    else {
      let values = localStorage.getItem('res');
      let value = JSON.parse(values);
      console.log(value);
      this.createTable(value);
    }
    this.selected = this.missionData;
    this.missionForm = this.formBuilder.group({
      filterInput: [],
      city:[]
    });
    this.missionForm.controls.city.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.missionData.filterPredicate = (data = value, filter: string) => {
          return data.city == filter;
        };
        this.missionData.filter = value.trim();
      });
      this.missionForm.controls.city.valueChanges.subscribe((positionFilterValue) => {
        this.missionData.filter = positionFilterValue;
      });
    this.missionForm.controls.filterInput.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        console.log(this.tableData);

        // this.missionData.filterPredicate = this.tableData.filterPredicate;
        // console.log(data);
        // console.log(this.missionData);

        this.tableData.filter = data.trim().toLowerCase();
      });
  }
  fetchAllData() {
    this.dataService.getProducts().subscribe(res => {
      let tData = res;
      console.log(Object.keys(tData).length);
      for (let i = 0; i < tData.length; i++) {
        tData[i]['fav'] = false;
      }
      // console.log('table', tData);

      this.createTable(tData);
      localStorage.setItem('res', JSON.stringify(tData));
    });

  }
  createTable(data: IMissionElement[]) {
    // console.log('Hello', data);
    this.missionData.paginator = this.paginator;
    this.missionData.data = data;
    for (let i = 0; i < data.length; i++) {
      this.missionData.data[i]['ind'] = i + 1;
    }
    console.log('Data', this.missionData);
    this.tableData = this.missionData;
  }
  bankDetails(id) {
    console.log(this.missionData.data[id - 1]);
    let val = id - 1;
    this.share.setOption(this.missionData.data[id - 1]);
    this.route.navigate(['/bank/',  val]);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.missionData.filter = filterValue;
  }
  onChange(event, index, item) {
    let id = index - 1;
    console.log(event.checked, index - 1);
    this.missionData.data[id]['fav'] = event.checked;
    localStorage.setItem('res', JSON.stringify(this.missionData.data));
  }
}

export interface IMissionElement {

  address: string;
  bank_name: string;
  branch: string;
  city: string;
  district: string;
  ind: number;
  ifsc: string;
  state: string;
  fav: boolean;
}
export interface IFavUpdate {
  ind: number;
  fav: boolean;
}
