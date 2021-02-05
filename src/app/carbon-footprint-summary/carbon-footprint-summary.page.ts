import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Chart } from 'chart.js';
import { LoadingController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-carbon-footprint-summary',
  templateUrl: './carbon-footprint-summary.page.html',
  styleUrls: ['./carbon-footprint-summary.page.scss'],
})
export class CarbonFootprintSummaryPage implements OnInit {
  @ViewChild("doughnutCanvas", { static: true }) doughnutCanvas: ElementRef;
  @ViewChild("barCanvas", { static: true }) barCanvas: ElementRef;
  @ViewChild(IonSlides) slides: IonSlides;
  private doughnutChart: Chart;
  private barChart: Chart;
  uid: string;
  carbonFootprint: number;
  chartArray: any[] = [];
  labelsArray: string[];
  ecoRating: number;
  username: any;
  summarycontent: string;
  difference: number;

  constructor(private userService: UserService,
    private loadingController: LoadingController) {

  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    await loading.present();

    this.userService.getUser().subscribe(data => {
      for (var u in data) {
        this.uid = data[u]["uid"]
        this.username = data[u]["username"]
      }

      this.userService.getBusinessCarbonFootprint(this.uid).then(data => {
        // console.log(data)
        for (var index in data.carbonFootprint) {
          this.labelsArray = Object.keys(data.carbonFootprint[index])
          // console.log(Object.keys(data.carbonFootprint[index]))
          this.ecoRating = data.carbonFootprint[index]["ecoRating"]
          this.carbonFootprint = Number(data.carbonFootprint[index]["carbonFootprint"].toFixed(2))
          this.chartArray.push(Number(data.carbonFootprint[index]["fuelco2"].toFixed(2)))
          this.chartArray.push(Number(data.carbonFootprint[index]["electco2"].toFixed(2)))
          this.chartArray.push(Number(data.carbonFootprint[index]["gasco2"].toFixed(2)))
          this.chartArray.push(Number(data.carbonFootprint[index]["carbonFootprint"].toFixed(2)))
        }

        this.difference = 4000 - this.carbonFootprint
        if (this.carbonFootprint < 4000) {         
          this.summarycontent = "Good Job, You are producing " + this.difference + " less kg/CO2 compared to the industry's average."
        }else{
          this.summarycontent = "You are producing " + this.difference + " more kg/CO2 compared to the industry's average!"
        }



        if (this.chartArray != null) {
          loading.dismiss();
        }
        // console.log(this.chartArray)
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

        this.barChart = new Chart(this.barCanvas.nativeElement, {
          type: "bar",
          data: {
            labels: [this.username, "Industry's Average"],
            datasets: [
              {
                label: "Carbon Footprint Produce",
                data: [this.carbonFootprint, 4000],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)"
                ],
                borderColor: [
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                }
              }],
              yAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  beginAtZero: true
                }
              }]
            },

          }
        });
      })
    })


  }

  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

}
