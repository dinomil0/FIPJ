export class transactionHistory {

    constructor(
      public name: string,
      public description: string,
      public quantity: number,
      public date: Date,
      public price: number,
      public id?: string,   
      ) { }
  
  }