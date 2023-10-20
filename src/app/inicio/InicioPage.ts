import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Subscription, tap } from 'rxjs';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, OnDestroy {

  private _Subscription: Subscription = new Subscription();
  products: any[] = [];
  constructor(
    private _productSvc: ProductService,
    public navCtrl: NavController) {
  }

  ngOnInit() {
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    this._Subscription.unsubscribe();
  }
  public getAllProducts() {
    this._Subscription.add(
      this._productSvc.getProducts().pipe(
        tap(res => this.products = res)
      ).subscribe()
    )
   
  }

  sitioagregar() {
    this.navCtrl.navigateRoot('agregarproducto');
}
}
