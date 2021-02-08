import { carbonFootprint } from "../models/carbonFootprint";

export class User {
  wishlist = [];
  searchList = [];
  carbonFootprint: carbonFootprint[] = [];
  // shippingAddress: string;
  // bio: string;


    constructor(
      public email: any,
      public username: string,
      public password: string,
      public type: string,
      public status: string,
      public imageURL: string,
      public uid?:string,
      public shippingAddress?: string,
      public bio?: string,
      public ecorating?: number
      ) { 
        if(imageURL == ""){this.imageURL = "../assets/images/business-person.png"}
        
        }
  
  }

  