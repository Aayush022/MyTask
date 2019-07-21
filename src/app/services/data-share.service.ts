import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private data = {};

  setOption(value) {
    // debugger;
    this.data = value;
    // console.log(this.data);
    localStorage.setItem('bankData', JSON.stringify(this.data));
  }
  getOption() {
    let value = localStorage.getItem('bankData');
    return JSON.parse(value);
  }
}
