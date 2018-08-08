import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {
    name: 'tech',
    pw: 'tech'
  };

  constructor(public navCtrl: NavController, public authProvider: AuthProvider, private alertCtrl: AlertController) {
  }
  /*LOGIN*/ 
  loginUser(){
    this.authProvider.login(this.user.name, this.user.pw).then(success => {
      if (success){
        this.navCtrl.setRoot('MenuPage');
    }
  }).catch(err => {
    let alert = this.alertCtrl.create({
      title: 'Login failed',
      message: 'Please check your credentials.',
      buttons: ['OK']
    });
    alert.present();
  });
}
}
