import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductInquiriesPage } from './product-inquiries';

@NgModule({
  declarations: [
    ProductInquiriesPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductInquiriesPage),
  ],
})
export class ProductInquiriesPageModule {}
