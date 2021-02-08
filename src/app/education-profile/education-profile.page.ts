import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Notifications } from '../shared/models/notification';
import { Posts } from '../shared/models/posts';
import { User } from '../shared/models/user';
import { AnalyticsService } from '../shared/services/analytics.service';
import { PostsService } from '../shared/services/posts.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-education-profile',
  templateUrl: './education-profile.page.html',
  styleUrls: ['./education-profile.page.scss'],
})
export class EducationProfilePage implements OnInit {
  notificationCount: number;
  notificationArray: Notifications[] = []
  type: any;
  email: any;
  uid: any;
  userData: any;
  isBusiness: boolean;
  isUser: boolean;
  loaded: boolean;
  posts: Posts[];
  user: User[];
  postCount: number = 0;
  voteCount: number = 0;
  commentCount: number = 0;

  constructor(
    private userService: UserService,
    private postsService: PostsService,
    private router: Router,
    private loadingController: LoadingController,
    private postService: PostsService,
    private alertController: AlertController,
    private analyticsService: AnalyticsService) { 
      this.userService.getUserInstant().subscribe(data => {
        this.userData = data
        console.log(this.userData)
        for (var u in data) {
          this.type = data[u]["type"]
          this.email = data[u]["email"]
          this.uid = data[u]["uid"]
        }
        if (this.type === "User") {
          this.isUser = true;
        } else {
          this.isUser = false;
        }
        if (this.type === 'Business') {
          this.isBusiness = true;
        } else {
          this.isBusiness = false;
        }
      })

      this.userService.getUser()
      .subscribe(data => {
        for (let i of data) {
          this.postsService.getPostsByWriter(i.email)
            .subscribe(data => {
              this.voteCount = 0
              for (let post of data) {
                console.log(post)
                this.voteCount = this.voteCount + post.votes
                this.postsService.getUnseenNotificationsByUser(post.id)
                .subscribe(data2 => {
                  for(let noti of data2){
                    this.notificationArray.push(noti)
                  }
                  this.notificationCount = this.notificationArray.length
                })
              }
            })

            this.postService.getCommentsByWriter(i.email)
            .subscribe(data => {
              this.commentCount = this.commentCount + data.length
            })
          }
        })

    }

    async ngOnInit() {
      this.loaded = false;
      const loading = await this.loadingController.create({
        spinner: "circular",
        message: "Please wait..."
      });
      await loading.present();
      this.userService.getUser()
        .subscribe(data => {
          this.user = data
          for (let u of this.user) {
            this.postService.getPostsByWriter(u.email)
              .subscribe(data => {
                this.posts = data;
                this.postCount = this.posts.length
                if (this.posts != null) {
                  loading.dismiss();
                }
              });
          }
        })
    }

    async presentConfirm(p: Posts) {
      let alert = await this.alertController.create({
        message: 'Do you want to delete this item?',
        buttons: [
          {
            text: 'Delete',
            role: 'delete',
            handler: () => {
              this.postService.delete(p)
              this.analyticsService.logEventRoute(this.email);
              this.analyticsService.logEventComments(this.email, this.type + " deleted post");
            }
          },
          {
            text: 'Cancel',
            handler: () => {
            }
          }
        ]
      });
      await alert.present();
    }

  notificationsPage(){
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " clicked into Notifications");
    this.router.navigate(['education-notification'])
  } 

  userProfile() {
    this.router.navigate(['users-profile'])
  }

  addPost() {
    this.router.navigate(['educationtabs/create'])
  }

}
