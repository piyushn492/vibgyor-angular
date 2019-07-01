import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalog } from '../../../../catalog/model/catalog';
import { CatalogService } from '../../../../catalog/services/catalog.service';

@Component({
  selector: 'app-catalog-add',
  templateUrl: './catalog-add.component.html',
  styleUrls: ['./catalog-add.component.css']
})
export class CatalogAddComponent implements OnInit {

  constructor(private catalogService: CatalogService, private router: Router, private _formBuilder: FormBuilder) { }
  catalog: Catalog;
  firstFormGroup: FormGroup;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      catalogName: ['', Validators.required],
      catalogImageUrl: ['', Validators.required],
      anotherImage: ['', Validators.required]
    });
  }

  addCatalog(value) {
    this.catalog = {
      'catalogName': value['catalogName'],
      'catalogImageUrl': value['catalogImageUrl'],
      'anotherImage': value['anotherImage']
    } as Catalog;

    this.catalogService.addCatalogs(this.catalog).subscribe((catalog) => {
      this.catalog = catalog;
      this.router.navigate(['admin/catalogs/list']);
    });
  }

  back() {
    // tslint:disable-next-line:no-unused-expression
    this.router.navigate(['admin/catalogs/list']);
  }
}
