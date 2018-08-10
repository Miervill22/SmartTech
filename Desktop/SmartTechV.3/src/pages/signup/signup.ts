import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import firebase from'firebase';
import { isPresent } from '../../../node_modules/ionic-angular/umd/util/util';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  name: string = "";
  email: string = "";
  password: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public ToastCtrl: ToastController,
  public AlertCtrl: AlertController) {
  }

  signup(){
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then((data)=> {

      console.log(data)
        let newUser: firebase.User = data.user;
        /**first add user then updateprofile */
        newUser.updateProfile({
          displayName: this.name,
          /**INSERT PHOTO HERE */
         photoURL: ""
        }).then(()=> {
          console.log("Profile Updated")

          this.AlertCtrl.create({
            title: "Account Created",
            message: "Your account has been created successfully.",
            buttons: [
              {
                text: "OK",
                handler:() => {
                  //navigate to the menu page
                  /* this.navCtrl.setRoot(wala pako kabaw) */
                }
              }
            ]
          }).present();
        }).catch((err)=> {
          console.log(err)
        } )
        
    }).catch((err)=> {
      console.log(err)

      this.ToastCtrl.create({
        message: err.message,
        duration: 3000
      }).present();
    })
  }
  goBack(){
    this.navCtrl.pop();
  }
 /*  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  } */

}
