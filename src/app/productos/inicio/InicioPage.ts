import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription, tap } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/user.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, OnDestroy {
  isLogged = this.authSvc.isLogged;
  @Output() toogleSidenav = new EventEmitter<void>();
  private _Subscription: Subscription = new Subscription();
  products: any[] = [];
  constructor(
    private _productSvc: ProductService,
    public navCtrl: NavController,
    private authSvc: AuthService,) {
  }
  onToggleSidenav(){
    this.toogleSidenav.emit();
    }
    
    onLogout(): void {
      this.authSvc.logout();
    }
  ngOnInit() {
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    this._Subscription.unsubscribe();
  }
  public getAllProducts() {
    this._Subscription.add(
      this._productSvc.getAllProducts().pipe(
        tap(res => this.products = res)
      ).subscribe()
    )
   
  }

  sitioagregar() {
    this.navCtrl.navigateRoot('agregarproducto');
}
}
