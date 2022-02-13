import TimerInSeconds from "./TimerInSeconds";

function Product(props) {
  return (
    <div className="product-card">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={props.data.thumbnail}
          alt={props.data.name}
          height="100"
          style={{
            borderRadius: "8px",
          }}
        />
      </div>
      <p
        style={{
          ...(!props.showPreparationTime && !props.showTimeLeft
            ? { textAlign: "center" }
            : {}),
        }}
      >
        {props.data.name}
      </p>
      {props.showPreparationTime && (
        <p>{props.data.preparation_time} seconds</p>
      )}
      {props.showTimeLeft && (
        <TimerInSeconds
          initialTime={props.data.preparation_time}
          onReachZero={props.onReachZero}
        />
      )}
    </div>
  );
}

export default Product;
