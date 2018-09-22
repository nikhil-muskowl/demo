import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AccountPage } from '../account/account';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { FormServiceProvider } from '../../../providers/form-service/form-service';
import { UsersProvider } from '../../../providers/users/users';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AlertController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private heading = 'Sign-in';
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private loginForm: FormGroup;
  private responseData;

  private status;
  private messageTitle;
  private message;

  private username;
  private password;

  public formErrors = {
    username: '',
    password: '',
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private formServiceProvider: FormServiceProvider,
    private usersProvider: UsersProvider,
    private loadingProvider: LoadingProvider,
    private alertCtrl: AlertController) {
    this.username = '';
    this.password = '';

    this.createForm();
  }

  public createForm() {
    this.loginForm = this.formBuilder.group({
      username: [this.username, Validators.compose([
        Validators.required
      ])],
      password: [this.password,
      Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
    });

    this.loginForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formServiceProvider.validateForm(this.loginForm, this.formErrors, true)
    });
  }

  public save() {
    // mark all fields as touched
    this.formServiceProvider.markFormGroupTouched(this.loginForm);
    if (this.loginForm.valid) {
      this.loadingProvider.present();
      this.usersProvider.login(this.loginForm.value).subscribe(
        response => {
          this.responseData = response;
          console.log(this.responseData);

          this.status = this.responseData.status;
          this.message = this.responseData.message;

          if (!this.status) {
            this.messageTitle = 'Warning!';
            if (this.responseData.result) {
              this.responseData.result.forEach(element => {
                if (element.id == 'username') {
                  this.formErrors.username = element.text
                }
                if (element.id == 'password') {
                  this.formErrors.password = element.text
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

            this.usersProvider.setData(this.responseData.result);

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
                  text: 'Go to Account',
                  handler: () => {
                    this.navCtrl.setRoot(AccountPage);
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
      this.formErrors = this.formServiceProvider.validateForm(this.loginForm, this.formErrors, false);
    }
  }

  ionViewDidLoad() {

  }

  public goToRegister() {
    this.navCtrl.setRoot(RegisterPage);
  }


}
