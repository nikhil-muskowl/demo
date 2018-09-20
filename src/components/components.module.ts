import { NgModule } from '@angular/core';
import { BannersComponent } from './banners/banners';
import { CategoriesSliderComponent } from './categories-slider/categories-slider';
import { AccountDetailComponent } from './account-detail/account-detail';
import { ProductAttributesComponent } from './product-attributes/product-attributes';
@NgModule({
	declarations: [BannersComponent,
    CategoriesSliderComponent,
    AccountDetailComponent,
    ProductAttributesComponent],
	imports: [],
	exports: [BannersComponent,
    CategoriesSliderComponent,
    AccountDetailComponent,
    ProductAttributesComponent]
})
export class ComponentsModule {}
