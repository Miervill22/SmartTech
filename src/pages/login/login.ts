import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupPage } from '../signup/signup';
/**import firebase first before using */
import firebase from 'firebase';
import { MapsPage } from '../maps/maps';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string ="";
  password: string ="";
  /**disregard the bottom it contains error its from rolebase auth v.5 */
  /* user = {
    name: 'tech',
    pw: 'tech'
  }; */
                                                        /**para sa mga message */
  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
  }
  /**login dude loginnnn */
  login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then((user) => {
      console.log(user)

      this.toastCtrl.create({
        message: "Welcome " + user.user.displayName,
        duration: 3000
      }).present();

      this.navCtrl.setRoot(MapsPage)
    }).catch((err) => {
      console.log(err)

      this.toastCtrl.create({
        message: err.message,
        duration: 3000
      }).present();
    })
  }
  /**redirect to signup page */
  gotoSignup(){
    this.navCtrl.push(SignupPage);
    
  }
  /*LOGIN*/ 
 /*  loginUser(){
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
} */

}
