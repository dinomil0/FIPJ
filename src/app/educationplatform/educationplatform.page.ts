import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from '../shared/services/analytics.service';
import { PostsService } from '../shared/services/posts.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-educationplatform',
  templateUrl: './educationplatform.page.html',
  styleUrls: ['./educationplatform.page.scss'],
})
export class EducationplatformPage implements OnInit {
  allPosts: any;
  postId: any;
  idCheckedArray: any;
  email: any;
  type: any;
  uid: any;
  tagsArray: any;
  recEduId: any;

  constructor(private postsService: PostsService,
    private router: Router,
    private analyticsService: AnalyticsService,
    private userService: UserService) {
      this.userService.getUser()
    .subscribe(data => {
      for (var u in data) {
        this.email = data[u]["email"]
        this.type = data[u]["type"]
        this.uid = data[u]["uid"]
      }
    })
    this.postsService.getAllPosts().subscribe(allPosts =>{
      this.allPosts = allPosts
    })
   }

  ngOnInit() {
  }

  educationplatformDetail(postId: string){
    let count = 0
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " clicked into Education Post");
    this.userService.getEducationRecommendations(this.uid).subscribe(rec =>{
      // console.log(rec)
      if(rec == "" || rec == null){
        this.postsService.getPostByID(postId).subscribe(post =>{
          this.tagsArray = post.tags
          this.userService.createEducationRecommendations(this.uid, this.tagsArray)
        })
        
      }else{
        //update
        for(let temp of rec){
          this.recEduId = temp.id
        }
        this.postsService.getPostByID(postId).subscribe(post =>{
          this.tagsArray = post.tags
          
          if(count == 0){
            this.userService.updateEducationRecommendations(this.uid, this.recEduId, this.tagsArray)
            count +=1 
          }
        })
      }
    })
    this.router.navigate(['/educationplatform-detail', postId])
  }

  educationplatformTags(tags: string){
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " clicked into Education Tag");
    this.router.navigate(["/education-tags", tags])
  }

}
