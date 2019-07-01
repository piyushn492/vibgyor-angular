import { Component, OnInit } from '@angular/core';
import { BookConsultantService } from '../../../home/services/book-consultant.service';
import { BookConsultant } from '../../../home/model/book-consultant';
import { ArraySortPipe } from '../../../shared/pipes/arraySort.pipes';
import { CatalogService } from '../../../catalog/services/catalog.service';
import { Catalog } from '../../../catalog/model/catalog';
import { ProductService } from '../../../products/services/product.service';
import { UserService } from '../../../user/services/user.service';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArraySortPipe]
})
export class HomeComponent implements OnInit {

  constructor(private bookService: BookConsultantService, private sort: ArraySortPipe,
    private catalogService: CatalogService, private productService: ProductService,
    private userService: UserService, private cartService: CartService) { }
  bookRequests: BookConsultant[];
  catalogs: Catalog[];
  users: number;
  orders: number;
  revenue: number;
  totalPrice: number;
  catalog: number;
  products: number;

  // pie
  public pieChartLabels;
  public pieChartDatas;
  public pieChartType = 'pie';
  pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)'
      ]
    }
  ];

  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';

  ngOnInit() {
    this.totalPrice = 0;
    this.userService.getUsers().subscribe((users) => {
      this.users = users.length;
      this.cartService.getAllPlacedProductsAdmin().subscribe((cartOrders) => {
        this.orders = cartOrders.length;
        cartOrders.forEach((carts) => {
          if (carts.carts !== null) {
            carts.carts.forEach((cart) => {
              this.totalPrice = this.totalPrice + cart.price;
            });
          }
        });
      });
    });

    this.productService.getProducts().subscribe((paints) => {
      this.products = paints.length;
    });


    this.bookService.getRequets().subscribe((requests) => {
      this.bookRequests = requests;
      this.sort.transform(this.bookRequests, 'id');
    });

    this.catalogService.getCatalogs().subscribe((catalogs) => {
      this.pieChartLabels = [];
      this.pieChartDatas = [];
      this.catalogs = catalogs;
      this.catalog = this.catalogs.length;
      // if (this.catalogs[0].id !== undefined) {
      this.catalogs.forEach((catalog) => {
        this.pieChartLabels.push(catalog.catalogName);
        this.catalogService.searchCatalogs(catalog.id).subscribe((paints) => {
          this.pieChartDatas.push(paints.length);
          // console.log(this.pieChartLabels);
          // console.log(this.pieChartDatas);
        },
        );

        // this.pieChartDatas = pieChartData;
        // this.pieChartLabels = pieChartLabel;
      });
      // }
    });

  }

  done(value) {
    this.bookService.deleteRequest(value.id).subscribe((request) => {
      this.bookService.getRequets().subscribe((requests) => {
        this.bookRequests = requests;
      });
    });
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
