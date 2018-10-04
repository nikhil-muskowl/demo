import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../../providers/language/language';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { FormServiceProvider } from '../../../providers/form-service/form-service';
import { UsersProvider } from '../../../providers/users/users';
import { InquiriesProvider } from '../../../providers/inquiries/inquiries';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CurrentLocationProvider } from '../../../providers/current-location/current-location';

declare var google;
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  private heading = 'Contact us';
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private contactForm: FormGroup;
  private responseData;

  private types: any = [];
  private selectTypes: any = [];
  private name;
  private email;
  private contact;
  private inquiry;

  private status;
  private messageTitle;
  private message;

  private latitude;
  private longitude;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private formServiceProvider: FormServiceProvider,
    private usersProvider: UsersProvider,
    private loadingProvider: LoadingProvider,
    private alertCtrl: AlertController,
    private inquiriesProvider: InquiriesProvider,
    private currentLocationProvider: CurrentLocationProvider,
    public platform: Platform,
    public languageProvider: LanguageProvider,
    public translate: TranslateService
  ) {   
    this.translate.setDefaultLang(this.languageProvider.getLanguage());
    this.translate.use(this.languageProvider.getLanguage());
    this.translate.get('contact').subscribe((text: string) => {
      this.heading = text;
    });

    this.getTypes();    
    this.fillData();
    this.createForm();

    this.latitude = this.currentLocationProvider.getLatitude();
    this.longitude = this.currentLocationProvider.getLongitude();
    this.loadMap();
  }

  public loadMap() {

    this.platform.ready().then(() => {
      let latLng = new google.maps.LatLng(this.latitude, this.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.addMarker();
    });

  }

  public addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  public addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  public fillData() {
    this.loadingProvider.present();
    this.name = this.usersProvider.name;
    this.email = this.usersProvider.email;
    this.contact = this.usersProvider.contact;
    this.inquiry = 'Hi, i need some help!';
    this.loadingProvider.dismiss();
  }

  public formErrors = {
    name: '',
    email: '',
    contact: '',
    inquiry: '',
  };


  public getTypes() {
    this.loadingProvider.present();
    this.inquiriesProvider.getTypes().subscribe(
      response => {
        this.responseData = response;
        this.responseData.data.forEach(element => {

          this.types.push({
            id: element.id,
            title: element.title,
          });          
        });

        this.loadingProvider.dismiss();
      },
      err => {
        console.error(err);
        this.loadingProvider.dismiss();
      }
    );
    
  }

  public createForm() {
    this.contactForm = this.formBuilder.group({
      types: [
        this.selectTypes
      ],
      name: [this.name, Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.required
      ])],
      contact: [this.contact, Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^(0|[1-9][0-9]*)$'),
      ])],
      email: [this.email, Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      inquiry: [this.inquiry, Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(200),
        Validators.required
      ])],
    });

    this.contactForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formServiceProvider.validateForm(this.contactForm, this.formErrors, true)
    });
  }

  public save() {
    // mark all fields as touched
    this.formServiceProvider.markFormGroupTouched(this.contactForm);
    if (this.contactForm.valid) {
      this.loadingProvider.present();
      console.log(this.contactForm.value);
      this.inquiriesProvider.send(this.contactForm.value).subscribe(
        response => {
          this.responseData = response;
          console.log(this.responseData);

          this.status = this.responseData.status;
          this.message = this.responseData.message;

          if (!this.status) {
            this.messageTitle = 'Warning!';
            if (this.responseData.result) {
              this.responseData.result.forEach(element => {

                if (element.id == 'name') {
                  this.formErrors.name = element.text
                }
                if (element.id == 'email') {
                  this.formErrors.email = element.text
                }
                if (element.id == 'contact') {
                  this.formErrors.contact = element.text
                }
                if (element.id == 'inquiry') {
                  this.formErrors.inquiry = element.text
                }

              });
            }

            this.loadingProvider.dismiss();

            let alert = this.alertCtrl.create({
              title: this.messageTitle,
              message: this.message,
              buttons: ['Ok']
            });
            alert.present();
          } else {
            this.messageTitle = 'Sucess!';

            this.loadingProvider.dismiss();

            let alert = this.alertCtrl.create({
              title: this.messageTitle,
              message: this.message,
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {

                  }
                },
                {
                  text: 'Go to Home',
                  handler: () => {
                    this.navCtrl.setRoot(HomePage);
                  }
                }
              ]
            });
            alert.present();
          }
        },
        err => {
          console.error(err);
          this.loadingProvider.dismiss();
        }
      );
    } else {
      this.formErrors = this.formServiceProvider.validateForm(this.contactForm, this.formErrors, false);
    }
  }

}
