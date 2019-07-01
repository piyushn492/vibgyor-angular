import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/catalog/services/catalog.service';
import { Observable } from 'rxjs';
import { Catalog } from 'src/app/catalog/model/catalog';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX()' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(400, style({ transform: 'translateX(100%)' }))
      ])
    ]),
  ]
})
export class CatalogListComponent implements OnInit {

  constructor(private catalogService: CatalogService, private router: Router) { }

  catalogs: Catalog[];

  ngOnInit() {
    this.catalogService.getCatalogs().subscribe(
      (catalogs) => {
        this.catalogs = catalogs;
      });
  }

  catalogDetails(selecteCatalog: Catalog) {
    this.router.navigate(['/catalog/view', selecteCatalog.id]);
  }

}
