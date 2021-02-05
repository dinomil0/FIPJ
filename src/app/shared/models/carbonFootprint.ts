export class carbonFootprint {

    constructor(
      public fuelPrice: number,
      public fuelUsed: string,
      public numOfVehicles: number,
      public fuelco2: number,
      public electPrice: number,
      public electco2: number,
      public gasPrice: number,
      public gasco2: number,
      public numOfFacilities: number,
      public carbonFootprint: number,
      public dateFilled: Date,
      public status: string,
      public ecoRating: number,
      public email: string,
      public id?: string,   
      ) { }
  
  }