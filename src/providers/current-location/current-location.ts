import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class CurrentLocationProvider {

  private latitude;
  private longitude;

  constructor(public http: HttpClient, private geolocation: Geolocation) {    
    this.setLocation();
  }

  public setLocation() {    
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {      
      window.localStorage.setItem('latitude', String(data.coords.latitude));
      window.localStorage.setItem('longitude', String(data.coords.longitude));
     });      
  }

  public clearLocation(){
    window.localStorage.removeItem('latitude');
    window.localStorage.removeItem('longitude');
  }

  public getLatitude() {    
    this.latitude = window.localStorage.getItem('latitude');
    return this.latitude;
  }

  public getLongitude() { 
    this.longitude = window.localStorage.getItem('longitude');  
    return this.longitude;
  }

}
