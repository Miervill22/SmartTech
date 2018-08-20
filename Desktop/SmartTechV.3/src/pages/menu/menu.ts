import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, App } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'Firebase';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  username = '';
  pages = [];

  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController, private authProvider: AuthProvider, private appCtrl: App) {
  }
  
  /**array of pages */

  ionViewWillEnter() {
     /** redirect sa technician page */
    if(this.authProvider.isTech()){
      this.pages = [
        { title: 'Technician Dashboard', page: 'TechnicianPage', icon: 'home' }
        
        /** need sya usa ka page */
      ];
      this.openPage('TechnicianPage');
       /** redirect sa userpage */
    }else {
      this.pages = [
        { title: 'User Dashboard', page: 'MapsPage', icon: 'home' }
        /**need pa  sya usa ka page */
      ];
      this.openPage('MapsPage');
    }
    this.username = this.authProvider.currentUser.name;

  }
   openPage(page) {
      this.nav.setRoot(page);
   }

   logout(){
     this.authProvider.logout();
     this.appCtrl.getRootNav().setRoot('LoginPage'); // RIGHT
   }

   ionViewCanEnter(){
     return this.authProvider.isLoggedIn();
   }
}
