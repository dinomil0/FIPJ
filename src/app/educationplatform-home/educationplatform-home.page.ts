import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSearchbar, IonSlides, LoadingController } from '@ionic/angular';
import { Notifications } from '../shared/models/notification';
import { Product } from '../shared/models/products';
import { AnalyticsService } from '../shared/services/analytics.service';
import { PostsService } from '../shared/services/posts.service';
import { ProductService } from '../shared/services/product.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-educationplatform-home',
  templateUrl: './educationplatform-home.page.html',
  styleUrls: ['./educationplatform-home.page.scss'],
})
export class EducationplatformHomePage implements OnInit {
  @ViewChild('searchBar', { static: false }) searchBar: IonSearchbar;
  products: Product;
  imageArray = [];
  allPosts: any;
  notificationCount: number;
  notificationArray: Notifications[] = []
  type: any;
  email: any;
  searchPost: any;
  uid: any;
  tagsArray: any;
  recEduId: any;
  recPosts: any;
  recArray: any[] = [];

  constructor(
    private prodService: ProductService,
    private userService: UserService,
    private router: Router,
    private loadingController: LoadingController,
    private postsService: PostsService,
    private analyticsService: AnalyticsService) {
    this.userService.getUser()
      .subscribe(data => {
        for (var u in data) {
          this.email = data[u]["email"]
          this.type = data[u]["type"]
          this.uid = data[u]["uid"]
        }
      })
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    await loading.present();
    // this.prodService.getProductByID("9dTv72VS9Gws07d6PNUb").subscribe(data =>{
    //   this.products = data
    //   this.imageArray = this.products.image
    //   if (this.products != null){
    //     
    //   }
    // })

    this.postsService.getAllPosts().subscribe(allPosts =>{
      this.allPosts = this.searchPost = allPosts
      console.log(this.allPosts)
      this.allPosts.sort((a, b) => (a.datePosted > b.datePosted) ? -1 : 1)
      if(this.allPosts != null){
        loading.dismiss();
      }
    })
    

    this.userService.getUser()
      .subscribe(data => {
        for (let i of data) {
          this.postsService.getPostsByWriter(i.email)
            .subscribe(data => {
              for (let post of data) {
                console.log(post.id)
                this.postsService.getUnseenNotificationsByUser(post.id)
                  .subscribe(data2 => {
                    this.notificationArray = data2
                    this.notificationCount = this.notificationArray.length
                  })
              }
            })
          this.userService.getEducationRecommendations(i.uid).subscribe(recPosts => {
            this.recArray = []
            for (let rec of recPosts) {
              this.postsService.getAllPosts().subscribe(allPosts => {
                // this.recTags = rec.tags
                for (let posts of allPosts) {
                  for (let oneAllPosttag of posts.tags) {
                    for (let oneRectag of rec.tags) {
                      // console.log(oneRectag)
                      // console.log(oneAllPosttag)
                      if (oneRectag == oneAllPosttag) {
                        if(this.recArray.some(post => post.id == posts.id)){
                          continue;
                        }else{
                          this.recArray.push(posts)
                        }
                      }
                    }
                  }
                  // console.log(posts.tags)
                }
              })


            }
          })
        }
      })



  }

  displayRecent() {
    this.allPosts.sort((a, b) => (a.datePosted > b.datePosted) ? -1 : 1)
    document.getElementById("recentTab").style.borderBottomColor = 'black'
    document.getElementById("votesTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("commentsTab").style.borderBottomColor = '#DCDCDC'
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " sort by recent");
  }

  displayVotes(){
    this.allPosts.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
    document.getElementById("recentTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("votesTab").style.borderBottomColor = 'black'
    document.getElementById("commentsTab").style.borderBottomColor = '#DCDCDC'
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " sort by votes");
  }

  displayComments(){
    this.allPosts.sort((a, b) => (a.comments.length > b.comments.length) ? -1 : 1)
    document.getElementById("recentTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("votesTab").style.borderBottomColor = '#DCDCDC'
    document.getElementById("commentsTab").style.borderBottomColor = 'black' 
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " sort by comments");
  } 
  notificationsPage(){
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " clicked into Notifications");
    this.router.navigate(['education-notification'])
  }

  educationDetails(id: string) {
    let count = 0
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " clicked into Education Post");
    this.userService.getEducationRecommendations(this.uid).subscribe(rec => {
      // console.log(rec)
      if (rec == "" || rec == null) {
        this.postsService.getPostByID(id).subscribe(post => {
          this.tagsArray = post.tags
          this.userService.createEducationRecommendations(this.uid, this.tagsArray)
        })

      } else {
        //update
        for (let temp of rec) {
          this.recEduId = temp.id
        }
        this.postsService.getPostByID(id).subscribe(post => {
          this.tagsArray = post.tags

          if (count == 0) {
            this.userService.updateEducationRecommendations(this.uid, this.recEduId, this.tagsArray)
            count += 1
          }
        })
      }
    })
    this.router.navigate(['/educationplatform-detail', id])
  }

  search(event) {
    const text = event.target.value;

    if (text && text.trim() !== '') {
      this.allPosts = this.searchPost.filter(
        item => item.title.toLowerCase().includes(text.toLowerCase()));
    }
    else {
      this.allPosts = this.searchPost;
    }
  }

  refresh(event) {
    this.searchBar.value = '';
    event.target.complete();
  }

  educationplatformTags(tags: string){
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " clicked into Education Tag");
    this.router.navigate(["/education-tags", tags])
  }


}

