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
                      id: selected.id + prevState.length,
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
              key={product.id}
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
            <Product
              key={product.id}
              data={product}
              showTimeLeft
              onReachZero={() => {
                setToBeDispatched((prevState) =>
                  prevState.filter((iProduct) => iProduct.id !== product.id)
                );
                setDispatched((prevState) => [...prevState, { ...product }]);
              }}
            />
          ))}
          <h1>Dispatched</h1>
          {dispatched.map((product) => (
            <Product key={product.id} data={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
