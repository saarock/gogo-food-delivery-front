import { useEffect, useState } from "react";
import { Food } from "../types/foot";
import productService from "../service/product";
import { getCurrentTime } from "../utils/time";

const useFetchFoodByTime = (which:string) => {
 
  const [data, setData] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (which === "auto") {
        const currentTime =  getCurrentTime().split(":");
        if (parseInt(currentTime[0]) >= 12 || parseInt(currentTime[0]) <= 12 && currentTime[currentTime.length-1] === "AM") {
          const data: any = await productService.fetchDairyFoods(currentPage);
          setData(data.data);

        } else if (parseInt(currentTime[0]) > 10 ||  parseInt(currentTime[0]) <= 12 && currentTime[currentTime.length-1] === "PM") {
          const data: any = await productService.fetchOilyFoods(currentPage);
          setData(data.data);
        } 
      } else if (which === "cooked") {
        const data: any = await productService.fetchOilyFoods(currentPage);
        setData(data.data);
      } else if (which == "break-fast") {
        const data: any = await productService.fetchBreakFastFoods(currentPage);
        setData(data.data);
      }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unknown error while fetching foods"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]); // Empty dependency array ensures this effect runs only once

  return { data, loading, error, setCurrentPage };
};

export default useFetchFoodByTime;
