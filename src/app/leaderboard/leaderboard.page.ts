import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { carbonFootprint } from '../shared/models/carbonFootprint';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
userArray: User[];
noBusiness: boolean;
first: string;
second: string;
third: string;

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private userService: UserService) {
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    await loading.present();

    this.userService.getAllBusiness()
    .subscribe(data => {
      this.userArray = data
      this.userArray.sort((a, b) => (a.ecorating > b.ecorating) ? -1 : 1)
      if(this.userArray.length == 3){
        for(var i=0; i<3; i++){
          if(i == 0){
            this.first = this.userArray[i].username
          }
          else if(i == 1){
            this.second = this.userArray[i].username
          }
          else if(i == 2){
            this.third = this.userArray[i].username
          }
        }
      }
      else
      if(this.userArray.length == 2){
        for(var i=0; i<2; i++){
          if(i == 0){
            this.first = this.userArray[i].username
          }
          else if(i == 1){
            this.second = this.userArray[i].username
          }
        }
      }
      else
      if(this.userArray.length == 1){
        for(var i=0; i<1; i++){
          if(i == 0){
            this.first = this.userArray[i].username
          }
        }
      }
      else
      if(this.userArray.length == 0)
      {
        this.noBusiness = true;
      }

      if(this.userArray != null){
        loading.dismiss();
      }
    })
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
