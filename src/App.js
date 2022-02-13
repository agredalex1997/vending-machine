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

  function moveFromToBeDispatchedToDispatched(product) {
    setToBeDispatched((prevState) =>
      prevState.filter((iProduct) => iProduct.id !== product.id)
    );
    setDispatched((prevState) => [...prevState, { ...product }]);
  }

  function addSelectedProductToToBeDispatched() {
    setToBeDispatched((prevState) => [
      ...prevState,
      {
        ...selected,
        id: selected.id + new Date().getTime(),
      },
    ]);
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h1>Available </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {available.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  setSelected({ ...product });
                }}
                style={{
                  height: "200px",
                  width: "200px",
                  ...(selected?.id === product.id
                    ? { border: "5px solid green" }
                    : {}),
                }}
              >
                <img src={product.thumbnail} alt={product.name} height="100" />
                <p>{product.name}</p>
                <p>{product.preparation_time} seconds</p>
              </button>
            ))}
          </div>
          <button
            style={{ display: "block", marginTop: "8px" }}
            disabled={!selected}
            onClick={() => {
              addSelectedProductToToBeDispatched();
              setSelected(null);
            }}
          >
            Dispatch
          </button>
          <h1>To be dispatched</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {toBeDispatched.map((product) => (
              <Product
                key={product.id}
                data={product}
                showTimeLeft
                onReachZero={() => {
                  moveFromToBeDispatchedToDispatched(product);
                }}
              />
            ))}
          </div>

          <h1>Dispatched</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {dispatched.map((product) => (
              <Product key={product.id} data={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
