import { ThrowStmt } from "@angular/compiler";

export class Product {
      onWishlist: boolean;


    constructor(
      public name: string,
      public price: number,
      public numberSold: number,
      public image: any,
      public rating: number,
      public description: string,
      public flag: string,
      public boost: boolean,
      public expiryDate: boolean,
      public seller: string,
      public id?: string) {
        this.name = name;
        this.price = price;
        this.numberSold = numberSold;
        this.image = image;
        this.rating = rating;
        this.description = description;
        this.flag = flag;
        this.boost = boost;
        this.expiryDate = expiryDate;
        this.seller = seller;
        this.id = id
       }
  }
