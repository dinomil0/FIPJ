import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Crowdfunding } from '../shared/models/crowdfunding';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service';
import { CrowdfundingService } from '../shared/services/crowdfunding.service';
import { SearchtoolService } from '../shared/services/searchtool.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-crowdfunding-edit',
  templateUrl: './crowdfunding-edit.page.html',
  styleUrls: ['./crowdfunding-edit.page.scss'],
})
export class CrowdfundingEditPage implements OnInit {

  editCFlisting: FormGroup;
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
  crowdId: string;

  static positiveNumber(fc: FormControl) {
    if (fc.value <= 0) {
    return ({positiveNumber: true});
    } else {
    return (null);
    }
  }

  // constructor(private router:Router, 
  //   private activatedRoute: ActivatedRoute,
  //   private crowdfundingService: CrowdfundingService,
  //   private userService: UserService) {
  //     this.crowdId = this.activatedRoute.snapshot.params.id;
  //    }
  constructor( 
    private router: Router,
    private crowdfundingService: CrowdfundingService,
    private authService: AuthService,
    private searchService: SearchtoolService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer) {

      this.crowdId = this.activatedRoute.snapshot.params.id;

      

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

      this.editCFlisting = new FormGroup({
        nameProduct: new FormControl('', [Validators.required]),
        ecoRate: new FormControl(0, [CrowdfundingEditPage.positiveNumber]),
        goalAmt: new FormControl(0, [CrowdfundingEditPage.positiveNumber]),
        description: new FormControl('', [Validators.required]),
        });

        this.crowdfundingService.getCrowdfundingById(this.crowdId).subscribe(data => {
          this.crowdFunding = data;
          // console.log(this.userId )
          if (this.crowdFunding) {
            this.editCFlisting.controls.nameProduct.setValue(this.crowdFunding.nameProduct);
            this.editCFlisting.controls.ecoRate.setValue(this.crowdFunding.ecoRating);
            this.editCFlisting.controls.goalAmt.setValue(this.crowdFunding.goalAmt);
            this.editCFlisting.controls.description.setValue(this.crowdFunding.description);
           }
        });

        
     }

  ngOnInit() {
  }

  updateCFListing(){
    this.crowdfundingService.listingUpdate(this.crowdFunding,this.editCFlisting.value.nameProduct,this.editCFlisting.value.ecoRate,this.editCFlisting.value.description);
    this.router.navigate(['crowdfundingdonate/'+this.crowdId]);
  }

}
