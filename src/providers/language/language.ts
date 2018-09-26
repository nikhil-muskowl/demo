import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';

@Injectable()
export class LanguageProvider {
  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  public language;
  public language_id;

  constructor(public http: HttpClient) {
    this.language = this.getLanguage();
    this.language_id = this.getLanguageId();
  }

  public getLanguages() {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'settings/api/languages_api';
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  public setLanguage(data) {
    try {
      window.localStorage.setItem('language_id', data.id);
      window.localStorage.setItem('language', data.code);
    } catch (error) {
    }
  }

  public getLanguage() {
    try {
      return window.localStorage.getItem('language');
    } catch (error) {
      return 'english';
    }
  }

  public getLanguageId() {
    try {
      return window.localStorage.getItem('language_id');
    } catch (error) {
      return '1';
    }
  }

}
