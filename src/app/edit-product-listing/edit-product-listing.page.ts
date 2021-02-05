import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../shared/models/products';
import { ProductService } from '../shared/services/product.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { AnalyticsService } from '../shared/services/analytics.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-edit-product-listing',
  templateUrl: './edit-product-listing.page.html',
  styleUrls: ['./edit-product-listing.page.scss'],
})
export class EditProductListingPage implements OnInit {
  editProductForm: FormGroup;
  productId: string;
  product: Product;
  productName: string;
  productImage: [];
  productPrice: number;
  productDesc: string;
  photo: SafeResourceUrl;
  submitted: boolean = false;
  loaded: boolean;
  prodBoost: boolean;
  email: any;
  type: any;

  static positiveNumber(fc: FormControl) {
    if (fc.value <= 0) {
    return ({positiveNumber: true});
    } else {
    return (null);
    }
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
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
    this.productId = this.route.snapshot.params.id;

    this.editProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [EditProductListingPage.positiveNumber]),
      description: new FormControl('', [Validators.required]),
      boost: new FormControl(false)
    });
  }

  async ngOnInit() {
    this.productId = this.route.snapshot.params.id;
    this.loaded = false;
    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    await loading.present();
    this.productService.getProductByID(this.productId)
      .subscribe(data => {
        this.product = data;
        this.productName = data.name;
        this.productImage  = data.image;
        this.productPrice = data.price;
        this.productDesc = data.description;
        this.prodBoost = data.boost;
        this.editProductForm.setValue({
          name: this.productName,
          price: this.productPrice,
          description: this.productDesc,
          boost: this.prodBoost
        })
        if (this.product != null){
          loading.dismiss();
        }
      })
  }

  // async takePhoto() {
  //   const image = await Plugins.Camera.getPhoto({
  //     quality: 100,
  //     allowEditing: false,
  //     resultType: CameraResultType.DataUrl,
  //     source: CameraSource.Camera
  //   });
  //   this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  //   console.log(this.photo)
  //   console.log(image.dataUrl)
  // }

  update(){
    this.submitted = true
    if (this.editProductForm.valid && this.submitted == true){
      this.productService.getProductByID(this.productId)
      .subscribe(data => {
        let prod = new Product(
          this.editProductForm.value.name,
          this.editProductForm.value.price,
          data.numberSold,
          data.image,
          data.rating,
          this.editProductForm.value.description,
          data.flag,
          this.editProductForm.value.boost,
          data.expiryDate,
          data.seller,
          data.id
        )
        console.log(this.editProductForm.value.boost)
        this.productService.update(prod);
        this.analyticsService.logEventRoute(this.email);
        this.analyticsService.logEventComments(this.email, this.type+ " updated listing");
        this.router.navigate(['view-product-listing']);
      })
    }
  }
  
}
