export class Comments {
    constructor(
      public content: string,
      public username: string,
      public datePosted: Date,
      public votes: number,
      public flag: string,
      public id?: string,
      public isMinutes?: boolean,
      public isHours?: boolean,
      public minutes?: number,
      public hours?: number
      ) { }
  
  }