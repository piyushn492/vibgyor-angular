import { Pipe, PipeTransform } from '@angular/core';
import { Paint } from '../../products/model/paint';

@Pipe({ name: 'productFilter' })
export class ProductFilter implements PipeTransform {
    transform(values: Paint[], field: string[]) {
        values.filter(function (value) {
            // return value.categoryId.includes(field.forEach(field))
            // return field.includes(value.categoryId);

            // tslint:disable-next-line:no-shadowed-variable
            return values.forEach((value) =>
                field.includes(value.categoryId));
        });
    }
}
