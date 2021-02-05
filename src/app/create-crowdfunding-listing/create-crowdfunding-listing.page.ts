import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Crowdfunding } from '../shared/models/crowdfunding';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service';
import { CrowdfundingService } from '../shared/services/crowdfunding.service';
import { SearchtoolService } from '../shared/services/searchtool.service';
import { UserService } from '../shared/services/user.service';
import { Camera } from '@ionic-native/camera/ngx';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-create-crowdfunding-listing',
  templateUrl: './create-crowdfunding-listing.page.html',
  styleUrls: ['./create-crowdfunding-listing.page.scss'],
})
export class CreateCrowdfundingListingPage implements OnInit {
  createCFlisting: FormGroup;
  imgURL;
  photo: SafeResourceUrl
  user: User;
  crowdFunding: Crowdfunding;
  productID: string
  submitted: boolean = false;

  userId: string;
  userImage: string;
  statusArray: string[];
  status: string;
  userEmail: string;
  userName: string;
  userType: string;
  userStatus: string;
  users: User[];
  isUser = false;
  isBusiness = true;




  static positiveNumber(fc: FormControl) {
    if (fc.value <= 0) {
    return ({positiveNumber: true});
    } else {
    return (null);
    }
  }

  constructor( 
    private router: Router,
    private crowdfundingService: CrowdfundingService,
    private authService: AuthService,
    private camera: Camera,
    private searchService: SearchtoolService,
    private userService: UserService,
    private sanitizer: DomSanitizer) {

      this.userService.getUser().subscribe(data => {
        for (var u in data) {
          this.userId = data[u]["uid"]
          this.userEmail = data[u]["email"],
            this.userName = data[u]["username"],
            this.userImage = data[u]["imageURL"],
            this.userType = data[u]["type"],
            this.userStatus = data[u]["status"]
        }
        if (this.userType === "User") {
          this.isUser = true;
        } else {
          this.isUser = false;
        }
        if (this.userType === 'Business') {
          this.isBusiness = true;
        } else {
          this.isBusiness = false;
        }
      })

      this.createCFlisting = new FormGroup({
        nameProduct: new FormControl('', [Validators.required]),
        ecoRate: new FormControl(0, [CreateCrowdfundingListingPage.positiveNumber]),
        goalAmt: new FormControl(0, [CreateCrowdfundingListingPage.positiveNumber]),
        description: new FormControl('', [Validators.required]),
        });

        
     }

  ngOnInit() {
  }

  createCF() {
    this.submitted = true;
    if (this.createCFlisting.valid && this.photo != null) {
      const prod = new Crowdfunding(
        this.userName,
        this.createCFlisting.value.nameProduct,
        this.createCFlisting.value.goalAmt,
        0,
        this.createCFlisting.value.description,
        this.createCFlisting.value.ecoRate,
        this.userEmail,
        this.photo,
        undefined,
        "pending"); // Use name as id
      this.crowdfundingService.createCF(prod);

      this.router.navigate(['crowdfundingtabs/home']);
      this.createCFlisting.reset();
    }
  }

  getCamera() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI
    }).then( (res)=>{
      this.imgURL = res;
    }).catch( e=> {
      console.log(e);
    })
  }


  getGallery() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then( (res)=>{
      this.imgURL = 'data:image/jpeg;base64,' + res;
    }).catch( e=> {
      console.log(e);
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
