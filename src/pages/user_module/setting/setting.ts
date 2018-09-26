import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { LoadingProvider } from '../../../providers/loading/loading';
import { LanguageProvider } from '../../../providers/language/language';
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  private heading = 'Setting';

  private language: string;
  private responseData;
  private languages;

  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public languageProvider: LanguageProvider,
    public loadingProvider: LoadingProvider
  ) {
    this.language = this.languageProvider.getLanguage();
    this.getLanguages();    
  }

  public getLanguages() {
    this.loadingProvider.present();
    this.languageProvider.getLanguages().subscribe(response => {
      this.responseData = response;
      this.languages = this.responseData.data;
      this.loadingProvider.dismiss();
    }, err => {
      console.error(err);
    }
    );
    this.loadingProvider.dismiss();
  }

  onChange(data: any) {  
    this.languageProvider.setLanguage(data);
  }

  ionViewDidLoad() {
   
  }

}
