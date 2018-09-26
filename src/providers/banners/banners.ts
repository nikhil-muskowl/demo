import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
import { LanguageProvider } from '../language/language';

@Injectable()
export class BannersProvider {

  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  constructor(
    public http: HttpClient,
    private languageProvider: LanguageProvider,
  ) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  getList() {
    this.URL = ConfigProvider.BASE_URL + 'design_module/api/banners_api';
    this.formData.append('language_id', this.languageProvider.getLanguageId());
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  getDetail(id: any) {
    this.URL = ConfigProvider.BASE_URL + 'design_module/api/banners_api/detail/' + id;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

}
