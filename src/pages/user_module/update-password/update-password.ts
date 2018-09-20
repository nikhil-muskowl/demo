import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AccountPage } from '../account/account';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { FormServiceProvider } from '../../../providers/form-service/form-service';
import { UsersProvider } from '../../../providers/users/users';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AlertController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-update-password',
  templateUrl: 'update-password.html',
})
export class UpdatePasswordPage {

  private heading = 'Update Password';
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private passForm: FormGroup;
  private responseData;

  private status;
  private messageTitle;
  private message;
  
  private password;
  private passconf;

  public formErrors = {    
    password: '',
    passconf: '',
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private formServiceProvider: FormServiceProvider,
    private usersProvider: UsersProvider,
    private loadingProvider: LoadingProvider,
    private alertCtrl: AlertController) {
    this.passconf = '';
    this.password = '';

    this.createForm();
  }

  public createForm() {
    this.passForm = this.formBuilder.group({      
      password: [this.password,
      Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      passconf: [this.passconf,
      Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
    });

    this.passForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formServiceProvider.validateForm(this.passForm, this.formErrors, true)
    });
  }

  public save() {
    // mark all fields as touched
    this.formServiceProvider.markFormGroupTouched(this.passForm);
    if (this.passForm.valid) {
      this.loadingProvider.present();
      this.usersProvider.updatePassword(this.passForm.value).subscribe(
        response => {
          this.responseData = response;

          this.status = this.responseData.status;
          this.message = this.responseData.message;

          if (!this.status) {
            this.messageTitle = 'Warning!';
            if (this.responseData.result) {
              this.responseData.result.forEach(element => {                
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
      this.formErrors = this.formServiceProvider.validateForm(this.passForm, this.formErrors, false);
    }
  }

  ionViewDidLoad() {

  }



}
