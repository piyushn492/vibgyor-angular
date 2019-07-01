import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Paint } from '../../../../products/model/paint';
import { CatalogService } from '../../../../catalog/services/catalog.service';
import { ProductService } from '../../../../products/services/product.service';
import { Catalog } from '../../../../catalog/model/catalog';
import { ProductsEditComponent } from '../products-edit/products-edit.component';
import { ProductsAddComponent } from '../products-add/products-add.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  displayedColumns = ['name', 'imageUrl', 'price', 'edit', 'delete'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private catalogService: CatalogService, private productService: ProductService, public dialog: MatDialog) { }
  paints: Paint[];
  catalogs: Catalog[];

  ngOnInit() {

    this.productService.getProducts().subscribe((paints) => {
      this.paints = paints;
      this.dataSource = new MatTableDataSource(this.paints);
      this.dataSource.paginator = this.paginator;
    });

    this.catalogService.getCatalogs().subscribe((catalogs) => {
      this.catalogs = catalogs;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(value) {
    // tslint:disable-next-line:prefer-const
    let dialogRef = this.dialog.open(ProductsEditComponent, {
      width: '250px',
      data: { value }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.productService.getProducts().subscribe((paints) => {
        this.paints = paints;
        this.dataSource = new MatTableDataSource(this.paints);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  delete(element) {
    this.productService.deleteProduct(element.value.id);
  }

  addPaint() {
    // tslint:disable-next-line:prefer-const
    let dialogRef = this.dialog.open(ProductsAddComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.productService.getProducts().subscribe((paints) => {
        this.paints = paints;
        this.dataSource = new MatTableDataSource(this.paints);
        this.dataSource.paginator = this.paginator;
      });
    });
  }


}

