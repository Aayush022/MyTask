import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../services/data-share.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {

  data;
  id;
  constructor(private dataService: DataShareService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    let value = localStorage.getItem('res');
    let fullData = JSON.parse(value);
    this.data = fullData[this.id];
  }

}
