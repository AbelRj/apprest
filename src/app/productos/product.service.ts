import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponseI } from '../auth/interfaces/user';
import { CategoryI, ProductI } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product$: Observable<ProductI[]> | undefined;
  categories$:Observable<CategoryI[]> | undefined;
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<ProductI[]>{
    this.product$= this.http.get<ProductI[]>(environment.baseUrl + '/product');
    return this.product$;
  }

  newProduct(product: ProductI): Observable<UserResponseI | void> {
    return this.http.post<UserResponseI>(`${environment.baseUrl}/product`, product)
      .pipe(
        map((res: UserResponseI) => {
          return res;
        }),
        catchError((error) => {
          console.error('Error al agregar el producto:', error);
          return of(); // Devolver un observable vacío en caso de error
        })
      );
  }
  getById(id:string):Observable<ProductI | void>{
    return this.http.get<ProductI>(`${environment.baseUrl}/product/${id}`);
  }
updateProduct(id:string,product:ProductI):Observable<UserResponseI | void>{
  return this.http.put<UserResponseI>(`${environment.baseUrl}/product/${id}`,product)
  .pipe(
    map((res:UserResponseI)=>{
      return res;
    }),
    catchError((error)=>{
      console.error('Error al actualizar el producto:', error);
      return of(); // Devolver un observable vacío en caso de error
    })
  )
}


  delete(id:string):Observable<UserResponseI | void>{
    return this.http.delete<UserResponseI>(`${environment.baseUrl}/product/${id}`)
    .pipe(
      map((res:UserResponseI)=>{
        return res;
      }),
      catchError((error)=>{
        console.error('Error al eliminar el producto:', error);
        return of(); // Devolver un observable vacío en caso de error
      })
    )
  }
  getAllCategories():Observable<CategoryI[]>{
    this.categories$= this.http.get<CategoryI[]>(environment.baseUrl + '/category');
    return this.categories$;
  }
}

 
  /*
  postProducts(products: any[]): Observable<any> {
    const requests = products.map(product => {
      return this._http.post('http://localhost:3000/products', product);
    });
  
    return forkJoin(requests); // Importar forkJoin de 'rxjs' si no está ya importado
  }
  */

