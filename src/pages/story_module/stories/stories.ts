import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StoriesProvider } from '../../../providers/stories/stories';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { StoryPage } from '../story/story';
import { LoadingProvider } from '../../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-stories',
  templateUrl: 'stories.html',
})
export class StoriesPage {
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private heading = 'Stories';
  private responseData: any;
  private id;
  private items;
  private types;
  private story_type_id = 0;
  private filterData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storiesProvider: StoriesProvider,
    public loadingProvider: LoadingProvider
  ) {
    this.getTypes();
    this.getList();
  }

  ionViewDidLoad() {

  }

  public typeChanged(event) {
    this.story_type_id = event.id;
    this.getList();
  }

  public getList() {
    this.loadingProvider.present();
    this.filterData = {
      story_type_id: this.story_type_id
    };
    this.storiesProvider.getList(this.filterData).subscribe(
      response => {
        this.responseData = response;
        this.items = this.responseData.data;
        this.loadingProvider.dismiss();
      },
      err => {
        console.error(err);
        this.loadingProvider.dismiss();
      }
    );
   
  }

  public getTypes() {
    this.loadingProvider.present();
    this.storiesProvider.getTypes().subscribe(
      response => {
        this.responseData = response;
        this.types = this.responseData.data;
        this.loadingProvider.dismiss();
      },
      err => {
        console.error(err);
        this.loadingProvider.dismiss();
      }
    );
    
  }

  public itemTapped(data: any) {
    this.navCtrl.push(StoryPage, { id: data.id });
  }


}
