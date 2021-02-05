export class Cards {
    constructor(
      public cardNum: string,
      public cardName: string,
      public cardExpiration: string,
      public CVV: number,
      public owner: string,
      public selected: boolean,
      public id?: string
      ) { }
  
  }
