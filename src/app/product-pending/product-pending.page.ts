import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Product } from '../shared/models/products';
import { AuthService } from '../shared/services/auth.service';
import { ProductService } from '../shared/services/product.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-product-pending',
  templateUrl: './product-pending.page.html',
  styleUrls: ['./product-pending.page.scss'],
})
export class ProductPendingPage implements OnInit {
  flaggedProducts: Product[] = [];
  users: any;
  type: string;
  isAdmin = false;
  pen: any;


  constructor(private authService: AuthService,
    private userService: UserService,
    private productService: ProductService,
    private alertController: AlertController,
    private router: Router) {
    this.productService.getPendingProducts().subscribe(prodData => {
      this.flaggedProducts = prodData

    })

    this.userService.getUser().subscribe(data => {
      for (var u in data) {
        this.type = data[u]["type"]
      }

      if (this.type === 'Admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }

    })

    console.log(this.pen)
  }


  ngOnInit() {
  }

  async unflagged(prod: Product) {
    await this.presentConfirmUnFlag(prod).then(confirm => {
      if (confirm == true) {
        this.productService.updateFlag(prod.id, "false")
        this.presentAlert("Success!", "You have successfully unflagged " + prod.name)
        this.router.navigate(['/tabs/tab2'])
      } else {
        // this.presentAlert("Unsuccessful!", "You have not successfully unflag " + prod.name)
      }
    })
    
  }

  async flagged(prod: Product) {
    await this.presentConfirmFlag(prod).then(confirm => {
      if (confirm == true) {
        this.productService.updateFlag(prod.id, "true")
        this.presentAlert("Success!", "You have successfully flagged " + prod.name)
        this.router.navigate(['/tabs/tab2'])
      } else {
        // this.presentAlert("Unsuccessful!", "You have not successfully flag " + prod.name)
      }
    })

    
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
    await alert.present()
  }

  async presentConfirmUnFlag(p: Product) {
    return new Promise(async (resolve) => {
      let alert = await this.alertController.create({
        header: "Unflag?",
        message: 'Do you want to unflag ' + p.name + '?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              return resolve(false)
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Unflag',
            role: 'unflag',
            handler: () => {
              return resolve(true)
            }
          }
        ]
      });
      (await alert).present()
    })
  }

  async presentConfirmFlag(p: Product) {
    return new Promise(async (resolve) => {
      let alert = await this.alertController.create({
        header: "Flag?",
        message: 'Do you want to flag ' + p.name + '?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              return resolve(false)
              console.log('Cancel clicked');
            }
          },
          {
            text: 'flag',
            role: 'flag',
            handler: () => {
              return resolve(true)
            }
          }
        ]
      });
      (await alert).present()
    })
  }

}
