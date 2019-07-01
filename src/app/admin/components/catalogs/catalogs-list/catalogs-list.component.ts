import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogService } from '../../../../catalog/services/catalog.service';
import { Catalog } from '../../../../catalog/model/catalog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material';

@Component({
  selector: 'app-catalogs-list',
  templateUrl: './catalogs-list.component.html',
  styleUrls: ['./catalogs-list.component.css']
})
export class CatalogsListComponent implements OnInit {

  constructor(private catalogService: CatalogService, private router: Router) { }
  catalogs: Catalog[];

  ngOnInit() {
    this.catalogService.getCatalogs().subscribe((catalogs) => {
      this.catalogs = catalogs;
    });
  }

  editCatalog(catalog: Catalog) {
    this.router.navigate(['admin/catalog-edit', catalog.id]);
  }

  addCatalog() {
    this.router.navigate(['admin/catalog-add']);
  }

  deleteCatalog(catalog) {
    // tslint:disable-next-line:no-shadowed-variable
    this.catalogService.deleteCatalog(catalog.id).subscribe((catalog) => {
      this.catalogService.getCatalogs().subscribe((catalogs) => {
        this.catalogs = catalogs;
      });
    });
  }

}
