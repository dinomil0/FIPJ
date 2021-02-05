import { Notifications } from "./notification";
import { Comments } from "./comments";

export class Posts {
  comments: Comments[] = [];
  notifications: Notifications[] = []
  count = 0;

    constructor(
      public title: string,
      public subtitle: string,
      public datePosted: Date,
      public content: string,
      public writtenBy: string,
      public email: string,
      public votes: number,
      public tags?: [],
      public image?: any,
      public id?: string,
      public isMinutes?: boolean,
      public isHours?: boolean,
      public minutes?: number,
      public hours?: number
      ) { if(image == "" || image == null){this.image = "../assets/icon/greenITlogo.png"}
      }
  
  }