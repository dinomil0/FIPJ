export class transactionHistory {

    constructor(
      public name: string,
      public description: string,
      public quantity: number,
      public date: Date,
      public price: number,
      public image: string,
      public id?: string,   
      ) { }
  
  }