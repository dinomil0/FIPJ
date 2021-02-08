import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { CarbonFootprintAverage } from '../shared/models/carbonFootprintAverage';
import { CarbonFootprintAverageService } from '../shared/services/carbon-footprint-average.service';

@Component({
  selector: 'app-update-average-carbonfootprint',
  templateUrl: './update-average-carbonfootprint.page.html',
  styleUrls: ['./update-average-carbonfootprint.page.scss'],
})
export class UpdateAverageCarbonfootprintPage implements OnInit {
  carbonAvg: any;
  editCarbonForm: FormGroup;
  submitted: boolean;
  lastUpdate: any;

  constructor(
    private carbonFootprintAverageService: CarbonFootprintAverageService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private router: Router) { 
    this.editCarbonForm = new FormGroup({
      carbonAvg: new FormControl(0, [Validators.required]),
    });
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: "circular",
      message: "Please wait..."
    });
    await loading.present();
    
    // Get Carbon Footprint Average
    this.carbonFootprintAverageService.getAllCarbonAverage().subscribe(carbonAvg => {
      for (var carbon of carbonAvg) {
        this.carbonAvg = carbon.carbonFootprint
        this.lastUpdate = carbon.date
      }

      this.editCarbonForm.setValue({
        carbonAvg: this.carbonAvg
      })

      if(this.carbonAvg != null){
        loading.dismiss();
      }
    })

  }

  update(){
    this.submitted = true
    var todayDate = new Date()
    if (this.editCarbonForm.valid && this.submitted == true){
      this.carbonFootprintAverageService.getAllCarbonAverage()
      .subscribe(carbonAvg => {
        for (var carbon of carbonAvg) {
          this.carbonAvg = carbon.carbonFootprint
          this.carbonFootprintAverageService.update(carbon.id, Number(this.editCarbonForm.value.carbonAvg), todayDate)
        }
      })
      this.modalController.dismiss();
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
