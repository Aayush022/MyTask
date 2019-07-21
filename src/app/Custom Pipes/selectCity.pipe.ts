import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectCity'
})
export class SelectCityPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    console.log(items, field, value);
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }
    console.log(items);

    return items.filter =  items[field].trim();
  }
}
