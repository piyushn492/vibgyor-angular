import { Component, OnInit, Inject, EventEmitter, Input, Output } from '@angular/core';
import { Paint } from 'src/app/catalog/model/paint';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/products/services/product.service';

@Component({
  selector: 'app-price-estimator',
  templateUrl: './price-estimator.component.html',
  styleUrls: ['./price-estimator.component.css']
})
export class PriceEstimatorComponent implements OnInit {

  @Input() paintId: number;
  @Output() public childEvent = new EventEmitter();
  paint: Paint;
  squareFt: number;

  paintReq: number;
  price: number;
  reminder: number;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getProductsById(this.paintId).subscribe((paint) => {
      this.paint = paint[0];
    });
  }

  calculateFare() {
    if (this.squareFt < 20) {
      this.paintReq = 1;
      this.price = this.paint.price;
      this.childEvent.emit(this.price);
      document.getElementById('price').style.display = 'block';
    } else {
      this.reminder = this.squareFt / 20;
      this.paintReq = this.reminder;
      this.price = this.paint.price * this.paintReq;
      this.childEvent.emit(this.price);
      document.getElementById('price').style.display = 'block';
    }
  }
}
