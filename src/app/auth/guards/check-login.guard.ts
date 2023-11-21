import { Injectable } from '@angular/core';

import { Observable, map, take } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../user.service';


@Injectable({
  providedIn: 'root'
})

export class checkLoginGuard implements CanActivate {
  constructor(
    private authSvc: AuthService,
    private router: Router

  ){}
  canActivate(): Observable<boolean>{
    return this.authSvc.isLogged.pipe(
      take(1),
      map((isLogged: boolean) =>{
        if(!isLogged){
          this.router.navigate(['/login']);
        }
        return isLogged;
      }) 
    );
    
  }

}
/*
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class checkLoginGuard implements CanActivate {
  constructor(
    private authSvc: AuthService
  ){}
  canActivate(): Observable<boolean>{
    return this.authSvc.isLogged.pipe(
      take(1),
      map((isLogged: boolean) => !isLogged),
    );
    
  }

}
*/