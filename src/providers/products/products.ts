import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
import { UsersProvider } from '../users/users';

@Injectable()
export class ProductsProvider {

  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  constructor(
    public http: HttpClient,
    public usersProvider: UsersProvider,
  ) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  getCategories() {
    this.URL = ConfigProvider.BASE_URL + 'product_module/api/categories_api';
    this.formData.append('language_id', '1');
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  getList(data: any) {
    this.URL = ConfigProvider.BASE_URL + 'product_module/api/products_api';
    this.formData.append('language_id', '1');
    this.formData.append('length', '100');
    this.formData.append('start', '0');

    if (data.category_id) {
      this.formData.append('category_id', data.category_id);
    }
    if (data.search) {
      this.formData.append('search[value]', data.search);
    }


    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  getDetail(id: any) {
    this.URL = ConfigProvider.BASE_URL + 'product_module/api/products_api/detail/' + id;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  getAttributes(id: any) {
    this.URL = ConfigProvider.BASE_URL + 'product_module/api/products_api/attributes/' + id;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }


  setWishlist(id) {
    this.URL = ConfigProvider.BASE_URL + 'product_module/api/product_wishlists_api/save';
    this.formData.append('language_id', '1');
    this.formData.append('user_id', this.usersProvider.id);
    this.formData.append('product_id', id);
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  getWishlist() {
    this.URL = ConfigProvider.BASE_URL + 'product_module/api/product_wishlists_api';
    this.formData.append('language_id', '1');
    this.formData.append('user_id', this.usersProvider.id);
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }



}
