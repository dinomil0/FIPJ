import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../shared/models/products';
import { Camera } from '@ionic-native/camera/ngx';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../shared/services/auth.service';
import { Posts } from '../shared/models/posts';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { PostsService } from '../shared/services/posts.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';
import { AnalyticsService } from '../shared/services/analytics.service';

@Component({
  selector: 'app-create-education-post',
  templateUrl: './create-education-post.page.html',
  styleUrls: ['./create-education-post.page.scss'],
})
export class CreateEducationPostPage implements OnInit {
addPostForm: FormGroup;
tags: string[]
users: User[];
imgURL;
photo: SafeResourceUrl
submitted: boolean = false;
email: any;
type: string;

  constructor(
    private camera: Camera,
    private authService: AuthService,
    private userService: UserService,
    private postService: PostsService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private analyticsService: AnalyticsService) { 
    this.tags = ['eco-friendly', 'products', 'campaign', 'go-green', 'save-the-earth'];
    this.addPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      tags: new FormControl('')
      });
  }

  ngOnInit() {
  }

  add(){
    console.log(this.addPostForm.value.title)
    this.submitted = true
    let date = new Date()
    if(this.photo == undefined){
      this.photo = ''
    }
    this.userService.getUser()
    .subscribe(data => {
      this.users = data
      for (let u of this.users){
        this.email = u.email
        this.type = u.type
        if (this.addPostForm.valid){
          // this.authService.observeAuthState(user => {
            const post = new Posts(
              this.addPostForm.value.title,
              '',
              date,
              this.addPostForm.value.content,
              u.username,
              this.email,
              0,
              this.addPostForm.value.tags,
              this.photo
              );
            // console.log(post)
            this.postService.addPost(post);
            this.analyticsService.logEventRoute(this.email);
            this.analyticsService.logEventComments(this.email, this.type+ " created a post");
            this.router.navigate(['educationtabs/home']);
           
          // })
        }
        this.addPostForm.value.title = ''
        this.addPostForm.value.content = ''
        this.addPostForm.value.tags = ''
      }
    })
  }

  async takePhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl)); 
  }
}
