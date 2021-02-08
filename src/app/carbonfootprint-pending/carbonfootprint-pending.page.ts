import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ignoreElements } from 'rxjs/operators';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-carbonfootprint-pending',
  templateUrl: './carbonfootprint-pending.page.html',
  styleUrls: ['./carbonfootprint-pending.page.scss'],
})
export class CarbonfootprintPendingPage implements OnInit {
  type: any;
  isAdmin: boolean;
  allUsers: any;
  carbonFootprintArray: any[] = [];
  allpending: any;

  constructor(private userService: UserService,
    private router: Router) {
    this.userService.getPendingCarbonFootprint().subscribe(allpending =>{
      this.allpending = allpending
      if(this.allpending.length == 1){
        this.carbonFootprintArray.push(allpending)
      }
    })

    this.userService.getAllUsers().subscribe(allUsers =>{
      this.allUsers = allUsers
    })

    this.userService.getUser().subscribe(data => {
      for (var u in data) {
        this.type = data[u]["type"]
      }

      if (this.type === 'Admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }

    })
   }

  ngOnInit() {
  }

  carbonFootprintDetails(uid: string, username: string){
    sessionStorage.setItem('corpName', username)
    this.router.navigate(['/carbonfootprint-detail', uid])
  }
}
