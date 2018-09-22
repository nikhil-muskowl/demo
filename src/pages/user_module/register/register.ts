import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { FormServiceProvider } from '../../../providers/form-service/form-service';
import { UsersProvider } from '../../../providers/users/users';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private heading = 'Sign-up';
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private regsiterForm: FormGroup;
  private responseData;

  private name;
  private email;
  private contact;
  private password;
  private passconf;

  private status;
  private messageTitle;
  private message;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private formServiceProvider: FormServiceProvider,
    private usersProvider: UsersProvider,
    private loadingProvider: LoadingProvider,
    private alertCtrl: AlertController
  ) {
    this.name = '';
    this.email = '';
    this.contact = '';
    this.password = '';
    this.passconf = '';
    this.createForm();
  }

  public formErrors = {
    name: '',
    email: '',
    contact: '',
    password: '',
    passconf: '',
  };

  public createForm() {
    this.regsiterForm = this.formBuilder.group({
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
      password: [this.password,
      Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      passconf: [this.passconf, Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      ])],
    });

    this.regsiterForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formServiceProvider.validateForm(this.regsiterForm, this.formErrors, true)
    });
  }

  public save() {
    // mark all fields as touched
    this.formServiceProvider.markFormGroupTouched(this.regsiterForm);
    if (this.regsiterForm.valid) {
      this.loadingProvider.present();
      this.usersProvider.register(this.regsiterForm.value).subscribe(
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
                if (element.id == 'password') {
                  this.formErrors.password = element.text
                }
                if (element.id == 'passconf') {
                  this.formErrors.passconf = element.text
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
                  text: 'Login',
                  handler: () => {
                    this.navCtrl.setRoot(LoginPage);
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
      this.formErrors = this.formServiceProvider.validateForm(this.regsiterForm, this.formErrors, false);
    }
  }

  ionViewDidLoad() {
  }

}
