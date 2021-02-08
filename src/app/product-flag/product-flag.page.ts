import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Product } from '../shared/models/products';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service';
import { ProductService } from '../shared/services/product.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-product-flag',
  templateUrl: './product-flag.page.html',
  styleUrls: ['./product-flag.page.scss'],
})
export class ProductFlagPage implements OnInit {
  users: User;
  type: string;
  isAdmin = false;
  flaggedProducts: Product[] = [];
  usersType: any;

  constructor(private authService: AuthService,
    private productService: ProductService,
    private userService: UserService,
    private alertController: AlertController) {
    this.productService.getFlaggedProducts().subscribe(prodData => {
      this.flaggedProducts = prodData
    })

    this.userService.getUser()
      .subscribe(data => {
        for (var user of data) {
          this.type = user.type
        }
        if (this.type === "Admin") {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      })
  }

  ngOnInit() {
  }

  async unflagConfirm(p: Product) {
    await this.presentConfirm(p).then(confirm => {
      if (confirm == true) {
        this.productService.updateFlag(p.id, "false")
        this.presentAlert("Success!", "You have successfully unflagged " + p.name)
      } else {
        // this.presentAlert("Unsuccessful!", "You have not successfully unflagged " + p.name)
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

  async presentConfirm(p: Product) {
    return new Promise(async (resolve) => {
      let alert = await this.alertController.create({
        header: "Unflagged",
        message: 'Do you want to unflagged ' + p.name + '?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              return resolve(false)
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Unflagged',
            role: 'unflagged',
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
