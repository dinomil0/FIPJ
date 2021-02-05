export class Votes {

    constructor(
      public postId: string,
      public upvote: boolean,
      public downvote: boolean,
      public id?: string
      ) { }
  
  }