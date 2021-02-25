import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    public alertController: AlertController
  ) { }

  email: string;
  password: string;
  passwordShown: boolean = false;
  passwordToggleIcon = 'eye';

  ngOnInit() {
  }

  public togglePassword(): void {

    this.passwordShown = !this.passwordShown;

    if (this.passwordToggleIcon == 'eye') {

      this.passwordToggleIcon = 'eye-off';
    } else {

      this.passwordToggleIcon = 'eye';
    }

  }

  async login() {

    try {

      await this.authService.login(this.email, this.password);
      this.router.navigateByUrl('/lists');
    
    } catch (error) {
    
      this.presentAlert();
    }
  }

  async presentAlert() {
    
    const alert = await this.alertController.create({
      header: 'Failed to connect',
      subHeader: 'Cannot access the account requested',
      message: 'The provided e-mail or password did not mach with our database',
      buttons: ['OK']
    });

    await alert.present();
  }

}
