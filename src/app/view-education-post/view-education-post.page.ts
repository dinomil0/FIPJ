import { Component, OnInit } from '@angular/core';
import { Posts } from '../shared/models/posts';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import 'firebase/analytics';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { PostsService } from '../shared/services/posts.service';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { AnalyticsService } from '../shared/services/analytics.service';

@Component({
  selector: 'app-view-education-post',
  templateUrl: './view-education-post.page.html',
  styleUrls: ['./view-education-post.page.scss'],
})
export class ViewEducationPostPage implements OnInit {
  posts: Posts[];
  user: User[];
  loaded: boolean;
  email: any;
  type: any;

  constructor(
    private postService: PostsService,
    private authService: AuthService,
    private userService: UserService,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private router: Router,
    private analyticsService: AnalyticsService) {
    this.userService.getUser()
      .subscribe(data => {
        for (var u in data) {
          this.email = data[u]["email"]
          this.type = data[u]["type"]
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
}
