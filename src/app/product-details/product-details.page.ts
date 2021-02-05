import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Product } from '../shared/models/products';
import { ProductService } from '../shared/services/product.service';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})


export class ProductDetailsPage implements OnInit {
  product: any;
  productImg : [];
  
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  email: string;
  open: any[] = [false];


  constructor(private productService: ProductService, private route: ActivatedRoute, private alertController: AlertController,
    private analyticsService: AnalyticsService, private authService: AuthService, private router: Router) {
      // var user = this.authService.getCurrentUser()
      // if (user != null) {
      //   this.email = user.email
      // } else {
      //   this.router.navigate(['/login'])
      // }

    this.product = new Product('', 0, 0, '', 0, '', "false", false, false, '', '');

    this.productService.getProductByID(this.route.snapshot.params.prodID)
      .subscribe(data => {
        this.product = data;

        
        // if (this.product) {
        //   this.productImage = this.product.image;
        //   this.editProductForm.controls.name.setValue(this.product.name);

        //   this.editProductForm.controls.price.setValue(this.product.price);

        //   this.editProductForm.controls.category.setValue(this.product.category);

        //   this.editProductForm.controls.vegetarian.setValue(this.product.vegetarian)
        //     ;
        // }
      });
  }



  async presentAlert() {
    const alert = await this.alertController.create({
    message: 'Are you sure to flag this product?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
      },
      {
        text: 'Yes',
        handler: () => {
          this.productService.flagProduct(this.product.prodID);
        }
      }]
      
    });
    return await alert.present();
  }

  ngOnInit() {
  }

  addToCart(prodName: string){ 
    this.analyticsService.logEventRoute(this.email);
    this.analyticsService.logEventComments(this.email, "User added "+ prodName +" to cart");
  }
  toogle(i) {
    this.open[i] = !this.open[i];
  }

}
