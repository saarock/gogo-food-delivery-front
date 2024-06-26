import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Dashboard, DashboardNav, Loader } from "../../components";
import service from "../../service/config";
import { toast } from "react-toastify";
import { Food } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../types/rootState";
import "./dashPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import loadMoreReducer, { initialState } from "../../reducer/loadMore";
import { SET__SUCCESS_NO_MORE, SET_CURRENT_NO_MORE, SET_OFFSET_CURRENT, SET_OFFSET_REMOVED } from "../../types/loadMoreTypes";
export interface Booking {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $tenant: string;
  $updatedAt: string;
  bookedBy: string;
  done: boolean;
  id: string;
  isPaid: boolean;
  items: Food[];
  location: string;
  locationUrl: string;
  phoneNumber: string;
  totalPrice: number;
  updatedBy: string;
  isOrderCancel: boolean;
  labels: Array<string>;
}

const DashPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offSetState, setOffSetDispatch] = useReducer(
    loadMoreReducer,
    initialState
  );
  const [totalPage, setTotalPage] = useState<number>(0)
  const reactLocation = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      loadBookings("next");
    }
  }, [user]);

  useEffect(() => {
    if (user?.status && user.userData) {
      setCurrentUser(user.userData.labels[0]);
    }
  }, [user]);

  const loadBookings = useCallback(
    async (what: string) => {
      setIsLoading(true);
      try {
        const limit = 5;
        navigate("/dash");
    
        console.log(offSetState.offSetCurrent + 'this is' + what);
        console.log( offSetState.offSetCurrent)
        const response = await service.getBookedItems(
          limit,
          what === "prev"? offSetState.offSetCurrent -10 : offSetState.offSetCurrent
        ); 
        
 
        if (!response || !response.documents) {
          throw new Error(
            "No Items found."
          );
        }
// 

        const parsedBookings: any = response.documents.map((document) => ({
          $collectionId: document.$collectionId,
          $createdAt: document.$createdAt,
          $databaseId: document.$databaseId,
          $id: document.$id,
          $permissions: document.$permissions,
          bookedBy: document.bookedBy,
          done: document.done,
          id: document.id,
          isPaid: document.isPaid,
          items: JSON.parse(document.items) as Food[],
          location: document.location,
          locationUrl: document.locationUrl,
          phoneNumber: document.phoneNumber,
          totalPrice: document.totalPrice,
          updatedBy: document.updatedBy,
          isOrderCancel: document.isOrderCancel,
        }));

        setBookings(parsedBookings);
        setIsLoading(false);
          setOffSetDispatch({
          type: SET_CURRENT_NO_MORE,
          payload: response.documents.length < limit ? false : true
          });

          // if (response.documents.length < limit) return;


        const newOffset =
          what === "next"
            ? offSetState.offSetCurrent + limit
            : Math.min(offSetState.offSetCurrent - limit, 0);

   
            setOffSetDispatch({
              type: SET_OFFSET_CURRENT,
              payload: newOffset,
            });
  
      } catch (error) {
        console.error("Error loading bookings:", error);
        toast.error(error instanceof Error ? error.message : "Cannot fetch");
        // Handle error loading bookings (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    },
    [offSetState, bookings]
  );

  const orderDone = useCallback(async (id: string) => {
    setIsLoading(true);
    if (!user.userData?.$id || !id) {
      toast.success("You need to login");
      return;
    }
    try {
      await service.updateBookedItemsByAdmin(user.userData.$id, true, id);
      setBookings((prev) => prev.filter((booking) => booking.$id !== id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelOrderByAdmin = useCallback(async (id: string) => {
    setIsLoading(true);

    if (!user.userData?.$id || !id) {
      toast.success("You need to login");
      return;
    }
    try {
      await service.cancleBookedItemsByAdmin(user.userData.$id, true, id);
      setBookings((prev) => prev.filter((booking) => booking.$id !== id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // const getRemovedOrder = useCallback(
  //   async (what: string) => {
  //     setIsLoading(true);

  //     try {
  //       const limit = 5;
  //       const response = await service.getBookedItemsWhihcAreCancled(
  //         limit,
  //         offSetState.offSetRemoved
  //       );
  //       if (!response) throw new Error("Cannot fetch cancel order");
  //       const parsedBookings: any = await response.documents.map(
  //         (document) => ({
  //           $collectionId: document.$collectionId,
  //           $createdAt: document.$createdAt,
  //           $databaseId: document.$databaseId,
  //           $id: document.$id,
  //           $permissions: document.$permissions,
  //           bookedBy: document.bookedBy,
  //           done: document.done,
  //           id: document.id,
  //           isPaid: document.isPaid,
  //           items: JSON.parse(document.items) as Food[],
  //           location: document.location,
  //           locationUrl: document.locationUrl,
  //           phoneNumber: document.phoneNumber,
  //           totalPrice: document.totalPrice,
  //           updatedBy: document.updatedBy,
  //         })
  //       );

  //       setBookings(parsedBookings);

  //       const newOffset =
  //         what === "next"
  //           ? offSetState.offSetRemoved + limit
  //           : offSetState.offSetRemoved - limit;

  //       setOffSetDispatch({
  //         type: SET_OFFSET_REMOVED,
  //         payload: newOffset,
  //       });
  //     } catch (error) {
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [offSetState.offSetRemoved]
  // );

  // const getSuccessOrder = useCallback(
  //   async (what: string) => {
  //     setIsLoading(true);
  //     try {
  //       const limit = 5;
  //       const response = await service.getBookedItemsWhihcAreSuccess(
  //         limit,
  //         offSetState.offSetSuccess
  //       );
  //       if (!response || !response.documents) {
  //         throw new Error(
  //           "No Items found."
  //         );
  //       }
  //       const parsedBookings: any = await response.documents.map(
  //         (document) => ({
  //           $collectionId: document.$collectionId,
  //           $createdAt: document.$createdAt,
  //           $databaseId: document.$databaseId,
  //           $id: document.$id,
  //           $permissions: document.$permissions,
  //           bookedBy: document.bookedBy,
  //           done: document.done,
  //           id: document.id,
  //           isPaid: document.isPaid,
  //           items: JSON.parse(document.items) as Food[],
  //           location: document.location,
  //           locationUrl: document.locationUrl,
  //           phoneNumber: document.phoneNumber,
  //           totalPrice: document.totalPrice,
  //           updatedBy: document.updatedBy,
  //         })
  //       );

  //       setBookings(parsedBookings);

  //       setOffSetDispatch({
  //         type: SET__SUCCESS_NO_MORE,
  //         payload: response.documents.length < limit ? false : true
  //         });

  //         if (response.documents.length < limit) return;

  //       const newOffset =
  //         what === "next"
  //           ? offSetState.offSetSuccess + limit
  //           : offSetState.offSetSuccess - limit;

  //       setOffSetDispatch({
  //         type: SET_OFFSET_CURRENT,
  //         payload: newOffset,
  //       });


  //     } catch (error) {
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [bookings, offSetState.offSetSuccess]
  // );





  if (loading || currentUser === "" || !user.userData?.labels) {
    return <Loader />;
  }

  return (
    <div className="gogo-dash-container">
      {/* {
        loading || currentUser === "" || !user.userData?.labels?  <Loader /> : ""
      } */}
      <div className="gogo-dash-container-child">
        <div className="gogo-dash-board-nav">
          <DashboardNav
          />
        </div>
        <div className="gogo-dash-pages">
          <Dashboard
            orderDone={orderDone}
            bookings={bookings}
            loading={loading}
            loadBookings={loadBookings}
            cancelOrder={cancelOrderByAdmin}
            userType={user.userData?.labels[0]}
          />
        </div>
      </div>
    </div>
  );
};

export default DashPage;
