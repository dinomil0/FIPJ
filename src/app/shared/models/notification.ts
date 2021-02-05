export class Notifications {
    constructor(
      public notified: boolean,
      public userNotified: boolean,
      public user: string,
      public date: Date,
      public isMinutes?: boolean,
      public isHours?: boolean,
      public minutes?: number,
      public hours?: number,
      public postId?: string,
      public commentId?: string,
      public commentUser?: string,
      public vote?: boolean,
      public id?: string
      ) { }
  
  }