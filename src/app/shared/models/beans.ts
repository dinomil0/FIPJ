import { beansHistory } from "./beansHistory";

export class Beans {
    beansHistory: beansHistory[] = [];

    constructor(
      public beans: number,
      public id?:string,
      ) { }
  
  }