import axios from "axios";
import { Food } from "../types";

class ProductService {
    async fetchOilyFoods(currentPage: number):Promise<Food[]> {
        try {
            const response = await axios.get(`http://localhost:3000/items/oily-foods?page=${currentPage}`);
            const data = await response.data;
            return data;
        } catch(error) {
            throw new Error(error instanceof Error ? error.message : "Error while fetching the foods")
        }
    }

    async fetchDairyFoods(currentPage: number):Promise<Food[]> {
        try {
            const response = await axios.get(`http://localhost:3000/items/dairy-foods?page=${currentPage}`);
            const data = await response.data;
            return data;
        } catch(error) {
            throw new Error(error instanceof Error ? error.message : "Error while fetching the foods")
        }
    }


    async fetchBreakFastFoods(currentPage: number):Promise<Food[]> {
        try {
            const response = await axios.get(`http://localhost:3000/items/break-fast-foods?page=${currentPage}`);
            const data = await response.data;
            return data;
        } catch(error) {
            throw new Error(error instanceof Error ? error.message : "Error while fetching the foods")
        }
    }


}

const productService = new ProductService();
export default productService; 