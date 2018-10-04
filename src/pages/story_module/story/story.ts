import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StoriesProvider } from '../../../providers/stories/stories';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormServiceProvider } from '../../../providers/form-service/form-service';
declare var jquery: any;
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-story',
  templateUrl: 'story.html',
})
export class StoryPage {

  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private heading = 'Story';
  private responseData: any;
  private id;
  private title;
  private description;
  private html;
  private image;
  private tags;
  private totalLikes;
  private totalDislikes;
  private totalFlames;
  private date;
  private comments;


  private comment;
  private commentForm: FormGroup;
  public formErrors = {
    comment: '',
  };

  private status;
  private messageTitle;
  private message;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private formServiceProvider: FormServiceProvider,
    public storiesProvider: StoriesProvider,
    public loadingProvider: LoadingProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    this.id = this.navParams.get('id');
    this.getDetail();
    this.comment = '#nice...';
    this.createForm();
  }


  public createForm() {
    this.commentForm = this.formBuilder.group({
      comment: [this.comment, Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.required
      ])],
    });

    this.commentForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formServiceProvider.validateForm(this.commentForm, this.formErrors, true)
    });
  }


  public getDetail() {
    this.loadingProvider.present();
    this.storiesProvider.getDetail(this.id).subscribe(
      response => {
        this.responseData = response;
        this.title = this.responseData.result[0].title;
        this.heading = this.responseData.result[0].title;
        this.description = this.responseData.result[0].description;
        this.html = this.responseData.result[0].html;
        this.image = this.responseData.result[0].image_thumb;
        this.tags = this.responseData.result[0].tags;
        this.totalLikes = this.responseData.result[0].totalLikes;
        this.totalDislikes = this.responseData.result[0].totalDislikes;
        this.totalFlames = this.responseData.result[0].totalFlames;
        this.date = this.responseData.result[0].date;
        this.comments = this.responseData.result[0].comments;
        this.loadingProvider.dismiss();
      },
      err => {
        console.error(err);
        this.loadingProvider.dismiss();
      }
    );
    
  }


  public rankStory(rank: number) {
    // this.loadingProvider.present();

    var likes = 0;
    var dislikes = 0;

    if (rank == 1) {
      likes = 1;
    } else {
      dislikes = 1;
    }

    var data = {
      'story_id': this.id,
      'likes': likes,
      'dislikes': dislikes,
    };

    this.storiesProvider.rankStory(data).subscribe(
      response => {
        this.responseData = response;
        if (this.responseData.status) {
          if (rank == 1) {
            this.totalLikes++;
          } else {
            this.totalDislikes++;
          }

        } else {
          this.responseData.result.forEach(element => {

            if (element.id == 'story_id') {

              let toast = this.toastCtrl.create({
                message: element.text,
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            }
          });
        }
        // this.loadingProvider.dismiss();
      },
      err => {
        console.error(err);
        // this.loadingProvider.dismiss();
      }
    );


    // this.loadingProvider.dismiss();
  }

  public commentStory() {
    this.loadingProvider.present();

    this.formServiceProvider.markFormGroupTouched(this.commentForm);
    if (this.commentForm.valid) {
      this.loadingProvider.present();

      console.log(this.commentForm.value.comment);

      var data = {
        'story_id': this.id,
        'comment': this.commentForm.value.comment
      }


      this.storiesProvider.setComment(data).subscribe(
        response => {
          this.responseData = response;
          console.log(this.responseData);

          this.status = this.responseData.status;
          this.message = this.responseData.message;

          if (!this.status) {
            this.messageTitle = 'Warning!';
            if (this.responseData.result) {
              this.responseData.result.forEach(element => {
                if (element.id == 'comment') {
                  this.formErrors.comment = element.text
                }
              });
            }
          } else {
            this.messageTitle = 'Sucess!';
            this.comment = '';
            this.commentForm.reset();
            this.getDetail();
          }

          this.loadingProvider.dismiss();

          let alert = this.alertCtrl.create({
            title: this.messageTitle,
            message: this.message,
            buttons: ['Ok']
          });
          alert.present();
        },
        err => {
          console.error(err);
          this.loadingProvider.dismiss();
        }
      );
    } else {
      this.formErrors = this.formServiceProvider.validateForm(this.commentForm, this.formErrors, false);
    }

    this.loadingProvider.dismiss();
  }

  getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while (element) {
      xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
      yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
      element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
  }

  swipeUp(event: any): any {
    console.log(event);
    this.rankStory(1);
  }

  swipeDown(event: any): any {
    console.log(event);
    this.rankStory(0);
  }





}
