import { Component, Input } from '@angular/core';
import { ProductsProvider } from '../../providers/products/products';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
  selector: 'product-attributes',
  templateUrl: 'product-attributes.html'
})
export class ProductAttributesComponent {
  @Input('productid') product_id: string;

  private responseData: any;
  private attributes;
  constructor(
    public productsProvider: ProductsProvider,
    public loadingProvider: LoadingProvider
  ) {
    
  }

  ngOnChanges() {
    this.getAttributes();
  }

  public getAttributes() {
    this.loadingProvider.present();
    this.productsProvider.getAttributes(this.product_id).subscribe(
      response => {
        this.responseData = response;
        this.attributes = this.responseData.result;
        this.loadingProvider.dismiss();
      },
      err => {
        console.error(err);
        this.loadingProvider.dismiss();
      }
    );    
  }

}
