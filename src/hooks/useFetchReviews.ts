import React, { useEffect, useState } from "react";
import service from "../service/config";
import { Any } from "../types/all";
import { reviewBoxProps } from "../types";
import { toast } from "react-toastify";

const useFetchReviews = () => {
  const [reviews, setReviews] = useState<reviewBoxProps[]>();
  const [id, setPrevId] = useState<string>("");
  const [loading, setLoading]  = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)

        const [reviews, id]: any = await service.getReview();
        if (!reviews || !reviews.documents)
          throw new Error("Cannot get reviews");
        setReviews(reviews.documents);
        setPrevId(id);
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "cannot fetch reviews"
        );
      } finally {
        setLoading(false)
      }
    })();
    // clean up
    return () => {};
  }, []);
  return { reviews, id, setReviews, setPrevId, loading,setLoading };
};

export default useFetchReviews;
