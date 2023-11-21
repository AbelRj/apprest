import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription, from, tap } from 'rxjs';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {InicioPage } from '../inicio/InicioPage';
import { CategoryI } from '../product';

@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.page.html',
  styleUrls: ['./agregarproducto.page.scss'],
})
export class AgregarproductoPage implements OnInit {
  category:CategoryI[]=[];
  form: FormGroup;
  private _Subscription: Subscription = new Subscription();

  constructor(private _productSvc: ProductService,
    public navCtrl: NavController,
    public fb:FormBuilder) {
      this.form = this.fb.group({
        name:["",[Validators.required]],
        price:["",[Validators.required]],
        categories:[]
      });
     }

  ngOnInit() {
    this.getCategories();
  }
  getCategories(): void{
    this._productSvc.getAllCategories().subscribe((categories: CategoryI[])=>{
      this.category = categories;
      console.log('category', this.category);
    });
  }

  ngOnDestroy(): void {
    this._Subscription.unsubscribe();
  }

 
addProduct(){
  console.log('hola')
  if(this.form.invalid){
    return;
  }
  const product = this.form.value;
  this._Subscription.add(
    this._productSvc.newProduct(product).pipe(
      tap( () =>InicioPage.prototype.getAllProducts() )
    ).subscribe()
  )
  this.navCtrl.navigateRoot('inicio');
}
isValidField(field: string):string{
  const validatedField = this.form.get(field);
  return (!validatedField?.valid && validatedField?.touched)
    ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
}
/*
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

      */
      /*
    console.log(product);
    this._Subscription.add(
      this._productSvc.postProduct(product).pipe(
        tap( () =>InicioPage.prototype.getAllProducts() )
      ).subscribe()
    )
    this.navCtrl.navigateRoot('inicio');
 */
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

