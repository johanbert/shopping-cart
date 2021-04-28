import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = 'https://shopping-cart-3a61f-default-rtdb.firebaseio.com/'
  private endpoints = {
    products:{
      get: 'products.json',
      post: 'products.json',
      put: 'products.json'
    },
    carts:{
      get: 'carts.json',
      post: 'carts.json',
      put: 'carts.json'
    },
    product_carts:{
      get: 'product_carts.json',
      post: 'product_carts.json',
      put: 'product_carts.json'
    }
  }
  constructor( private http: HttpClient) { }

  readProducts2() {
    return this.http.get(`${this.url}${this.endpoints.products.get}`);
  }
  readProducts() {
    return this.http.get(`${this.url}${this.endpoints.products.get}`)
    .pipe(
      map( this.jsonToArray )
      // map( (res) => this.jsonToArray(res))
    );
  }
  private jsonToArray(productsObj:any){
    const products:ProductModel[] = [];
    if (productsObj ) { 
      Object.keys( productsObj ).forEach( key =>{
        const product: ProductModel = productsObj[key];
        product.id = key;
        products.push(product);
      });
    }
    return products;
  }
  
  createProduct(product:ProductModel){
    return this.http.post(`${this.url}${this.endpoints.products.post}`,product);
  }
}
