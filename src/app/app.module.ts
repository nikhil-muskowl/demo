import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { Facebook } from '@ionic-native/facebook';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { Geolocation } from '@ionic-native/geolocation';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// public_module
import { HomePage } from '../pages/public_module/home/home';
import { AboutPage } from '../pages/public_module/about/about';
import { ContactPage } from '../pages/public_module/contact/contact';

// story_module
import { StoriesPage } from '../pages/story_module/stories/stories';
import { StoryPage } from '../pages/story_module/story/story';

// notification_module
import { NotificationsPage } from '../pages/notification_module/notifications/notifications';
import { NotificationPage } from '../pages/notification_module/notification/notification';


// product_module
import { ProductsPage } from '../pages/product_module/products/products';
import { ProductPage } from '../pages/product_module/product/product';
import { ProductInquiriesPage } from '../pages/product_module/product-inquiries/product-inquiries';
import { SearchProductsPage } from '../pages/product_module/search-products/search-products';
import { ProductCategoriesPage } from '../pages/product_module/product-categories/product-categories';

// components
import { AccountDetailComponent } from '../components/account-detail/account-detail';
import { BannersComponent } from '../components/banners/banners';
import { CategoriesSliderComponent } from '../components/categories-slider/categories-slider';
import { ProductAttributesComponent } from '../components/product-attributes/product-attributes';

// user_module
import { AccountPage } from '../pages/user_module/account/account';
import { RegisterPage } from '../pages/user_module/register/register';
import { LoginPage } from '../pages/user_module/login/login';
import { UpdatePasswordPage } from '../pages/user_module/update-password/update-password';
import { UpdateProfilePage } from '../pages/user_module/update-profile/update-profile';
import { WishlistPage } from '../pages/user_module/wishlist/wishlist';
import { SettingPage } from '../pages/user_module/setting/setting';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';


import { ScrollHideDirective } from '../directives/scroll-hide/scroll-hide';
import { BannersProvider } from '../providers/banners/banners';
import { ProductsProvider } from '../providers/products/products';
import { LoadingProvider } from '../providers/loading/loading';
import { UsersProvider } from '../providers/users/users';
import { FormServiceProvider } from '../providers/form-service/form-service';

import { SocialSharing } from '@ionic-native/social-sharing';
import { SocialSharingProvider } from '../providers/social-sharing/social-sharing';
import { InquiriesProvider } from '../providers/inquiries/inquiries';
import { StoriesProvider } from '../providers/stories/stories';
import { CurrentLocationProvider } from '../providers/current-location/current-location';
import { ProductInquiriesProvider } from '../providers/product-inquiries/product-inquiries';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { LanguageProvider } from '../providers/language/language';

@NgModule({
  declarations: [
    MyApp,

    // public_module
    HomePage,
    AboutPage,
    ContactPage,
    // public_module

    // story_module
    StoriesPage,
    StoryPage,
    // story_module

    // notification_module
    NotificationsPage,
    NotificationPage,
    // notification_module

    // product_module
    ProductsPage,
    ProductPage,
    ProductInquiriesPage,
    SearchProductsPage,
    ProductCategoriesPage,
    // product_module

    // user_module
    AccountPage,
    RegisterPage,
    LoginPage,
    UpdatePasswordPage,
    UpdateProfilePage,
    WishlistPage,
    SettingPage,
    // user_module

    ScrollHideDirective,

    //components
    AccountDetailComponent,
    BannersComponent,
    CategoriesSliderComponent,
    ProductAttributesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicSwipeAllModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  exports:[
    TranslateModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // public_module
    HomePage,
    AboutPage,
    ContactPage,
    // public_module

    // story_module
    StoriesPage,
    StoryPage,
    // story_module

    // notification_module
    NotificationsPage,
    NotificationPage,
    // notification_module

    // product_module
    ProductsPage,
    ProductPage,
    ProductInquiriesPage,
    SearchProductsPage,
    ProductCategoriesPage,
    // product_module

    // user_module
    AccountPage,
    RegisterPage,
    LoginPage,
    UpdatePasswordPage,
    UpdateProfilePage,
    WishlistPage,
    SettingPage,
    // user_module


    //components
    AccountDetailComponent,
    BannersComponent,
    CategoriesSliderComponent,
    ProductAttributesComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    Geolocation,
    Facebook,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConfigProvider,
    BannersProvider,
    ProductsProvider,
    LoadingProvider,
    UsersProvider,
    FormServiceProvider,
    SocialSharingProvider,
    InquiriesProvider,
    StoriesProvider,
    CurrentLocationProvider,
    ProductInquiriesProvider,
    NotificationsProvider,
    LanguageProvider
  ]
})
export class AppModule { }
