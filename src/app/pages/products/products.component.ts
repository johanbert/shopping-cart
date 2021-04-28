import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  listKeys:any;
  list:any;
  products:ProductModel[] = [];
  products2:any;
  // product:ProductModel = new ProductModel();
  productsKeys:any;
  constructor( private cartService: CartService) {
    // this.product = {
    //   id:4,
    //   sku: 111222336,
    //   name:'Tuberia PVC',
    //   description: 'tuberias',
      
    // }
   }

  ngOnInit(): void {
    this.getProducts();
    // this.getProducts2();
  }

  // newProduct(){
  //   this.cartService.createProduct(this.product)
  //     .subscribe((res) => {
  //       console.log('res',res);
  //     })
  // }

  getProducts(){
    this.cartService.readProducts()
      .subscribe((res) => {
        console.log(res);
        this.products = res;
      })
  }
  
  getProducts2(){
    this.cartService.readProducts2()
      .subscribe((res) => {
        console.log('res2',res);
        this.productsKeys = res;
        this.products2 = res;
        this.listKeys = Object.keys(res)
        // this.list = [res]
        // console.log('res22',[res]);
      })
  }

}
