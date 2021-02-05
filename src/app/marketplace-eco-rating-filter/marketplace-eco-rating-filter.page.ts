import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { carbonFootprint } from '../shared/models/carbonFootprint';
import { Product } from '../shared/models/products';
import { ProductService } from '../shared/services/product.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-marketplace-eco-rating-filter',
  templateUrl: './marketplace-eco-rating-filter.page.html',
  styleUrls: ['./marketplace-eco-rating-filter.page.scss'],
})
export class MarketplaceEcoRatingFilterPage implements OnInit {
  allProducts: Product[];
  productList: Product[];
  carbonFootprintArray: carbonFootprint[];
  allCarbonFootprintArray: carbonFootprint[] = [];
  carbonFootprint: carbonFootprint;
  rating: number;
  productCount: number = 0;
  seller: string[] = [];
  productArray: Product[] = [];

  constructor(
    private modalController: ModalController,
    private productService: ProductService,
    private router: Router,
    private loadingController: LoadingController, 
    private userService: UserService) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    await loading.present();
  
    this.productCount = 0
    this.seller = []
    this.productArray = []
    this.productService.getProducts()
    .subscribe(data => {
      for(let datas of data){
        if(datas.flag == "true"){
          const index = data.indexOf(datas, 1)
          data.splice(index, 1)
        }
      }

      this.userService.getAllCarbonFootprint()
      .subscribe(data2 => {
        this.carbonFootprintArray = data2
        for(let carbonFootprint of this.carbonFootprintArray){
          if(carbonFootprint.ecoRating >= 0){
            this.seller.push(carbonFootprint.email)
            for(let products of data){
              if(this.seller.length > 1){
                for(let p of this.seller){
                  if(products.seller == p){
                    if(this.productArray.includes(products.id) == false){
                      this.productArray.push(products.id)
                    }
                  }
                }
                this.productCount = this.productArray.length
              }
              else{
                for(let p of this.seller){
                  if(products.seller == p){
                    this.productCount = this.productCount + 1
                  }
                }
              }
            }
          }
        }
      })
    })

    if (this.seller != null){
      loading.dismiss();
    }
  }

  displayAll(rating: number){
    this.productCount = 0
    this.seller = []
    this.productArray = []
    this.productService.getProducts()
    .subscribe(data => {
      for(let datas of data){
        if(datas.flag == "true"){
          const index = data.indexOf(datas, 1)
          data.splice(index, 1)
        }
      }

      this.userService.getAllCarbonFootprint()
      .subscribe(data2 => {
        this.carbonFootprintArray = data2
        for(let carbonFootprint of this.carbonFootprintArray){
          if(carbonFootprint.ecoRating >= rating){
            this.seller.push(carbonFootprint.email)
            for(let products of data){
              if(this.seller.length > 1){
                for(let p of this.seller){
                  if(products.seller == p){
                    if(this.productArray.includes(products.id) == false){
                      this.productArray.push(products.id)
                    }
                  }
                }
                this.productCount = this.productArray.length
              }
              else{
                for(let p of this.seller){
                  if(products.seller == p){
                    this.productCount = this.productCount + 1
                  }
                }
              }
            }
          }
        }
      })
    })
  
    this.rating = rating;
    document.getElementById("ionColAll").style.background = '#69bb7b'
    document.getElementById("ionColAll").style.color = 'white'
    document.getElementById("ionColTwo").style.background = 'white'
    document.getElementById("ionColTwo").style.borderColor = '#DCDCDC'
    document.getElementById("ionColTwo").style.color = 'black'
    document.getElementById("ionColThree").style.background = 'white'
    document.getElementById("ionColThree").style.borderColor = '#DCDCDC'
    document.getElementById("ionColThree").style.color = 'black'
    document.getElementById("ionColFour").style.background = 'white'
    document.getElementById("ionColFour").style.borderColor = '#DCDCDC'
    document.getElementById("ionColFour").style.color = 'black'
  }

  displayTwo(rating: number){
    this.productCount = 0
    this.seller = []
    this.productArray = []
    this.productService.getProducts()
    .subscribe(data => {
      for(let datas of data){
        if(datas.flag == "true"){
          const index = data.indexOf(datas, 1)
          data.splice(index, 1)
        }
      }

      this.userService.getAllCarbonFootprint()
      .subscribe(data2 => {
        this.carbonFootprintArray = data2
        for(let carbonFootprint of this.carbonFootprintArray){
          if(carbonFootprint.ecoRating >= rating){
            this.seller.push(carbonFootprint.email)
            for(let products of data){
              if(this.seller.length > 1){
                for(let p of this.seller){
                  if(products.seller == p){
                    if(this.productArray.includes(products.id) == false){
                      this.productArray.push(products.id)
                    }
                  }
                }
                this.productCount = this.productArray.length
              }
              else{
                for(let p of this.seller){
                  if(products.seller == p){
                    this.productCount = this.productCount + 1
                  }
                }
              }
            }
          }
        }
      })
    })
    
    this.rating = rating;
    document.getElementById("ionColAll").style.background = 'white'
    document.getElementById("ionColAll").style.borderColor = '#DCDCDC'
    document.getElementById("ionColAll").style.color = 'black'
    document.getElementById("ionColTwo").style.background = '#69bb7b'
    document.getElementById("ionColTwo").style.color = 'white'
    document.getElementById("ionColThree").style.background = 'white'
    document.getElementById("ionColThree").style.borderColor = '#DCDCDC'
    document.getElementById("ionColThree").style.color = 'black'
    document.getElementById("ionColFour").style.background = 'white'
    document.getElementById("ionColFour").style.borderColor = '#DCDCDC'
    document.getElementById("ionColFour").style.color = 'black'

    // document.getElementById("ionColTwoIcon").style.color = 'white'
  }

  displayThree(rating: number){
    this.productCount = 0
    this.seller = []
    this.productArray = []
    this.productService.getProducts()
    .subscribe(data => {
      for(let datas of data){
        if(datas.flag == "true"){
          const index = data.indexOf(datas, 1)
          data.splice(index, 1)
        }
      }

      this.userService.getAllCarbonFootprint()
      .subscribe(data2 => {
        this.carbonFootprintArray = data2
        for(let carbonFootprint of this.carbonFootprintArray){
          if(carbonFootprint.ecoRating >= rating){
            this.seller.push(carbonFootprint.email)
            for(let products of data){
              if(this.seller.length > 1){
                for(let p of this.seller){
                  if(products.seller == p){
                    if(this.productArray.includes(products.id) == false){
                      this.productArray.push(products.id)
                    }
                  }
                }
                this.productCount = this.productArray.length
              }
              else{
                for(let p of this.seller){
                  if(products.seller == p){
                    this.productCount = this.productCount + 1
                  }
                }
              }
            }
          }
        }
      })
    })

    this.rating = rating;
    document.getElementById("ionColAll").style.background = 'white'
    document.getElementById("ionColAll").style.borderColor = '#DCDCDC'
    document.getElementById("ionColAll").style.color = 'black'
    document.getElementById("ionColTwo").style.background = 'white'
    document.getElementById("ionColTwo").style.borderColor = '#DCDCDC'
    document.getElementById("ionColTwo").style.color = 'black'
    document.getElementById("ionColThree").style.background = '#69bb7b'
    document.getElementById("ionColThree").style.color = 'white'
    document.getElementById("ionColFour").style.background = 'white'
    document.getElementById("ionColFour").style.borderColor = '#DCDCDC'
    document.getElementById("ionColFour").style.color = 'black'
  }

  displayFour(rating: number){
    this.productCount = 0
    this.seller = []
    this.productArray = []
    this.productService.getProducts()
    .subscribe(data => {
      for(let datas of data){
        if(datas.flag == "true"){
          const index = data.indexOf(datas, 1)
          data.splice(index, 1)
        }
      }

      this.userService.getAllCarbonFootprint()
      .subscribe(data2 => {
        this.carbonFootprintArray = data2
        for(let carbonFootprint of this.carbonFootprintArray){
          if(carbonFootprint.ecoRating >= rating){
            this.seller.push(carbonFootprint.email)
            for(let products of data){
              if(this.seller.length > 1){
                for(let p of this.seller){
                  if(products.seller == p){
                    if(this.productArray.includes(products.id) == false){
                      this.productArray.push(products.id)
                    }
                  }
                }
                this.productCount = this.productArray.length
              }
              else{
                for(let p of this.seller){
                  if(products.seller == p){
                    this.productCount = this.productCount + 1
                  }
                }
              }
            }
          }
        }
      })
    })

    this.rating = rating;
    document.getElementById("ionColAll").style.background = 'white'
    document.getElementById("ionColAll").style.borderColor = '#DCDCDC'
    document.getElementById("ionColAll").style.color = 'black'
    document.getElementById("ionColTwo").style.background = 'white'
    document.getElementById("ionColTwo").style.borderColor = '#DCDCDC'
    document.getElementById("ionColTwo").style.color = 'black'
    document.getElementById("ionColThree").style.background = 'white'
    document.getElementById("ionColThree").style.borderColor = '#DCDCDC'
    document.getElementById("ionColThree").style.color = 'black'
    document.getElementById("ionColFour").style.background = '#69bb7b'
    document.getElementById("ionColFour").style.color = 'white'

     
  }
  
  submit() {
    if(this.rating == null){
      this.rating = 0
    }
    this.userService.setEcoRating(this.rating); 
    this.router.navigate(['marketplace'])
  }

  close() {
    this.router.navigate(['marketplace'])
  }

}
