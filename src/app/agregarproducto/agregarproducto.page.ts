import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Subscription, from, tap } from 'rxjs';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {InicioPage } from '../inicio/InicioPage';

@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.page.html',
  styleUrls: ['./agregarproducto.page.scss'],
})
export class AgregarproductoPage implements OnInit {
  formularioAddProduct: FormGroup;
  private _Subscription: Subscription = new Subscription();

  constructor(private _productSvc: ProductService,
    public navCtrl: NavController,
    public fb:FormBuilder) {
      this.formularioAddProduct = this.fb.group({
        nombre: new FormControl('', Validators.required),
        descripcion: new FormControl('', Validators.required),
        precio: new FormControl('', Validators.required)
       
      })
     }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    this._Subscription.unsubscribe();
  }

 

  guardarProduct(){
    if(this.formularioAddProduct.invalid){
      return;
    }
    const nombre = this.formularioAddProduct.value.nombre;
      const descripcion = this.formularioAddProduct.value.descripcion;
      const precio = this.formularioAddProduct.value.precio;
      const product = {
        name: nombre,
        description: descripcion,
        price: precio
      };
      
    console.log(product);
    this._Subscription.add(
      this._productSvc.postProduct(product).pipe(
        tap( () =>InicioPage.prototype.getAllProducts() )
      ).subscribe()
    )
    this.navCtrl.navigateRoot('inicio');
 
  }
 /* 
  addProduct() {
    console.log('add');
    const product = {
      name: this.Nnombre,
      description: this.Ndescripcion,
      price: this.Nprecio
    }
    this._productSvc.addProduct(product).pipe(
      tap( () => this.getProductos() )
    ).subscribe()
  }
 */
}
