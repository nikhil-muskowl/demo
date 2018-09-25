import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UsersProvider {

  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;


  public id;
  public name;
  public email;
  public contact;
  public password;
  public passconf;
  public dob;
  public gender_id;
  public image;

  constructor(
    public http: HttpClient,
    public storage: Storage,
  ) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.id = this.isLogin();

    if (this.id != 0) {
      this.fillData();
    }
  }


  public fillData() {
    this.getDetails(this.id).subscribe(response => {
      this.responseData = response;
      this.name = this.responseData.result.name;
      this.email = this.responseData.result.email;
      this.contact = this.responseData.result.contact;
      this.image = this.responseData.result.image_thumb;
    }, err => {
      console.error(err);
    }
    );
  }


  public clear() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.contact = '';
    this.password = '';
    this.passconf = '';
    this.dob = '';
    this.gender_id = 0;
    this.image = '';
  }

  public register(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'user_module/api/users_api/register';

    this.formData.append('name', data.name);
    this.formData.append('contact', data.contact);
    this.formData.append('email', data.email);
    this.formData.append('password', data.password);
    this.formData.append('passconf', data.passconf);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  public login(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'user_module/api/users_api/login';

    this.formData.append('username', data.username);
    this.formData.append('password', data.password);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  public getDetails(id) {
    this.URL = ConfigProvider.BASE_URL + 'user_module/api/users_api/detail/' + id;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  public updateDetails(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'user_module/api/users_api/updatedetail';

    this.formData.append('id', this.id);
    this.formData.append('name', data.name);
    this.formData.append('email', data.email);
    this.formData.append('contact', data.contact);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  public updatePassword(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'user_module/api/users_api/updatepassword';

    this.formData.append('id', this.id);
    this.formData.append('password', data.password);
    this.formData.append('passconf', data.passconf);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  public forgotPassword(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'user_module/api/users_api/forgot';
    this.formData.append('email', data.email);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  public setData(data) {
    this.id = data.id;
    this.fillData();
    try {
      window.localStorage.setItem('userId', data.id);
    } catch (error) {

    }

  }

  public unSetData() {
    this.clear();
    try {
      window.localStorage.removeItem('userId');
      // window.location.reload();
    } catch (error) {

    }

  }

  public isLogin() {
    try {
      return window.localStorage.getItem('userId');
    } catch (error) {
      return 0;
    }

  }

}
