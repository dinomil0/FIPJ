export class Cart {

    constructor(
      public productID: string,
      public quantity: number,
      public imgURL?: any,
      public name?: string,
      public price?: number,
      ) { }
  
  }