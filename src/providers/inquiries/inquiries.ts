import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
import { LanguageProvider } from '../language/language';
@Injectable()
export class InquiriesProvider {

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

  public getTypes() {
    this.URL = ConfigProvider.BASE_URL + 'inquiry_module/api/inquiry_types_api';
    this.formData.append('language_id', this.languageProvider.getLanguageId());
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  public send(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'inquiry_module/api/inquiries_api/save';

    this.formData.append('types', JSON.stringify(data.types));
    this.formData.append('name', data.name);
    this.formData.append('email', data.email);
    this.formData.append('contact', data.contact);
    this.formData.append('inquiry', data.inquiry);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

}
