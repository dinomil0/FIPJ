import { Injectable } from '@angular/core';
import { Comments } from '../models/comments';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private commentsArray = [
    new Comments('','',new Date(), 0, 'false')
  ];

  constructor() {   }

  getComments(): Observable<Comments[]> {
    return of(this.commentsArray);
  }
}
