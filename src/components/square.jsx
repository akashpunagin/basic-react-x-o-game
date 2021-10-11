function Square(props) {
  let squareClasses = ["square"];

  if (props.isHighlighted) {
    squareClasses.push("square-highlighted");
  }

  return (
    <button className={squareClasses.join(" ")} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
