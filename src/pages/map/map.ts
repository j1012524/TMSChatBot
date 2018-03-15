import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';


declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker: any;
  currentLocation: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentLocation = navParams.get('loc');
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
    let latLng = new google.maps.LatLng(this.currentLocation.split('|')[1].split('\n')[0], this.currentLocation.split('|')[1].split('\n')[1]);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: this.map.getCenter()
    });

    // let content = "<h4>Information!</h4>";
    //
    // this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}
