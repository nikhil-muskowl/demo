import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
import { UsersProvider } from '../users/users';
import { Categories } from '../../models/categories';

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
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'product_module/api/categories_api';
    this.formData.append('language_id', '1');
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  getAllCategories() {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'product_module/api/categories_api/categories';

    this.formData.append('language_id', '1');
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  extractData(res: HttpResponse<Object>) {
    let array = new Array();
    let key, count = 0;
    for (key in res.body) {
      array.push(res.body[count++]);
    }
    return array;
  }

  getList(data: any) {
    this.formData = new FormData();
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
    this.formData = new FormData();
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
    this.formData = new FormData();
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
