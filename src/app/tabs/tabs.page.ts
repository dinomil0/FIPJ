import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/products';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isAdmin = false;
  isUser = false;
  isBusiness = false;
  selectedPath = '';
  type: string;
  uid: any;
  flaggedProducts: Product[] = [];
  flaggedCount = 0;
  isReview = false;
  crowdfundingListing: any; 
  allpending: any;
  carbonFootprintArray: any[] = [];

  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private productService: ProductService) {
    
      this.userService.getUser().subscribe(data => {
        for (var u in data){
          this.uid = data[u]["uid"]
          this.type = data[u]["type"]
        }
        if (this.type === "User") {
              this.isUser = true;
            } else {
              this.isUser = false;
            }
            if (this.type === 'Business') {
              this.isBusiness = true;
            } else {
              this.isBusiness = false;
            }
            if (this.type === 'Admin') {
              this.isAdmin = true;
            } else {
              this.isAdmin = false;
            }
  
      })
      
      this.userService.getPendingCarbonFootprint().subscribe(allpending =>{
        this.allpending = allpending
        if(this.allpending.length == 1){
          this.carbonFootprintArray.push(allpending)
        }
        this.productService.getPendingProducts().subscribe(prodData =>{
          if(prodData.length > 0 || this.carbonFootprintArray.length > 0){
            this.isReview = true
          }else{
            this.isReview = false
          }
        })
      })
   
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

}
