import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService } from '../../../../catalog/services/catalog.service';
import { Catalog } from '../../../../catalog/model/catalog';

@Component({
  selector: 'app-catalog-edit',
  templateUrl: './catalog-edit.component.html',
  styleUrls: ['./catalog-edit.component.css']
})
export class CatalogEditComponent implements OnInit {

  constructor(private activatedRouter: ActivatedRoute,
    private catalogService: CatalogService, private _formBuilder: FormBuilder, private router: Router) { }
  id: number;
  private sub: any;
  catalog: Catalog;
  firstFormGroup: FormGroup;

  ngOnInit() {
    this.sub = this.activatedRouter.params.subscribe(params => {
      this.id = +params['id'];

      this.catalogService.getCatalogeById(this.id).subscribe((catalog) => {
        this.catalog = catalog;
        this.firstFormGroup.get('catalogName').setValue(this.catalog[0].catalogName);
        this.firstFormGroup.get('catalogImageUrl').setValue(this.catalog[0].catalogImageUrl);
        this.firstFormGroup.get('anotherImage').setValue(this.catalog[0].anotherImage);
      });
   });

   this.firstFormGroup = this._formBuilder.group({
    catalogName: ['', Validators.required],
    catalogImageUrl: ['', Validators.required],
    anotherImage: ['', Validators.required]
  });
  }

  updateImage(value) {
    this.catalog = {
      'id': this.catalog[0].id,
      'catalogName': value['catalogName'],
      'catalogImageUrl': value['catalogImageUrl'],
      'anotherImage': value['anotherImage']
    } as Catalog;

    this.catalogService.updateCatalog(this.catalog).subscribe((catalog) => {
      this.catalog = catalog;
      this.router.navigate(['admin/catalogs/list']);
    });
  }

  back() {
    // tslint:disable-next-line:no-unused-expression
    this.router.navigate(['admin/catalogs/list']);
  }

}
