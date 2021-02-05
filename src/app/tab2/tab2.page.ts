import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Product } from '../shared/models/products';
import { AuthService } from '../shared/services/auth.service';
import { ProductService } from '../shared/services/product.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  isAdmin = false;
  users: any;
  type: string;
  flaggedProducts: Product[] = [];
  flaggedCount = 0;

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
  }


}
