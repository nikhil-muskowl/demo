import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {
  // static BASE_URL: string = 'http://172.16.8.87/codeigniter/social_app/';
  static BASE_URL: string = 'http://social-app.muskowl.com/';
  static userId = 0;

  constructor(public http: HttpClient) {

  }

}
