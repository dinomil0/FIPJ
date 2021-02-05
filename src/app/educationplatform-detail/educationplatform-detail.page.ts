import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Comments } from '../shared/models/comments';
import { Notifications } from '../shared/models/notification';
import { Product } from '../shared/models/products';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AuthService } from '../shared/services/auth.service';
import { CommentsService } from '../shared/services/comments.service';
import { PostsService } from '../shared/services/posts.service';
import { UserService } from '../shared/services/user.service';
import { VotesService } from '../shared/services/votes.service';

@Component({
  selector: 'app-educationplatform-detail',
  templateUrl: './educationplatform-detail.page.html',
  styleUrls: ['./educationplatform-detail.page.scss'],
})
export class EducationplatformDetailPage implements OnInit {
  postId: any;
  posts: any;
  title: any;
  subtitle: any;
  datePosted: any;
  content: any;
  writtenBy: any;
  votes: any;
  tags: any;
  image: any;
  id: any;
  upvoteArray: any;
  downvoteArray: any;
  email: string;
  upvote: any;
  downvote: any;
  newVotes: any;
  uid: any;
  commentsList: Comments[] = [];
  message: any;
  commentsArray: any;
  username: string;
  answers: any;
  commentsVote: any;
  commentsListArray: any[] = [];
  commentsListArrayUp: any[] = [];
  commentsListArrayDown: any[] = [];
  commentId: any;
  buttonDisabled = true;
  commentIdUp: any;
  commentIdDown: any;
  votesArray: any[] = [];
  commentsTimeList: Comments[] = [];
  createVote = false;
  votesId: any;
  newVotesArray: any[] = [];
  newVotesArraycomments: any[] = [];
  votesIdComments: any;
  type: any;
  isMinutes: boolean;
  isHours: boolean;
  minutes: number;
  hours: number;

  constructor(private route: ActivatedRoute,
    private postService: PostsService,
    private votesService: VotesService,
    private alertController: AlertController,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private commentsService: CommentsService,
    private analyticsService: AnalyticsService) {

    // var user = this.authService.getCurrentUser()
    // this.email = user.email
    // if (user != null) {
    //   this.email = user.email
    // } else {
    //   this.router.navigate(['/login'])
    // }

    this.postId = this.route.snapshot.params.id;

    this.postService.getPostByID(this.postId).subscribe(post => {
      this.posts = post
      this.title = post.title
      this.subtitle = post.subtitle
      this.datePosted = post.datePosted
      this.content = post.content
      this.writtenBy = post.writtenBy
      this.votes = post.votes
      this.tags = post.tags
      this.image = post.image
      this.id = post.id

    })

    this.votesService.upVote().subscribe(result => {
      this.upvoteArray = result
    });

    this.votesService.downVote().subscribe(result => {
      this.downvoteArray = result
    });

    this.userService.getUser().subscribe(data => {
      for (var u in data) {
        this.uid = data[u]["uid"]
        this.type = data[u]["type"]
        this.email = data[u]["email"]
        this.userService.getUserById(this.uid).then(userInfo => {
          this.username = userInfo.username
        })
      }

      this.userService.getVotes(this.uid).then(data => {
        this.postService.getComments(this.postId).subscribe(comments => {
          this.votesArray = data
          this.commentsList = comments
          this.answers = comments.length

          for (var temp in data) {
            //Check against post
            if (data[temp]["postId"] == this.postId) {
              if (data[temp]["upvote"] == true) {
                var elementup = <HTMLInputElement>document.getElementById("upVotebtn");
                elementup.disabled = true;
                break;
              } else {
                var elementdown = <HTMLInputElement>document.getElementById("downVotebtn");
                elementdown.disabled = true;
                break;
              }
            } else {
              var elementup = <HTMLInputElement>document.getElementById("upVotebtn");
              elementup.disabled = false;
              var elementdown = <HTMLInputElement>document.getElementById("downVotebtn");
              elementdown.disabled = false;
            }

          }
          for (var temp in data) {
            for (var index in this.commentsList) {
              if (data[temp]["postId"] == this.commentsList[index]["id"]) {
                if (data[temp]["upvote"] == true) {
                  if (this.commentsListArrayUp.includes(this.commentsList[index]["id"]) == false) {
                    this.commentsListArrayUp.push(data[temp]["postId"])
                    // break;
                  }
                } else {
                  if (this.commentsListArrayDown.includes(this.commentsList[index]["id"]) == false) {
                    this.commentsListArrayDown.push(data[temp]["postId"])
                  }
                }
              } else {
              }
            }
          }
        })


      })
    })

    this.postService.getCommentsDATETIME(this.postId).subscribe(comments => {
      for (let i of comments) {
        let todayDate = new Date;
        var dateDiff = todayDate.getTime() - i.datePosted.getTime()
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
        console.log(i)
        if(this.commentsTimeList.length < comments.length){
          this.commentsTimeList.push(i)

        }

      }
    })

    this.commentsService.getComments().subscribe(commentsArray => {
      this.commentsArray = commentsArray
    })


  }

  ngOnInit() {

  }

  checkIfEnabledUp(item) {
    return this.commentsListArrayUp.includes(item);
  }

  checkIfEnabledDown(item) {
    return this.commentsListArrayDown.includes(item);
  }

  //post
  async upVote() {

    await this.presentConfirm("Up Vote", "Are you sure you want to up vote?").then(confirm => {
      if (confirm == true) {

        //replace with postId
        for (var temp in this.upvoteArray) {
          this.upvoteArray[temp]["postId"] = this.id
        }
        //add
        for (let vote in this.upvoteArray) {
          this.upvote = this.upvoteArray[vote]["upvote"]
          this.downvote = this.upvoteArray[vote]["downvote"]
          if (this.upvote == true) {
            this.newVotes = this.votes + 1
          } else {
            this.newVotes = this.votes - 1
          }
        }
        for (var index in this.votesArray) {
          if (this.votesArray[index]["postId"] == this.postId) {
            this.votesId = this.votesArray[index]["id"]
            this.newVotesArray.push(this.votesArray[index])
            for (var temp in this.newVotesArray) {
              this.newVotesArray[temp]["upvote"] = true;
              this.newVotesArray[temp]["downvote"] = false;
            }
            this.createVote = false;
            break;
          } else {
            this.createVote = true;
          }
        }
        if (this.createVote == true) {
          this.userService.createVote(this.uid, this.upvoteArray).then(async voteArray => {
            this.presentToastWithOptions('Up vote', 'Up voted for ' + this.id)

          })
          this.postService.updateVotes(this.id, this.newVotes)

          this.analyticsService.logEventRoute(this.email);
          this.analyticsService.logEventComments(this.email, this.type + " up-voted post");

        } else {
          this.userService.updateVotes(this.uid, this.votesId, this.newVotesArray)
          this.presentToastWithOptions("Up Vote", "You have successfully up-voted")
          this.postService.updateVotes(this.id, this.newVotes)

          this.analyticsService.logEventRoute(this.email);
          this.analyticsService.logEventComments(this.email, this.type + " up-voted post");
        }
        var elementup = <HTMLInputElement>document.getElementById("upVotebtn");
        elementup.disabled = true;
        var elementdown = <HTMLInputElement>document.getElementById("downVotebtn");
        elementdown.disabled = false;


      } else {
      }
    })

  }

  //post
  async downVote() {

    await this.presentConfirm("Down Vote", "Are you sure you want to down vote?").then(confirm => {
      if (confirm == true) {
        // var elementdown = <HTMLInputElement>document.getElementById("downVotebtn");
        // elementdown.disabled = true;
        //replace with postId
        for (var temp in this.downvoteArray) {
          this.downvoteArray[temp]["postId"] = this.id
        }
        //add
        for (let vote in this.downvoteArray) {
          this.upvote = this.downvoteArray[vote]["upvote"]
          this.downvote = this.downvoteArray[vote]["downvote"]
          if (this.upvote == true) {
            this.newVotes = this.votes + 1
          } else {
            this.newVotes = this.votes - 1
          }
        }

        for (var index in this.votesArray) {
          if (this.votesArray[index]["postId"] == this.postId) {
            this.votesId = this.votesArray[index]["id"]
            this.newVotesArray.push(this.votesArray[index])
            for (var temp in this.newVotesArray) {
              this.newVotesArray[temp]["upvote"] = false;
              this.newVotesArray[temp]["downvote"] = true;
            }
            this.createVote = false;
            break;
          } else {
            this.createVote = true;
          }
        }

        if (this.createVote == true) {
          this.userService.createVote(this.uid, this.downvoteArray).then(async downvoteArray => {
            this.presentToastWithOptions('Down vote', 'Down voted for ' + this.id)
          })
          this.postService.updateVotes(this.id, this.newVotes)

          this.analyticsService.logEventRoute(this.email);
          this.analyticsService.logEventComments(this.email, this.type + " down-voted post");
        } else {
          this.userService.updateVotes(this.uid, this.votesId, this.newVotesArray)
          this.presentToastWithOptions("Down Vote", "You have successfully down-voted")
          this.postService.updateVotes(this.id, this.newVotes)

          this.analyticsService.logEventRoute(this.email);
          this.analyticsService.logEventComments(this.email, this.type + " down-voted post");
        }
        var elementup = <HTMLInputElement>document.getElementById("upVotebtn");
        elementup.disabled = false;
        var elementdown = <HTMLInputElement>document.getElementById("downVotebtn");
        elementdown.disabled = true;

      } else {
      }
    })

  }

  async presentToastWithOptions(title: string, message: string) {
    const toast = await this.toastController.create({
      header: title,
      message: message,
      duration: 2000,
      position: 'top',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async presentConfirm(title: string, content: string) {
    return new Promise(async (resolve) => {
      const alert = this.alertController.create({
        header: title,
        message: content,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              return resolve(false)
            }
          },
          {
            text: 'Yes',
            handler: () => {
              return resolve(true)
              console.log('Yes clicked');
            }
          }
        ]
      });
      (await alert).present()
    })
  }
  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
    await alert.present()
  }

  async sendComment() {
    var textAreaclear = <HTMLInputElement>document.getElementById("commentsMessage");
    textAreaclear.value = '';
    for (var temp in this.commentsArray) {
      this.commentsArray[temp]["content"] = this.message
      this.commentsArray[temp]["username"] = this.username
    }
    this.postService.createComments(this.postId, this.commentsArray)

    for (let comments in this.commentsArray) {
      this.postService.getCommentById(
        this.postId,
        this.commentsArray[comments].content,
        this.commentsArray[comments].username,
        this.commentsArray[comments].datePosted)
        .subscribe(data => {
          for (let comment of data) {
            let date = new Date;
            let n = new Notifications(true, false, this.writtenBy, date, false, false, 0, 0, this.postId, comment.id, this.username, false)
            this.postService.addNotification(this.postId, n)
          }
        })
    }
  }

  async upVoteComments(commentId: string) {

    this.postService.getComments(this.postId).subscribe(allComments => {
      for (var index in allComments) {
        if (allComments[index]["id"] == commentId) {
          this.commentsVote = allComments[index]["votes"]
        }
      }
    })
    await this.presentConfirm("Up Vote", "Are you sure you want to up vote?").then(confirm => {

      if (confirm == true) {

        //replace with postId
        for (var temp in this.upvoteArray) {
          this.upvoteArray[temp]["postId"] = commentId
        }

        for (let vote in this.upvoteArray) {
          this.upvote = this.upvoteArray[vote]["upvote"]
          this.downvote = this.upvoteArray[vote]["downvote"]
          if (this.upvote == true) {
            this.newVotes = this.commentsVote + 1
          } else {
            this.newVotes = this.commentsVote - 1
          }
        }

        for (var index in this.votesArray) {
          if (this.votesArray[index]["postId"] == commentId) {
            this.votesIdComments = this.votesArray[index]["id"]
            this.newVotesArraycomments.push(this.votesArray[index])
            for (var temp in this.newVotesArraycomments) {
              this.newVotesArraycomments[temp]["upvote"] = true;
              this.newVotesArraycomments[temp]["downvote"] = false;
            }
            this.createVote = false;
            break;
          } else {
            this.createVote = true;
          }
        }
        console.log(this.newVotesArraycomments)

        if (this.createVote == true) {
          this.userService.createVote(this.uid, this.upvoteArray).then(async upvoteArray => {
            this.presentToastWithOptions("Up Vote", "You have successfully up-voted")
          })
          this.postService.updateCommentsVotes(this.id, commentId, this.newVotes)

          this.analyticsService.logEventRoute(this.email);
          this.analyticsService.logEventComments(this.email, this.type + " up-voted comments");
        } else {
          this.userService.updateVotes(this.uid, this.votesIdComments, this.newVotesArraycomments)
          this.presentToastWithOptions("Up Vote", "You have successfully up-voted")
          this.postService.updateCommentsVotes(this.id, commentId, this.newVotes)

          this.analyticsService.logEventRoute(this.email);
          this.analyticsService.logEventComments(this.email, this.type + " up-voted comments");
        }

        const pos = this.commentsListArrayUp.indexOf(commentId)
        if (this.commentsListArrayUp.includes(commentId) == false) {
          if (this.commentsListArrayDown.includes(commentId) == true) {
            this.commentsListArrayDown.splice(pos, 1)
          }
          this.commentsListArrayUp.push(commentId)
        } else {
        }
      } else {
      }

    })
  }

  async downVoteComments(commentId) {

    this.postService.getComments(this.postId).subscribe(allComments => {
      for (var index in allComments) {
        if (allComments[index]["id"] == commentId) {
          this.commentsVote = allComments[index]["votes"]
        }
      }
    })
    await this.presentConfirm("Down Vote", "Are you sure you want to down vote?").then(confirm => {

      if (confirm == true) {

        //replace with postId
        for (var temp in this.downvoteArray) {
          this.downvoteArray[temp]["postId"] = commentId
        }

        for (let vote in this.downvoteArray) {
          this.upvote = this.downvoteArray[vote]["upvote"]
          this.downvote = this.downvoteArray[vote]["downvote"]
          if (this.upvote == true) {
            this.newVotes = this.commentsVote + 1
          } else {
            this.newVotes = this.commentsVote - 1
          }
        }
        for (var index in this.votesArray) {
          if (this.votesArray[index]["postId"] == commentId) {
            this.votesIdComments = this.votesArray[index]["id"]
            this.newVotesArraycomments.push(this.votesArray[index])
            for (var temp in this.newVotesArraycomments) {
              this.newVotesArraycomments[temp]["upvote"] = false;
              this.newVotesArraycomments[temp]["downvote"] = true;
            }
            this.createVote = false;
            break;
          } else {
            this.createVote = true;
          }
        }
        // console.log(this.newVotesArraycomments)

        if (this.createVote == true) {
          this.userService.createVote(this.uid, this.upvoteArray).then(async upvoteArray => {
            this.presentToastWithOptions("Up Vote", "You have successfully down-voted")
          })
          this.postService.updateCommentsVotes(this.id, commentId, this.newVotes)

          this.analyticsService.logEventRoute(this.email);
          this.analyticsService.logEventComments(this.email, this.type + " down-voted comments");
        } else {
          this.userService.updateVotes(this.uid, this.votesIdComments, this.newVotesArraycomments)
          this.presentToastWithOptions("Up Vote", "You have successfully down-voted")
          this.postService.updateCommentsVotes(this.id, commentId, this.newVotes)

          this.analyticsService.logEventRoute(this.email);
          this.analyticsService.logEventComments(this.email, this.type + " down-voted comments");
        }
        const pos = this.commentsListArrayDown.indexOf(commentId)
        if (this.commentsListArrayDown.includes(commentId) == false) {
          if (this.commentsListArrayUp.includes(commentId) == true) {
            this.commentsListArrayUp.splice(pos, 1)
          }
          this.commentsListArrayDown.push(commentId)
        } else {
        }
      } else {
      }

    })
  }

  educationplatformTags(tags: string) {
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " clicked into Education Tag");
    this.router.navigate(["/education-tags", tags])
  }


}
