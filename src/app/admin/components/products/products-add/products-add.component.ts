import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paint } from '../../../../products/model/paint';
import { ProductService } from '../../../../products/services/product.service';
import { CatalogService } from '../../../../catalog/services/catalog.service';
import { Catalog } from '../../../../catalog/model/catalog';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProductsAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,
    private productService: ProductService, private catalogService: CatalogService) { }

  firstFormGroup: FormGroup;
  paint: Paint;
  catalogs: Catalog[];

  ngOnInit() {
    this.catalogService.getCatalogs().subscribe((catalogs) => {
      this.catalogs = catalogs;
      // console.log(this.catalogs);
    });

    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      categoryName: ['', Validators.required],
      imageUrl: ['', Validators.required],
      anotherImage: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  add(value) {
    // console.log(value);
    this.paint = {
      'name': value.name,
      // 'categoryName':  value.categoryName,
      'imageUrl': value.imageUrl,
      'anotherImage': value.anotherImage,
      'price': value.price,
      'description': value.description,
      'categoryId': value.categoryName
    } as Paint;
    // console.log(this.paint);
    this.productService.addPaint(this.paint).subscribe();

  }

}
