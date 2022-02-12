function Product(props) {
  return (
    <div style={{ border: "2px solid black" }}>
      <img src={props.data.thumbnail} alt={props.data.name} height="100" />
      <p>{props.data.name}</p>
      {props.showPreparationTime && (
        <p>{props.data.preparation_time} seconds</p>
      )}
      {props.showTimeLeft && <p>{props.data.timeLeft} seconds left</p>}
    </div>
  );
}

export default Product;
