import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import firebase from'firebase';
import { isPresent } from '../../../node_modules/ionic-angular/umd/util/util';
import { MapsPage } from '../maps/maps';
import { AsyncAction } from '../../../node_modules/rxjs/scheduler/AsyncAction';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  name: string = "";
  email: string = "";
  password: string = "";
  role: string = "User";

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
                  this.navCtrl.setRoot(MapsPage)
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
    firebase.firestore().collection("user").add({
      role: this.role,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      email: firebase.auth().currentUser.uid,
      name: firebase.auth().currentUser.displayName
    }).then((doc) =>{
        console.log(doc)
       }).catch((err) => {
         console.log(err)
       })
  }
  goBack(){
    this.navCtrl.pop();
  }
 /*  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  } */

}
