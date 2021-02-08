import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../shared/models/products';
import { AuthService } from '../shared/services/auth.service';
import { ProductService } from '../shared/services/product.service';
import { Camera } from '@ionic-native/camera/ngx';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../shared/services/user.service';
import { SearchtoolService } from '../shared/services/searchtool.service';
import { User } from '../shared/models/user';
import { AnalyticsService } from '../shared/services/analytics.service';

@Component({
  selector: 'app-create-product-listing',
  templateUrl: './create-product-listing.page.html',
  styleUrls: ['./create-product-listing.page.scss'],
})
export class CreateProductListingPage implements OnInit {
addProductForm: FormGroup;
imgURL;
photo: SafeResourceUrl
userArray: User[]
productsArray: Product[]
productID: string
submitted: boolean = false;
type: any;
email: any;

  static positiveNumber(fc: FormControl) {
    if (fc.value <= 0) {
    return ({positiveNumber: true});
    } else {
    return (null);
    }
  }

  constructor(
    private router: Router,
    private productService: ProductService,
    private authService: AuthService,
    private camera: Camera,
    private searchService: SearchtoolService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private analyticsService: AnalyticsService) { 
      this.userService.getUser()
      .subscribe(data =>{
      for (var u in data) {
        this.email = data[u]["email"]
        this.type = data[u]["type"]
      }
    })
      this.addProductForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        price: new FormControl(0, [CreateProductListingPage.positiveNumber]),
        description: new FormControl('', [Validators.required]),
        });
      let str = 'Sustainable Water Bottle'
      console.log(str.toLowerCase().includes('water bottle'))
    }

  ngOnInit() {
  }

  add(){
    this.submitted = true
    if (this.addProductForm.valid && this.photo != null){
      this.authService.observeAuthState(user => {
        const prod = new Product(
          this.addProductForm.value.name,
          this.addProductForm.value.price,
          0,
          this.photo,
          0,
          this.addProductForm.value.description,
          "false",
          false,
          false,
          user.email,
          '');
        this.productService.add(prod);
        this.analyticsService.logEventRoute(this.email);
        this.analyticsService.logEventComments(this.email, this.type+ " created a listing");
        this.router.navigate(['marketplace-tabs/products']);
      })
      this.userService.getAllUsers()
      .subscribe(data => {
        this.userArray = data;
        this.productService.getProducts()
        .subscribe(data =>{
          this.productsArray = data
          for(let products of this.productsArray){
            if(products.name === this.addProductForm.value.name){
              this.productID = products.id
              for(let users of this.userArray){
                this.searchService.updateSearchNotified(this.addProductForm.value.name, users.uid, this.productID)
              }
            }
          }
        })

      })
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
