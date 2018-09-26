import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
import { UsersProvider } from '../users/users';
import { LanguageProvider } from '../language/language';
@Injectable()
export class StoriesProvider {

  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  constructor(
    public http: HttpClient,
    private usersProvider: UsersProvider,
    private languageProvider: LanguageProvider,
  ) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  getTypes() {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'story_module/api/story_types_api';
    this.formData.append('language_id', this.languageProvider.getLanguageId());
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  getList(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'story_module/api/stories_api';
    this.formData.append('language_id', this.languageProvider.getLanguageId());
    if (data.story_type_id) {
      this.formData.append('story_type_id', data.story_type_id);
    }

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  getDetail(id: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'story_module/api/stories_api/detail/' + id;
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  rankStory(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'story_module/api/stories_api/set_ranking';
    this.formData.append('user_id', this.usersProvider.id);
    this.formData.append('story_id', data.story_id);
    this.formData.append('likes', String(data.likes));
    this.formData.append('dislikes', String(data.dislikes));
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  setComment(data: any) {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL + 'story_module/api/stories_api/set_comment';
    this.formData.append('user_id', this.usersProvider.id);
    this.formData.append('story_id', data.story_id);
    this.formData.append('comment', data.comment);
    this.formData.append('language_id', this.languageProvider.getLanguageId());

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }


}
