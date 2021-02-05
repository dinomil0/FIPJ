import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-marketplace-tabs',
  templateUrl: './marketplace-tabs.page.html',
  styleUrls: ['./marketplace-tabs.page.scss'],
})
export class MarketplaceTabsPage implements OnInit {
  isAdmin = false;
  isUser : boolean;
  isBusiness : boolean;
  selectedPath = '';
  users: User[];
  type: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,) {
      this.authService.observeAuthState(UserProfile => {
        this.userService.getAllUsers()
          .subscribe(data => {
            this.users = data;
            for (var user in this.users){
              if(UserProfile.email == this.users[user]["email"]){
                var uid = this.users[user]["uid"]
                console.log("Users", uid)
              }else{
                continue;
              }
            }
            this.userService.getUserById(uid).then(data => {
                  this.type = data.type
                  if (this.type === "User"){
                    this.isUser = true;
                  }else {
                    this.isUser = false;
                  }
                  if (this.type === 'Business'){
                    this.isBusiness = true;
                  }else {
                    this.isBusiness = false;
                  }
                  console.log("Users", this.type)
            }); 
          })
      });
     }

  ngOnInit() {
  }

}
