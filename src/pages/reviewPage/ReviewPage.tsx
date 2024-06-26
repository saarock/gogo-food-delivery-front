import { useDeferredValue, useState } from "react";
import { Loader, ReviewBox } from "../../components";
import "./reviewPage.css";
import useFetchReviews from "../../hooks/useFetchReviews";
import service from "../../service/config";
import { toast } from "react-toastify";

const ReviewPage = () => {
  const { reviews, id, setReviews, setPrevId, loading, setLoading } =
    useFetchReviews();
  const cacheReviews = useDeferredValue(reviews);

  const loadMore = async () => {
    try {
      setLoading(true);
      const [page, currentId]: any = await service.getReviews(id);
      setReviews((prev: any) => [...prev, ...page]);
      setPrevId(currentId);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message === "intermediate value) is not iterable"
            ? "no more review exist"
            : "No more review exist"
          : ""
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  return (
    <div className="gogo-review-container">
      <h1>Costumer reviews</h1>
      <div className="gogo-all-review-box">
        {cacheReviews && cacheReviews?.length >= 1
          ? [...cacheReviews].map((review) => (
              <ReviewBox
                name={review.name}
                $createdAt={review.$createdAt}
                email={review.email}
                message={review.message}
              />
            ))
          : "NO reviews Found"}
      </div>

      {reviews && (
        <button onClick={loadMore} className="gogo-load-more-button">
          Load more
        </button>
      )}
    </div>
  );
};

export default ReviewPage;
