import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paint } from '../../../../products/model/paint';
import { ProductService } from '../../../../products/services/product.service';
import { CatalogService } from '../../../../catalog/services/catalog.service';
import { Catalog } from '../../../../catalog/model/catalog';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProductsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,
    private productService: ProductService, private catalogService: CatalogService) { }
  firstFormGroup: FormGroup;
  paint: Paint;
  catalog: Catalog;
  catalogs: Catalog[];

  ngOnInit() {
    // console.log(this.data.value.quantity);
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      anotherImage: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.firstFormGroup.get('name').setValue(this.data.value.name);
    // this.firstFormGroup.get('categoryName').setValue(this.data.value.categoryName);
    this.firstFormGroup.get('imageUrl').setValue(this.data.value.imageUrl);
    this.firstFormGroup.get('anotherImage').setValue(this.data.value.anotherImage);
    this.firstFormGroup.get('price').setValue(this.data.value.price);
    this.firstFormGroup.get('description').setValue(this.data.value.description);
  }

  Update(value) {
    // console.log(this.data.categoryId);
    this.paint = {
      'id': this.data.value.id,
      'name':  value.name,
      'categoryId': this.data.value.categoryId,
      'imageUrl': value.imageUrl,
      'anotherImage': value.anotherImage,
      'price': value.price,
      'description': value.description,
      'quantity': this.data.value.quantity,
      'furtherDetails': this.data.value.furtherDetails,
    } as Paint;
    // console.log(this.paint);

    this.productService.updatePaint(this.paint).subscribe();

  }
}
