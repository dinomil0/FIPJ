import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Votes } from '../models/votes';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class VotesService {
  private upVoteArray = [
    new Votes('',true,false),
  ];

  private downVoteArray = [
    new Votes('',false,true),
  ];
  constructor() {   }

  upVote(): Observable<Votes[]> {
    return of(this.upVoteArray);
  }

  downVote(): Observable<Votes[]> {
    return of(this.downVoteArray);
  }
}
