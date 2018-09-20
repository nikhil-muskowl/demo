import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';


@Injectable()
export class SocialSharingProvider {
  public appName;
  public message;
  public subject;
  public image;
  public url;
  

  constructor(public http: HttpClient, private socialSharing: SocialSharing, ) {

  }

  public share() {
    this.socialSharing.share(this.message, this.subject, null, this.url);
  }

  public shareVia() {
    this.socialSharing.shareVia(this.appName, this.message, this.subject, this.image, this.url);
  }

}
