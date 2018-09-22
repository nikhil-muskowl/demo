import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
import { UsersProvider } from '../users/users';
@Injectable()
export class NotificationsProvider {
  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;


  constructor(public http: HttpClient, private usersProvider: UsersProvider) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  list(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'notifications_module/api/user_notifications_api';
    this.formData.append('language_id', '1');
    if (data.story_type_id) {
      this.formData.append('user_id', this.usersProvider.id);
    }

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  detail(id: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'notifications_module/api/user_notifications_api/detail/' + id;
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  delete(id: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'notifications_module/api/user_notifications_api/detail/' + id;
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  veiw(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'notifications_module/api/user_notifications_api/save';
    this.formData.append('user_id', this.usersProvider.id);
    this.formData.append('id', data.user_notification_id);    

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }


}
