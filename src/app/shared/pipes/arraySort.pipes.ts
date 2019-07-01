import { Pipe, PipeTransform } from '@angular/core';
import { Paint } from '../../catalog/model/paint';

@Pipe({
  name: 'sort'
})
export class ArraySortPipe  implements PipeTransform {
  paints: Paint[] = [];

  transform(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return 1;
      } else if (a[field] > b[field]) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }

  transform2(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

  transform3(array: Paint[], price: number): Paint[] {
    array.forEach((paint) => {
      if (paint.price <= price) {
        this.paints.push(paint);
      }
    });
    return this.paints;
  }
}
