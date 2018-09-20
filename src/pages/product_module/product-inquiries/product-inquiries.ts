import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { FormServiceProvider } from '../../../providers/form-service/form-service';
import { UsersProvider } from '../../../providers/users/users';
import { ProductsProvider } from '../../../providers/products/products';
import { ProductInquiriesProvider } from '../../../providers/product-inquiries/product-inquiries';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../../public_module/home/home';


@IonicPage()
@Component({
  selector: 'page-product-inquiries',
  templateUrl: 'product-inquiries.html',
})
export class ProductInquiriesPage {

  private heading = 'Product Inquiry';
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private contactForm: FormGroup;
  private responseData;

  private types: any = [];
  private selectTypes: any = [];
  private name;
  private email;
  private contact;
  private inquiry;
  private product_id;

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
    public productsProvider: ProductsProvider,
    private inquiriesProvider: ProductInquiriesProvider,
    public platform: Platform,
  ) {
    this.product_id = this.navParams.get('product_id');  
    this.getDetail();  
    this.getTypes();    
    this.fillData();
    this.createForm();
  }

  public getDetail() {
    this.loadingProvider.present();
    this.productsProvider.getDetail(this.product_id).subscribe(
      response => {
        this.responseData = response;        
        this.heading = this.responseData.result[0].title;        
        this.loadingProvider.dismiss();
      },
      err => {
        console.error(err);
        this.loadingProvider.dismiss();
      }
    );
    return event;
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
    error: '',
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
    return event;
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

      var data = {
        product_id: this.product_id,
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        contact: this.contactForm.value.contact,
        inquiry: this.contactForm.value.inquiry,
        types: this.contactForm.value.types,
      }

      this.inquiriesProvider.send(data).subscribe(
        response => {
          this.responseData = response;

          console.log(this.responseData);

          this.status = this.responseData.status;
          this.message = this.responseData.message;

          if (!this.status) {
            this.messageTitle = 'Warning!';
            if (this.responseData.result) {
              this.responseData.result.forEach(element => {
                if (element.id == 'product_id') {
                  this.formErrors.error = element.text
                }
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
