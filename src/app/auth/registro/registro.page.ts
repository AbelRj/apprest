import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../user.service';
import { Router } from '@angular/router';
import { UserI } from '../interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  hide: boolean = true;

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
  formularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    public navCtrl: NavController,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    public alertController: AlertController 
  ) {
    this.formularioRegistro = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  onRegistro() {
    if (this.formularioRegistro.valid) {
      const user: UserI = {
        username: this.formularioRegistro.value.username,
        password: this.formularioRegistro.value.password
      };
  
      this.authService.NewUser(user).subscribe(
        (response) => {
          // Handle successful registration here
          console.log('Registro exitoso:', response);
          this.presentToast('Usuario registrado exitosamente');
          this.router.navigate(['/login']);
        },
        (error) => {
          // Handle registration error here
          console.error('Registro fallido:', error);
        }
      );
    }
  }

  async presentToast(message: string) {
    const alert = await this.alertController.create({
      header: 'Registrado',
      message: 'Se registraron sus datos',
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  isValidField(field: string): string {
    const validatedField = this.formularioRegistro.get(field);
    return (!validatedField?.valid && validatedField?.touched)
      ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }
}
