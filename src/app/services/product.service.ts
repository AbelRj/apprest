import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  constructor(
    private _http: HttpClient
  ) { }

  getProducts():Observable<any> {
    return this._http.get('http://localhost:3000/products');
  }
  postProduct(product:any):Observable<any> {
    return this._http.post('http://localhost:3000/products', product);
  }

 
  /*
  postProducts(products: any[]): Observable<any> {
    const requests = products.map(product => {
      return this._http.post('http://localhost:3000/products', product);
    });
  
    return forkJoin(requests); // Importar forkJoin de 'rxjs' si no está ya importado
  }
  */
}
