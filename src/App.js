import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

import Product from "./components/Product";

function App() {
  const [available, setAvailable] = useState([]);
  const [toBeDispatched, setToBeDispatched] = useState([]);
  const [dispatched, setDispatched] = useState([]);
  const [selected, setSelected] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [timeNow, setTimeNow] = useState(
    Math.floor(new Date().getTime() / 1000)
  );

  // Get list of products
  useEffect(() => {
    axios
      .get("https://vending-machine-test.vercel.app/api/products")
      .then((response) => {
        setAvailable([...response.data.data]);
      })
      .catch((error) => {
        console.error(error);
        setError("Can't get list of products");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setInterval(() => {
      setTimeNow(Math.floor(new Date().getTime() / 1000));
    }, 1000);
  }, []);

  useEffect(() => {
    setDispatched((prevState) => [
      ...prevState,
      ...toBeDispatched.filter((product) => product.timeLeft === 0),
    ]);

    setToBeDispatched((prevState) =>
      prevState
        .filter((product) => product.timeLeft > 0)
        .map((product) => ({
          ...product,
          timeLeft: product.preparation_time - (timeNow - product.orderedAt),
        }))
    );
  }, [timeNow]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h1>Selected </h1>
          {selected && (
            <>
              <Product data={selected} showPreparationTime />
              <button
                onClick={() => {
                  setToBeDispatched((prevState) => [
                    ...prevState,
                    {
                      ...selected,
                      orderedAt: Math.floor(new Date().getTime() / 1000),
                      timeLeft: selected.preparation_time,
                    },
                  ]);
                  setSelected(null);
                }}
              >
                Dispatch
              </button>
            </>
          )}
          <h1>Available </h1>
          {available.map((product) => (
            <button
              onClick={() => {
                setSelected({ ...product });
              }}
            >
              <img src={product.thumbnail} alt={product.name} height="100" />
              <p>{product.name}</p>
              <p>{product.preparation_time} seconds</p>
            </button>
          ))}
          <h1>To be dispatched</h1>
          {toBeDispatched.map((product) => (
            <Product data={product} showTimeLeft />
          ))}
          <h1>Dispatched</h1>
          {dispatched.map((product) => (
            <Product data={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
