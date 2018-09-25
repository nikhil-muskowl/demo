import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, Alert } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UsersProvider } from '../providers/users/users';
import { ProductsProvider } from '../providers/products/products';
import { CurrentLocationProvider } from '../providers/current-location/current-location';

import { HomePage } from '../pages/public_module/home/home';
import { AboutPage } from '../pages/public_module/about/about';
import { ContactPage } from '../pages/public_module/contact/contact';

import { AccountPage } from '../pages/user_module/account/account';
import { RegisterPage } from '../pages/user_module/register/register';
import { LoginPage } from '../pages/user_module/login/login';
import { NotificationsPage } from '../pages/notification_module/notifications/notifications';
import { WishlistPage } from '../pages/user_module/wishlist/wishlist';

import { StoriesPage } from '../pages/story_module/stories/stories';
import { ProductsPage } from '../pages/product_module/products/products';
import { ProductCategoriesPage } from '../pages/product_module/product-categories/product-categories';
import { LoadingProvider } from '../providers/loading/loading';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private alert: Alert;

  rootPage: any = HomePage;

  private pages: any;
  private children: any;

  responseData: any;
  categories: any;
  childrens1: any;
  childrens2: any;

  constructor(
    private app: App,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public usersProvider: UsersProvider,
    public productsProvider: ProductsProvider,
    public currentLocationProvider: CurrentLocationProvider,
    public loadingProvider: LoadingProvider,
    private alertCtrl: AlertController,
  ) {
    this.initializeApp();
    this.backEvent();
    this.usersProvider.fillData();
    this.currentLocationProvider.setLocation();
    this.bindMenu();
  }

  menuClosed() {
    this.usersProvider.fillData();
    this.bindMenu();
  }

  menuOpened() {
    this.usersProvider.fillData();
    this.bindMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  bindMenu() {
    // used for an example of ngFor and navigation
    this.pages = [];
    this.children = [];

    this.pages.push({ title: 'Home', component: HomePage, open: false, children: this.children });

    this.children = [];
    if (this.usersProvider.id) {
      this.children.push({ title: 'Account', component: AccountPage, open: false, children: [] });
      this.children.push({ title: 'Notifications', component: NotificationsPage, open: false, children: [] });
      this.children.push({ title: 'Wishlist', component: WishlistPage, open: false, children: [] });
    } else {
      this.children.push({ title: 'Login', component: LoginPage, open: false, children: [] });
      this.children.push({ title: 'Register', component: RegisterPage, open: false, children: [] });
    }
    this.pages.push({ title: 'My Account', component: AccountPage, open: false, children: this.children });
    this.children = [];

    this.pages.push({ title: 'Categories', component: ProductCategoriesPage, open: false, children: this.children });

    this.pages.push({ title: 'Products', component: ProductsPage, open: false, children: this.children });
    this.pages.push({ title: 'About', component: AboutPage, open: false, children: this.children });
    this.pages.push({ title: 'Contact', component: ContactPage, open: false, children: this.children });
    this.pages.push({ title: 'Stories', component: StoriesPage, open: false, children: this.children });

  }

  toggleSection(i) {
    this.pages[i].open = !this.pages[i].open;
  }

  toggleItem(i, j) {
    this.pages[i].children[j].open = !this.pages[i].children[j].open;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  backEvent() {
    this.platform.registerBackButtonAction(() => {
      const overlayView = this.app._appRoot._overlayPortal._views[0];
      if (overlayView && overlayView.dismiss) {
        overlayView.dismiss();
        return;
      }
      if (this.nav.canGoBack()) {
        this.nav.pop();
      }
      else {
        let view = this.nav.getActive();
        if (view.component == HomePage || view.component == LoginPage) {
          if (this.alert) {
            this.alert.dismiss();
            this.alert = null;
          } else {
            this.showAlert();
          }
        }
      }
    });
  }

  showAlert() {
    this.alert = this.alertCtrl.create({
      title: 'Exit?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alert = null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    this.alert.present();
  }


}

