import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 



declare var google;

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
/*maps */
export class MapsPage {
 options: GeolocationOptions;
 currentPos : Geoposition;  
  @ViewChild('map') mapElement: ElementRef;

  map: any;

  constructor(public navCtrl: NavController, public geolocation : Geolocation) {
  }
  
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapsPage');
  }
  getUserPosition(){
    this.options = {
      enableHighAccuracy : true

  };

  this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

      this.currentPos = pos;      
      console.log(pos);
      this.addMap(pos.coords.latitude,pos.coords.longitude);

  },(err : PositionError)=>{
      console.log("error : " + err.message);
  });
  
  }
  ionViewDidEnter(){
    this.getUserPosition();
    
}   
//Map
addMap(lat,long){

  let latLng = new google.maps.LatLng(lat, long);

  let mapOptions = {
  center: latLng,
  zoom: 14,
  mapTypeId: google.maps.MapTypeId.HYBRID,
  disableDefaultUI:true
  }

  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  this.addMarker();

}
 //Marker
addMarker(){

  let marker = new google.maps.Marker({
  map: this.map,
  animation: google.maps.Animation.DROP,
  position: this.map.getCenter()
  });

  let content = "<p>This is your current position !</p>";          
  let infoWindow = new google.maps.InfoWindow({
  content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
  infoWindow.open(this.map, marker);
  });

} 
  

}
