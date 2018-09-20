import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { FormServiceProvider } from '../../../providers/form-service/form-service';
import { UsersProvider } from '../../../providers/users/users';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AlertController } from 'ionic-angular';
import { AccountPage } from '../account/account';
@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {

  private heading = 'Update Profile';
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private detailForm: FormGroup;
  private responseData;

  private name;
  private email;
  private contact;
  private image;

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
    this.fillData();
    this.createForm();
  }

  public fillData() {
    this.loadingProvider.present();
    this.usersProvider.fillData();
    this.name = this.usersProvider.name;
    this.email = this.usersProvider.email;
    this.contact = this.usersProvider.contact;
    this.image = this.usersProvider.image;
    this.loadingProvider.dismiss();
  }

  public formErrors = {
    name: '',
    email: '',
    contact: '',
  };

  public createForm() {
    this.detailForm = this.formBuilder.group({
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
    });

    this.detailForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formServiceProvider.validateForm(this.detailForm, this.formErrors, true)
    });
  }

  public save() {
    // mark all fields as touched
    this.formServiceProvider.markFormGroupTouched(this.detailForm);
    if (this.detailForm.valid) {
      this.loadingProvider.present();
      this.usersProvider.updateDetails(this.detailForm.value).subscribe(
        response => {
          this.responseData = response;
      
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
                    this.usersProvider.fillData();
                  }
                },
                {
                  text: 'Go to Account',
                  handler: () => {
                    this.usersProvider.fillData();
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
      this.formErrors = this.formServiceProvider.validateForm(this.detailForm, this.formErrors, false);
    }
  }
}
