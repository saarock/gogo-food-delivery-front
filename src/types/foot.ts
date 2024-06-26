export interface FoodType {
    [key: string]: {
      price: number;
    };
  }
  
export interface Food {
    id: number;
    name: string;
    description: string;
    type:string,
    price: number,
    availableOn: [],
    isAvailabe: boolean,
    image :string;
    resturant : string,
    quantity: number
    actualPrice?: number 
  }
  

  