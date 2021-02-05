import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { EditAccountsPage } from '../edit-accounts/edit-accounts.page';
import { AuthService } from '../shared/services/auth.service';
import { ProductService } from '../shared/services/product.service';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('searchBar', {static: false}) searchBar: IonSearchbar;

  isAdmin = false;
  users: User[];
  allUsers: User[];
  public stateChange: boolean = true;
  type: string;

  constructor(private userService: UserService,
    private authService: AuthService,
    private modalController: ModalController,
    private router: Router,
    private productService: ProductService) {
    this.authService.observeAuthState(UserProfile => {
      this.userService.getAllUsers()
        .subscribe(data => {
          this.allUsers = this.users = data;
          for (var user in this.users) {
            if (UserProfile.email == this.users[user]["email"]) {
              var uid = this.users[user]["uid"]
              // console.log("Users", uid)
            } else {
              continue;
            }
          }
          this.userService.getUserById(uid).then(data => {
            this.type = data.type
            if (this.type === "Admin") {
              this.isAdmin = true;
            } else {
              this.isAdmin = false;
            }
            console.log("Users", this.type)
          });
        })
    })
  }

  search(event) {
    const text = event.target.value;

    if (text && text.trim() !== '') {
      this.allUsers = this.users.filter(
        item => item.username.toLowerCase().includes(text.toLowerCase()));
      // console.log("AllUsers", this.allUsers)
    }
    else {
      this.allUsers = this.users;
    }
  }

  refresh(event) {
    this.searchBar.value = '';
    event.target.complete();
  }

}
