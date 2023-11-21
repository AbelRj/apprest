import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { checkLoginGuard } from './auth/guards/check-login.guard';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./auth/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./productos/inicio/inicio.module').then( m => m.InicioPageModule), canActivate: [checkLoginGuard] 
  },
  {
    path: 'agregarproducto',
    loadChildren: () => import('./productos/agregarproducto/agregarproducto.module').then( m => m.AgregarproductoPageModule), canActivate: [checkLoginGuard] 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
