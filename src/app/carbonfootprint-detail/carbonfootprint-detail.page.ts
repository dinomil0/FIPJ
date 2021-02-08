import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../shared/services/user.service';
import { Chart } from 'chart.js';
import { carbonFootprint } from '../shared/models/carbonFootprint';


@Component({
  selector: 'app-carbonfootprint-detail',
  templateUrl: './carbonfootprint-detail.page.html',
  styleUrls: ['./carbonfootprint-detail.page.scss'],
})
export class CarbonfootprintDetailPage implements OnInit {
  @ViewChild("doughnutCanvas", { static: true }) doughnutCanvas: ElementRef;
  private doughnutChart: Chart;

  carbonId: any;
  labelsArray: string[];
  ecoRating: number;
  carbonFootprint: number;
  chartArray: any[] = [];
  uid: any;
  fpArray: any[] = [];
  corpName: string;
  tempArray: carbonFootprint[];

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router) {

  }

  async ngOnInit() {
    this.corpName = sessionStorage.getItem('corpName');
    this.uid = this.route.snapshot.params.id;

    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    await loading.present();

    this.userService.getBusinessCarbonFootprint(this.uid).then(carbonFp => {
      //Assigning to array
      this.tempArray = carbonFp.carbonFootprint

      for(var temp of this.tempArray){
        if(temp.status == "pending"){
          this.fpArray.push(temp)
        }
      }
      for (var index in carbonFp.carbonFootprint) {
        //Labels for chart
        this.labelsArray = Object.keys(carbonFp.carbonFootprint[index])
        this.ecoRating = carbonFp.carbonFootprint[index]["ecoRating"]
        this.carbonFootprint = Number(carbonFp.carbonFootprint[index]["carbonFootprint"].toFixed(2))

        //For data to display
        this.chartArray.push(Number(carbonFp.carbonFootprint[index]["fuelco2"].toFixed(2)))
        this.chartArray.push(Number(carbonFp.carbonFootprint[index]["electco2"].toFixed(2)))
        this.chartArray.push(Number(carbonFp.carbonFootprint[index]["gasco2"].toFixed(2)))
        this.chartArray.push(Number(carbonFp.carbonFootprint[index]["carbonFootprint"].toFixed(2)))
      }
      if (this.chartArray != null) {
        loading.dismiss();
      }
      // console.log(this.chartArray)

      // Chart
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: "doughnut",
        data: {
  
          labels: [this.labelsArray[3], this.labelsArray[5], this.labelsArray[7]],
          datasets: [
            {
              label: "# of Loans",
              data: [this.chartArray[0], this.chartArray[1], this.chartArray[2]],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              hoverBackgroundColor: ["#FF6384",
                "#FFCE56",
                "#FF6384",
                "#36A2EB",
              ]
            }
          ]
        },
        options: {
  
          legend: {
            labels: {
              fontSize: 15
            }
          }
        }
      });
    })

  }

  async reject(cFootprint: carbonFootprint){
    await this.presentReject(cFootprint).then(confirm => {
      if (confirm == true) {
        this.userService.updateCarbonFootprint(this.uid, cFootprint.id, "rejected")
        this.presentAlert("Success!", "You have successfully rejected " + this.corpName +"'s Carbon Footprint")
        this.router.navigate(['/tabs/tab2'])
      } else {
        // this.presentAlert("Unsuccessful!", "You have not successfully reject "+ this.corpName+ "'s Carbon Footprint")
      }
    })
  }

  async approve(cFootprint: carbonFootprint){
    await this.presentApprove(cFootprint).then(confirm => {
      if (confirm == true) {
        this.userService.updateCarbonFootprint(this.uid, cFootprint.id, "approved")
        this.presentAlert("Success!", "You have successfully approved " + this.corpName +"'s Carbon Footprint")
        this.router.navigate(['/tabs/tab2'])
      } else {
        // this.presentAlert("Unsuccessful!", "You have not successfully approve "+ this.corpName+ "'s Carbon Footprint")
      }
    })
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
    await alert.present()
  }

  async presentApprove(cFootprint: carbonFootprint) {
    return new Promise(async (resolve) => {
      let alert = await this.alertController.create({
        header: "Approve?",
        message: "Do you want to approve " + this.corpName + "'s Carbon Footprint?",
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              return resolve(false)
              console.log('Cancel clicked');
            }
          },
          {
            text: 'approve',
            role: 'approve',
            handler: () => {
              return resolve(true)
            }
          }
        ]
      });
      (await alert).present()
    })
  }

  async presentReject(cFootprint: carbonFootprint) {
    return new Promise(async (resolve) => {
      let alert = await this.alertController.create({
        header: "Reject?",
        message: "Do you want to reject " + this.corpName + "'s Carbon Footprint?",
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              return resolve(false)
              console.log('Cancel clicked');
            }
          },
          {
            text: 'reject',
            role: 'reject',
            handler: () => {
              return resolve(true)
            }
          }
        ]
      });
      (await alert).present()
    })
  }
}
