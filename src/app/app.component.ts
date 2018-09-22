import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UsersProvider } from '../providers/users/users';
import { CurrentLocationProvider } from '../providers/current-location/current-location';

import { HomePage } from '../pages/public_module/home/home';
import { AboutPage } from '../pages/public_module/about/about';
import { ContactPage } from '../pages/public_module/contact/contact';

import { AccountPage } from '../pages/user_module/account/account';
import { LoginPage } from '../pages/user_module/login/login';
import { NotificationsPage } from '../pages/notification_module/notifications/notifications';

import { StoriesPage } from '../pages/story_module/stories/stories';
import { ProductsPage } from '../pages/product_module/products/products';
import { ProductCategoriesPage } from '../pages/product_module/product-categories/product-categories';
import { LoadingProvider } from '../providers/loading/loading';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  private responseData;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public usersProvider: UsersProvider,
    public currentLocationProvider: CurrentLocationProvider,
    public loadingProvider: LoadingProvider
  ) {
    this.initializeApp();
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

    this.pages.push({ title: 'Home', component: HomePage });
    if (this.usersProvider.id) {
      this.pages.push({ title: 'My Account', component: AccountPage });
      this.pages.push({ title: 'Notifications', component: NotificationsPage });
    } else {
      this.pages.push({ title: 'Login', component: LoginPage });
    }

    this.pages.push({ title: 'Categories', component: ProductCategoriesPage });
    this.pages.push({ title: 'Products', component: ProductsPage });
    this.pages.push({ title: 'About', component: AboutPage });
    this.pages.push({ title: 'Contact', component: ContactPage });
    this.pages.push({ title: 'Stories', component: StoriesPage });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
