import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayPalPaymentDetails } from '@ionic-native/paypal/ngx';
import { Notifications } from '../shared/models/notification';
import { Posts } from '../shared/models/posts';
import { AnalyticsService } from '../shared/services/analytics.service';
import { PostsService } from '../shared/services/posts.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-education-notification',
  templateUrl: './education-notification.page.html',
  styleUrls: ['./education-notification.page.scss'],
})
export class EducationNotificationPage implements OnInit {
  notificationArray: Notifications[] = []
  isMinutes: boolean;
  isHours: boolean;
  minutes: number;
  hours: number;
  email: any;
  type: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private postsService: PostsService,
    private analyticsService: AnalyticsService) {
    this.userService.getUser()
      .subscribe(data => {
        for (var u in data) {
          this.email = data[u]["email"]
          this.type = data[u]["type"]
        }
      })
  }

  ngOnInit() {
    let todayDate = new Date;

    this.userService.getUser()
      .subscribe(data => {
        for (let i of data) {
          this.postsService.getPostsByWriter(i.email)
            .subscribe(data => {
              for (let post of data) {
                this.postsService.getNotificationsByUser(post.id)
                  .subscribe(data => {
                    for (let i of data) {
                      var dateDiff = todayDate.getTime() - i.date.getTime()
                      var dayDiff = dateDiff
                      dateDiff = ((dateDiff / (1000 * 60 * 60)) % 24) * 60 | 0
                      dayDiff = ((dayDiff / (1000 * 60 * 60 * 24)) % 7)
                      if (dateDiff < 60) {
                        i.isMinutes = true;
                        i.isHours = false;
                        i.minutes = dateDiff
                        this.minutes = dateDiff;
                      }
                      else
                        if (dateDiff >= 60 && dateDiff < 1440) {
                          i.isMinutes = false;
                          i.isHours = true;
                          this.hours = dateDiff / 60 | 0
                          i.hours = this.hours
                        }
                        else {
                          i.isMinutes = false;
                          i.isHours = false;
                        }
                      if (dayDiff >= 1) {
                        i.isMinutes = false;
                        i.isHours = false;
                      }
                      this.notificationArray.push(i)
                      this.notificationArray.sort((a, b) => b.date.getTime() - a.date.getTime())
                    }
                  })
              }
            })
        }
      })

  }

  postDetails(id: string, commentId: string) {
    this.postsService.getNotificationsByUser(id)
      .subscribe(data => {
        for (let i of data) {
          if (i.commentId == commentId && i.userNotified == false) {
            this.notificationArray = []
            this.postsService.updateUserNotified(id, commentId)
            this.analyticsService.logEventRoute(this.email);
            this.analyticsService.logEventComments(this.email, this.type + " clicked into Education Post");
            this.router.navigate(['educationplatform-detail', id])
          }
          else {
            this.router.navigate(['educationplatform-detail', id])
          }
        }
      })
  }

}
