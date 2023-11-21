import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  hide: boolean = true;

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private authSvc: AuthService,
    private router: Router) { 

    this.formularioLogin = this.fb.group({
      username: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    })

  }

  ngOnInit() {
  }
/*
  async ingresar() {
    var f = this.formularioLogin.value;
  
    const usuarioString = localStorage.getItem('usuario');
  
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
  
      if (usuario.nombre === f.nombre && usuario.password === f.password) {
        console.log('Ingresado');
        localStorage.setItem('ingresado','true');
        this.navCtrl.navigateRoot('inicio');
        // Aquí puedes redirigir al usuario a la página que corresponda después de iniciar sesión.
      } else {
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Los datos que ingresaste son incorrectos.',
          buttons: ['Aceptar']
        });
  
        await alert.present();
      }
    } 
    //console.log(usuarioString);
  }
  */
  onLogin(){
    console.log(this.formularioLogin.value);
    const formValue = this.formularioLogin.value;
    this.authSvc.login(formValue).subscribe(
      user=>{
        console.log(user);
        if(user){
          this.router.navigate(['/inicio']);
        }
        else{
          this.router.navigate(['/login']);
        }
      }
    )
  }

  isValidField(field: string):string{
    const validatedField = this.formularioLogin.get(field);
    return (!validatedField?.valid && validatedField?.touched)
      ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }
  

}