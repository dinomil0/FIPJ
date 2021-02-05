import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Posts } from '../shared/models/posts';
import { PostsService } from '../shared/services/posts.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { AnalyticsService } from '../shared/services/analytics.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-edit-education-post',
  templateUrl: './edit-education-post.page.html',
  styleUrls: ['./edit-education-post.page.scss'],
})
export class EditEducationPostPage implements OnInit {
  editPostForm: FormGroup;
  postId: string;
  post: Posts;
  tags: String[]
  postTitle: string;
  postContent: string;
  postTags: String[];
  postImage: string;
  photo: SafeResourceUrl;
  submitted: boolean = false;
  loaded: boolean;
  email: any;
  type: any;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private postService: PostsService,
    private sanitizer: DomSanitizer,
    private storage: AngularFireStorage,
    private loadingController: LoadingController,
    private analyticsService: AnalyticsService,
    private userService: UserService) { 
    this.userService.getUser()
    .subscribe(data =>{
    for (var u in data) {
      this.email = data[u]["email"]
      this.type = data[u]["type"]
      }
    })
      this.tags = ['eco-friendly', 'products', 'campaign', 'go-green', 'save-the-earth'];
      this.editPostForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        content: new FormControl('', [Validators.required]),
        tags: new FormControl([]),
      });
    }

    async ngOnInit() {
      this.postId = this.route.snapshot.params.id;
      this.loaded = false;
      const loading = await this.loadingController.create({
        spinner: "circular",
        message: "Please wait..."
      });
      await loading.present();
      this.postService.getPostByID(this.postId)
        .subscribe(data => {
          this.post = data;
          this.postTitle = data.title;
          this.postContent  = data.content;
          this.postTags = data.tags;
          this.postImage = data.image;
          if(this.postTags == []){
            this.postTags = this.tags
            this.editPostForm.setValue({
              title: this.postTitle,
              content: this.postContent,
              tags: this.postTags
            })
          }
          else{
            this.editPostForm.setValue({
              title: this.postTitle,
              content: this.postContent,
              tags: this.postTags
            })
          }
          if (this.post != null){
            loading.dismiss();
          }
        })
    }

    update(){
      this.submitted = true
      if (this.editPostForm.valid && this.submitted == true){
        this.postService.getPostByID(this.postId)
        .subscribe(data => {
          let post = new Posts(
            this.editPostForm.value.title,
            data.subtitle,
            data.datePosted,
            this.editPostForm.value.content,
            data.writtenBy,
            data.email,
            data.votes,
            this.editPostForm.value.tags,
            data.image,
            this.postId
          )
          this.postService.update(post);
          this.analyticsService.logEventRoute(this.email);
          this.analyticsService.logEventComments(this.email, this.type+ " updated post");
          this.router.navigate(['view-education-post']);
        })
      }
    }

}
