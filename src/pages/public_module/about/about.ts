import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../../providers/language/language';

import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  private heading = 'About us';
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public languageProvider: LanguageProvider,
    public translate: TranslateService
    ) {

    this.translate.setDefaultLang(this.languageProvider.getLanguage());
    this.translate.use(this.languageProvider.getLanguage());
    this.translate.get('about').subscribe((text: string) => {
      this.heading = text;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
