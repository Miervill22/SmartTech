import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { SignupPage } from '../pages/signup/signup';
import { MapsPage } from '../pages/maps/maps';


/**FIREBASE INTEGRATION */
import firebase  from 'firebase';
import { AngularFireModule } from  "angularfire2";


var config = {
  apiKey: "AIzaSyD8st0IGcQ6iR4pHK17hH8qZHganpA_z_U",
  authDomain: "smarttech-6a3b5.firebaseapp.com",
  databaseURL: "https://smarttech-6a3b5.firebaseio.com",
  projectId: "smarttech-6a3b5",
  storageBucket: "smarttech-6a3b5.appspot.com",
  messagingSenderId: "1056441819574"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })

@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    MapsPage
    
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    MapsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,

    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
