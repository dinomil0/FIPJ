import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'firebase/auth';
import 'firebase/firestore'
import firebase from 'firebase/app';
import { Posts } from '../models/posts';
import { Notifications } from '../models/notification';
import { Comments } from '../models/comments';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsRef = firebase.firestore().collection("posts");

  constructor() { }

  getAllPosts(): Observable<any> {
    return new Observable(observer => {
      // Read collection '/users'
      firebase.firestore().collection('posts').onSnapshot(collection => {
        let array = [];
        collection.forEach(doc => {
          try {
            let data = doc.data()
            let post = new Posts(data.title,
              data.subtitle,
              data.datePosted.toDate(),
              data.content,
              data.writtenBy,
              data.email,
              data.votes,
              data.tags,
              data.image,
              doc.id, doc.data().isMinutes, doc.data().isHours, doc.data().minutes, doc.data().hours);

            array.push(post);
            let dbComments = firebase.firestore().collection('posts/' + doc.id + '/comments/');
            dbComments.onSnapshot(itemsCollection => {
              post.comments = [];
              itemsCollection.forEach(itemDoc => {
                let comment = new Comments(itemDoc.data().content, itemDoc.data().username,
                  itemDoc.data().datePosted.toDate(),
                  itemDoc.data().votes, itemDoc.data().flag, itemDoc.id, itemDoc.data().isMinutes, itemDoc.data().isHours, itemDoc.data().minutes, itemDoc.data().hours);
                post.comments.push(comment);
                post.count = post.comments.length
              });

            })
          } catch (error) { }
        });
        observer.next(array);
      });
    });
  }


  addPost(p: Posts) {
    this.postsRef.add({
      title: p.title,
      subtitle: p.subtitle,
      datePosted: p.datePosted,
      content: p.content,
      votes: p.votes,
      tags: p.tags,
      writtenBy: p.writtenBy,
      email: p.email
    })
      .then(doc => {
        if (p.image) {
          const dataUrl = p.image.changingThisBreaksApplicationSecurity;
          const imageRef = firebase.storage().ref().child(doc.id);
          imageRef.putString(dataUrl, firebase.storage.StringFormat.DATA_URL).then(() => {
            const ref = this.postsRef.doc(doc.id);
            ref.update({ image: doc.id });
          });
        }
      });
  }

  addNotification(id: string, n: Notifications) {
    return firebase.firestore().collection('posts/' + id + '/notifications/').add({
      notified: n.notified,
      userNotified: n.userNotified,
      user: n.user,
      date: n.date,
      commentUser: n.commentUser,
      commentId: n.commentId,
      postId: n.postId,
      vote: n.vote
    })
  }

  getNotificationsByUser(id: string): Observable<any> {
    return new Observable((observer) => {
      let dbComments = firebase.firestore().collection('posts/' + id + '/notifications/');
      dbComments.onSnapshot(itemsCollection => {
        let notificationsArray = []; // Empty array
        itemsCollection.forEach(itemDoc => {
          let notifications = new Notifications(itemDoc.data().notified, itemDoc.data().userNotified, itemDoc.data().user, itemDoc.data().date.toDate(),
            itemDoc.data().isMinutes, itemDoc.data().isHours, itemDoc.data().minutes, itemDoc.data().hours, itemDoc.data().postId, itemDoc.data().commentId, itemDoc.data().commentUser,
            itemDoc.data().vote, itemDoc.id);
          notificationsArray.push(notifications);
        });
        observer.next(notificationsArray);
      });
    });
  }

  getUnseenNotificationsByUser(id: string): Observable<any> {
    return new Observable((observer) => {
      let dbComments = firebase.firestore().collection('posts/' + id + '/notifications/');
      dbComments.onSnapshot(itemsCollection => {
        let notificationsArray = []; // Empty array
        itemsCollection.forEach(itemDoc => {
          if (itemDoc.data().userNotified == false) {
            let notifications = new Notifications(itemDoc.data().notified, itemDoc.data().userNotified, itemDoc.data().user, itemDoc.data().date.toDate(),
              itemDoc.data().isMinutes, itemDoc.data().isHours, itemDoc.data().minutes, itemDoc.data().hours, itemDoc.data().postId, itemDoc.data().commentId, itemDoc.data().commentUser,
              itemDoc.data().vote, itemDoc.id);
            notificationsArray.push(notifications);
          }
        });
        observer.next(notificationsArray);
      });
    });
  }

  getCommentById(id: string, content: string, user: string, date: Date): Observable<any> {
    return new Observable((observer) => {
      let dbComments = firebase.firestore().collection('posts/' + id + '/comments/');
      dbComments.onSnapshot(itemsCollection => {
        let commentsArray = [];
        itemsCollection.forEach(itemDoc => {

          if (content == itemDoc.data().content && user == itemDoc.data().username && date.getTime() === (itemDoc.data().datePosted.toDate()).getTime()) {
            let comment = new Comments(itemDoc.data().content, itemDoc.data().username,
              itemDoc.data().datePosted.toDate(),
              itemDoc.data().votes, itemDoc.data().flag, itemDoc.id,
              itemDoc.data().isMinutes, itemDoc.data().isHours, itemDoc.data().minutes, itemDoc.data().hours);
            commentsArray.push(comment);
          }
        });
        observer.next(commentsArray);
      });
    });
  }

  getPostByID(id: string): Observable<any> {
    return new Observable((observer) => {
      this.postsRef.doc(id).get().then((doc) => {
        let data = doc.data();
        let p = new Posts(data.title, data.subtitle,
          data.datePosted.toDate(), data.content, data.writtenBy,
          data.email, data.votes, data.tags, data.image, doc.id, doc.data().isMinutes, doc.data().isHours, doc.data().minutes, doc.data().hours)
        if (data.image) {
          const imageRef = firebase.storage().ref().child(doc.id)
          imageRef.getDownloadURL()
            .then(url => {
              p.image = url;
            }).catch(error => {
              console.log(error)
            })
        }
        observer.next(p);
      });
    });
  }

  updateUserNotified(postId: string, commentId: string) {
    let dbItems1 = firebase.firestore().collection('posts/' + postId + '/notifications/')
    dbItems1.onSnapshot(itemsCollection => {
      itemsCollection.forEach(itemDoc => {
        const ref = this.postsRef.doc(postId + '/notifications/' + itemDoc.id)
        if (itemDoc.data().commentId == commentId) {
          ref.update({
            userNotified: true
          })
        }
      })
    })
  }

  updateVotes(id: string, votes: number) {
    const ref = this.postsRef.doc(id);

    ref.update({
      votes: votes
    });
  }

  updateCommentsVotes(id: string, commentId: string, votes: number) {

    const ref = this.postsRef.doc(id + '/comments/' + commentId);

    ref.update({
      votes: votes
    });
  }

  getPostsByWriter(email: string): Observable<any> {
    return new Observable((observer) => {
      this.postsRef.onSnapshot((querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          if (data.email == email) {
            let p = new Posts(data.title, data.subtitle, data.datePosted.toDate(), data.content, data.writtenBy, data.email, data.votes, data.tags, data.image, doc.id,
              doc.data().isMinutes, doc.data().isHours, doc.data().minutes, doc.data().hours);
            if (data.image) {
              const imageRef = firebase.storage().ref().child(doc.id)
              imageRef.getDownloadURL()
                .then(url => {
                  p.image = url;
                }).catch(error => {
                  console.log(error)
                })
            }
            posts.push(p);

            let dbComments = firebase.firestore().collection('posts/' + doc.id + '/comments/');
            dbComments.onSnapshot(itemsCollection => {
              p.comments = [];
              itemsCollection.forEach(itemDoc => {
                let comment = new Comments(itemDoc.data().content, itemDoc.data().username,
                  itemDoc.data().datePosted.toDate(),
                  itemDoc.data().votes, itemDoc.data().flag, itemDoc.id,
                  itemDoc.data().isMinutes, itemDoc.data().isHours, itemDoc.data().minutes, itemDoc.data().hours);
                p.comments.push(comment);
              });
            });
          }
        });
        observer.next(posts);
      });
    });
  }

  getCommentsDATETIME(id: string): Observable<any> {
    return new Observable((observer) => {
      let dbComments = firebase.firestore().collection('posts/' + id + '/comments/');
      dbComments.orderBy('datePosted', 'desc').onSnapshot(itemsCollection => {
        let commentsArray = []; // Empty array
        itemsCollection.forEach(itemDoc => {
          let comment = new Comments(itemDoc.data().content, itemDoc.data().username,
            itemDoc.data().datePosted.toDate(),
            itemDoc.data().votes, itemDoc.data().flag, itemDoc.id);
          commentsArray.push(comment);
          // commentsArray.count = p.comments.length
        });
        observer.next(commentsArray);
      });
    });
    // observer.next(posts);
  }


getComments(id: string): Observable<any> {
  return new Observable((observer) => {
    this.postsRef.onSnapshot((querySnapshot) => {
      let posts = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        let p = new Posts(doc.data().title, doc.data().subtitle, doc.data().datePosted, doc.data().content,
          doc.data().writtenBy, doc.data().votes, doc.data().tags, doc.data().image, doc.id);
        posts.push(p);

        let dbComments = firebase.firestore().collection('posts/' + id + '/comments/');
        dbComments.orderBy('datePosted', 'desc').onSnapshot(itemsCollection => {
          p.comments = []; // Empty array
          itemsCollection.forEach(itemDoc => {
            let comment = new Comments(itemDoc.data().content, itemDoc.data().username,
              itemDoc.data().datePosted.toDate(),
              itemDoc.data().votes, itemDoc.data().flag, itemDoc.id);
            p.comments.push(comment);
            p.count = p.comments.length
          });
          observer.next(p.comments);
        });
      });
      // observer.next(posts);
    });
  });
}

async delete (p: Posts) {
  const ref = this.postsRef.doc(p.id);
  ref.delete();
}

createComments(id: string, comments: Comments[]) {
  for (let comment of comments) {
    return firebase.firestore().collection('posts/' + id + '/comments/').add({
      content: comment.content,
      username: comment.username,
      datePosted: comment.datePosted,
      votes: comment.votes,
      flag: comment.flag
    })
  }
}

  update(p: Posts) {
    const ref = this.postsRef.doc(p.id);
    ref.update({
      title: p.title,
      content: p.content,
      tags: p.tags
    })
  };

}
