export class Crowdfunding {

   constructor
   (
        public username: string,
        public nameProduct: string,
        public goalAmt: number,
        public receiveAmt: number,
        public description: string,
        public ecoRating: number,
        public userEmail: string,
        public image: any,
        public imagePath: string,
        public status: string,
        public id?: string,) 
    {
        if(status == "null"){
            status = "pending"
        }
        if(status == ""){
            status = "pending"
        }
    }
   }