import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { carbonFootprint } from '../shared/models/carbonFootprint';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AuthService } from '../shared/services/auth.service';
import { CarbonFootprintService } from '../shared/services/carbon-footprint.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-carbon-footprint',
  templateUrl: './carbon-footprint.page.html',
  styleUrls: ['./carbon-footprint.page.scss'],
})
export class CarbonFootprintPage implements OnInit {
  carbonFootprintForm: FormGroup;
  TypesOfFuel: string[];
  numOfLitres: number;
  totalKm: number;
  co2produce: number;
  totalco2produce = 0;
  elecKwh: number;
  gasKwh: number;
  totalelctandGas = 0;
  uid: string;
  carbonFootprintArray: carbonFootprint[];
  countTodisableButton = 0;
  fuelco2: number;
  electco2: number;
  gasco2: number;
  ecoRating: number;
  type: any;
  email: string;
  temptotal: number;
  // private fuelPrice: number = 1;
  // private fuel: number = 1;

  constructor(private fb: FormBuilder, private userService: UserService,
    private carbonFootprintService: CarbonFootprintService,
    private toastController: ToastController,
    private router: Router,
    private modalController: ModalController,
    private analyticsService: AnalyticsService) {

    this.userService.getUser().subscribe(data => {
      for (var u in data) {
        this.email = data[u]["email"]
        this.type = data[u]["type"]
        this.uid = data[u]["uid"]
        this.email = data[u]["email"]
      }

    })
    this.carbonFootprintService.carbonFootprint().subscribe(result =>{
      this.carbonFootprintArray = result
    });
    
  }

  ngOnInit() {
    // Form
    this.TypesOfFuel = ['Petrol', 'Diesel', 'None'];
    this.carbonFootprintForm = this.fb.group({
      fuelPrice: new FormControl(0, [Validators.required]),
      fuel: new FormControl('', [Validators.required]),
      numberOfVehicles: new FormControl(0, [Validators.required]),
      electricityPrice: new FormControl(0, [Validators.required]),
      naturalGasPrice: new FormControl(0, [Validators.required]),
      // waterPrice: new FormControl(0, [Validators.required]),
      noOfFacilities: new FormControl(0, [Validators.required])
    });

  }

  async calculate() {
    //Fuel Price
    if (this.carbonFootprintForm.value.fuelPrice != 0) {
      if (this.carbonFootprintForm.value.fuel == "Petrol") {
        //$2.10 per litre - ShellFuelSave 95[Can ask how much per litre]
        this.numOfLitres = this.carbonFootprintForm.value.fuelPrice / 2.10
        //15.4km avg distance per litre for car(Toyota Altis)[Can ask how much distance the person travelled per litre]
        this.totalKm = this.numOfLitres * 15.4
        //Average CO2 produce by km: 120g CO2/km || 0.120kg CO2/km
        this.co2produce = this.totalKm * 0.120       

      } else {
        //$1.78 per litre - ShellFuelSave Disel[Can ask how much per litre]
        this.numOfLitres = this.carbonFootprintForm.value.fuelPrice / 1.78
        //20km avg distance per litre for diesel vehicles[Can ask how much distance the person travelled per litre]
        this.totalKm = this.numOfLitres * 20
        //Average CO2 produce by km: 132g CO2/km || 0.132kg CO2/km
        this.co2produce = this.totalKm * 0.132

      }
      this.totalco2produce = this.carbonFootprintForm.value.numberOfVehicles * this.co2produce

      this.fuelco2 = this.totalco2produce
    }
    //Electricity Price
    if (this.carbonFootprintForm.value.electricityPrice != 0) {
      //$0.2143 per kwh[Can ask how much per Kwh]
      this.elecKwh = this.carbonFootprintForm.value.electricityPrice / 0.2143
      //0.4085 kg CO2/kWh
      this.co2produce = this.elecKwh * 0.4085

      this.electco2 = this.co2produce

      this.totalelctandGas += this.co2produce

    }

    //Natural Gas Price
    if (this.carbonFootprintForm.value.naturalGasPrice != 0) {
      //$0.17 per kwh[Can ask how much per Kwh]
      this.gasKwh = this.carbonFootprintForm.value.naturalGasPrice / 0.17
      //0.4085 kg CO2/kWh
      this.co2produce = this.gasKwh * 0.4085

      this.gasco2 = this.co2produce

      this.totalelctandGas += this.co2produce

    }

    // Mutiplying by the number of facilities
    if (this.carbonFootprintForm.value.naturalGasPrice != 0 || this.carbonFootprintForm.value.electricityPrice != 0) {
      this.temptotal = this.totalelctandGas * this.carbonFootprintForm.value.noOfFacilities
    }

    this.totalco2produce += this.temptotal

    //Less than 2000 - 5 eco rating, 2000-3000 - 4 eco rating, 3000-4000 - 3 eco rating, 
    //4000-5000 - 2 eco rating, More than 5000- 1 eco rating
    if(this.totalco2produce <= 2000){
      this.ecoRating = 5
    }
    else if(this.totalco2produce <= 3000 && this.totalco2produce>=2000){
      this.ecoRating = 4
    }
    else if(this.totalco2produce <= 4000 && this.totalco2produce>=3000){
      this.ecoRating = 3
    }
    else if(this.totalco2produce <= 5000 && this.totalco2produce>=4000){
      this.ecoRating = 2
    }
    else if(this.totalco2produce>=5000){
      this.ecoRating = 1
    }  
    
    // Replacing empty CarbonFootprintArray
    for (var temp in this.carbonFootprintArray){
      this.carbonFootprintArray[temp]["fuelPrice"] = this.carbonFootprintForm.value.fuelPrice
      this.carbonFootprintArray[temp]["fuelUsed"] = this.carbonFootprintForm.value.fuel
      this.carbonFootprintArray[temp]["numOfVehicles"] = this.carbonFootprintForm.value.numberOfVehicles
      this.carbonFootprintArray[temp]["fuelco2"] = this.fuelco2
      this.carbonFootprintArray[temp]["electPrice"] = this.carbonFootprintForm.value.electricityPrice
      this.carbonFootprintArray[temp]["electco2"] = this.electco2
      this.carbonFootprintArray[temp]["gasPrice"] = this.carbonFootprintForm.value.naturalGasPrice
      this.carbonFootprintArray[temp]["gasco2"] = this.gasco2
      this.carbonFootprintArray[temp]["numOfFacilities"] = this.carbonFootprintForm.value.noOfFacilities
      this.carbonFootprintArray[temp]["carbonFootprint"] = this.totalco2produce
      this.carbonFootprintArray[temp]["ecoRating"] = this.ecoRating
      this.carbonFootprintArray[temp]["email"] = this.email
    }

    await this.userService.createCarbonFootprint(this.uid, this.carbonFootprintArray)
    .then(async carbonFp => {

      // Present Toast
      this.presentToast("Your Carbon Footprint will be sent for review")
      this.modalController.dismiss()

      // Google Analytics Log
      this.analyticsService.logEventRoute(this.email);
      this.analyticsService.logEventComments(this.email, this.type+ " sort to display all history");
      this.router.navigate(['/carbon-footprint-summary'])
    });

  }

  get fuelPrice() {
    return this.carbonFootprintForm.get('fuelPrice');
  }

  get numberOfVehicles() {
    return this.carbonFootprintForm.get('numberOfVehicles');
  }

  get electricityPrice() {
    return this.carbonFootprintForm.get('electricityPrice');
  }

  get naturalGasPrice() {
    return this.carbonFootprintForm.get('naturalGasPrice');
  }

  get noOfFacilities() {
    return this.carbonFootprintForm.get('noOfFacilities');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
