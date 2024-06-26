import React, { useCallback, useEffect, useState } from "react";
import { Loader, ProductCard, SideNav } from "../../components";
import "./home.css";
import useFetchFoodByTime from "../../hooks/useFetchFoodByTime";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addFoods } from "../../features/productSlice";
import ItemsWrapper from "../../components/ItemsWrapper";


const Home = () => {
  const { data, loading, error, setCurrentPage } = useFetchFoodByTime("auto");

  const dispatch = useDispatch();
  const [res, setRes] = useState<string>("gorkhyas res");
  const [isMoreExist, setIsMoreExist] = useState<boolean>(true);

  useEffect(() => {
    if (data.length < 10) {
      setIsMoreExist(false)
    } else {
      setIsMoreExist(true)
    }
  }, [isMoreExist])

  // State to manage quantities for each product
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const addToCart = useCallback(
    (items: {
      name?: string;
      id?: number;
      price?: number;
      quantity?: number;
      resturant?: string;
      image?: string;
      type?: string;
    }) => {
      try {
        if (
          !items.id ||
          !items.name ||
          !items.image ||
          !items.price ||
          !items.quantity ||
          !items.resturant
        ) {
          throw new Error("Failed add to cart");
        }
        const food: any = {
          name: items.name,
          price: items.price,
          quantity: items.quantity,
          id: items.id + Math.random() + 10000,
          resturant: res,
          image: items.image,
          type: items.type,
        };
        dispatch(addFoods(food));
        toast.success("Added to the cart: " + items.name);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unknown error while adding to cart"
        );
      }
    },
    [dispatch, res]
  );

  const selectResturant = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRes(e.target.value);
    },
    []
  );

  const increaseQuantity = (id: number | undefined) => {
    if (id == undefined) return;
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQuantity = (id: number | undefined) => {
    if (id == undefined) return;
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    return <h1>Sorry, try again</h1>;
  }



  return (
    <div className="gogo-home-container">
      {/* <SideNav /> */}
      <ItemsWrapper>

      <div className="gogo-items-container">
        {data &&
          data.map((currentP) => (
            <div className="gogo-item" key={currentP.id}>
              <ProductCard
                name={currentP.name}
                id={currentP.id}
                price={currentP.price}
                availableOn={currentP.availableOn}
                description={currentP.description}
                type={currentP.type}
                image={currentP.image}
                addToCard={addToCart}
                selectRes={selectResturant}
                increase={() => increaseQuantity(currentP.id)}
                decrease={() => decreaseQuantity(currentP.id)}
                quantity={quantities[currentP.id ? currentP.id : 0]}
                actualPrice={currentP.actualPrice}
              />
            </div>
          ))}

     
      </div>
      </ItemsWrapper>
    
    </div>
  );
};

export default Home;
