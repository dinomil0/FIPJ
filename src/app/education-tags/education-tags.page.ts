import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalyticsService } from '../shared/services/analytics.service';
import { PostsService } from '../shared/services/posts.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-education-tags',
  templateUrl: './education-tags.page.html',
  styleUrls: ['./education-tags.page.scss'],
})
export class EducationTagsPage implements OnInit {
  email: any;
  type: any;
  tag: any;
  allPosts: any;
  tagsArray: any;
  displayArray: string[] = [];
  uid: any;
  recEduId: any;
  tagsArrayRec: any;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private analyticsService: AnalyticsService,
    private router: Router) {
    this.userService.getUser()
    .subscribe(data => {
      for (var u in data) {
        this.email = data[u]["email"]
        this.type = data[u]["type"]
        this.uid = data[u]["uid"]
      }
    })
    this.tag = this.route.snapshot.params.id;

    this.postsService.getAllPosts().subscribe(allPosts => {
      // this.allPosts = allPosts
      for(var temp in allPosts){
        this.tagsArray = allPosts[temp]["tags"]
        for(var index in this.tagsArray){
          if(this.tag == this.tagsArray[index]){
            this.displayArray.push(allPosts[temp])
          }else{
            continue
          }
        }
      }
      // console.log(this.displayArray)
    })

   }

  ngOnInit() {
  }

  educationDetails(id: string) {
    let count = 0
    // Google Analytics Log
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, this.type + " clicked into Education Post");
    
    this.userService.getEducationRecommendations(this.uid).subscribe(rec =>{
      // console.log(rec)
      if(rec == "" || rec == null){
        this.postsService.getPostByID(id).subscribe(post =>{
          this.tagsArrayRec = post.tags
          this.userService.createEducationRecommendations(this.uid, this.tagsArrayRec)
        })
        
      }else{
        //update
        for(let temp of rec){
          this.recEduId = temp.id
        }
        this.postsService.getPostByID(id).subscribe(post =>{
          this.tagsArrayRec = post.tags
          
          if(count == 0){
            this.userService.updateEducationRecommendations(this.uid, this.recEduId, this.tagsArrayRec)
            count +=1 
          }
        })
      }
    })
    this.router.navigate(['/educationplatform-detail', id])
  }

}
