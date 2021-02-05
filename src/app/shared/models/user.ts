import { carbonFootprint } from "./carbonFootprint";
import { transactionHistory } from "./transactionHistory";
import { wishList } from "./wishlist";
import { Cards } from "./cards";
import { Searchtool } from "./searchtool";
import { Votes } from "./votes";

export class User {
    // uid: string;
    // bio: string;
    // shippingAddress: string;
    wishList: wishList[] = [];
    carbonFootprint: carbonFootprint[] =[];
    transactionHistory: transactionHistory[] =[];
    cards: Cards[] [];
    searchList: Searchtool[] = [];
    votes: Votes[] = [];

    constructor(
      public email: any,
      public username: string,
      public password: string,
      public type: string,
      public status: string,
      public imageURL: any,
      public uen: string,
      public uid?: string,
      public shippingAddress?: string,
      public bio?: string,
      public reportId?: any
      ) { if(imageURL == ""){this.imageURL = "../assets/images/business-person.png"}
        
    }
  
  }