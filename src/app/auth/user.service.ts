import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';



import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { UserI, UserResponseI } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { 
   //this.checkToken().subscribe();
  }

  

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }
  private readonly TOKEN ='token';

  login(user:UserI): Observable<UserResponseI | void>{
    return this.http.post<UserResponseI>(environment.baseUrl+'/auth/login', user)
    .pipe(
      map((user:UserResponseI)=>{
        this.saveToken(user);
        this.loggedIn.next(true);
        return user;
      })
    );
  }
  NewUser(user: UserI): Observable<UserResponseI | void> {
    return this.http.post<UserResponseI>(environment.baseUrl + '/user', user)
      .pipe(
        map((user: UserResponseI) => {
          this.saveToken(user);
          this.loggedIn.next(true);
          return user;
        }),
        catchError((error) => {
          console.error('Error en el registro:', error);
          // Puedes lanzar el error nuevamente si es necesario
          return throwError(error);
        })
      );
  }
  
  private saveToken(user: UserResponseI){
    const {message, ...rest}= user;
    localStorage.setItem(this.TOKEN,JSON.stringify(rest.token).replace(/['"]+/g,''));
    localStorage.setItem('user',JSON.stringify(rest))
  }

  logout():void {
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
 
  checkToken(): Observable<boolean>{
    const token = localStorage.getItem(this.TOKEN);
    const helper = new JwtHelperService();
    if(!token){
      this.logout();
      return new Observable<boolean>();
    }
    const isExpired = helper.isTokenExpired(token);
    if(isExpired){
      this.logout();
      return new Observable<boolean>();
    }
      this.loggedIn.next(true);
      return new Observable<boolean>();
    
  }

}
