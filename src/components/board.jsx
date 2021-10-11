import Square from "./square";
import React from "react";

class Board extends React.Component {
  renderSquare(i, highlightedSquares) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isHighlighted={highlightedSquares.includes(i) ? true : false}
      />
    );
  }

  render() {
    const highlightedSquares = this.props.highlightedSquares;

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, highlightedSquares)}
          {this.renderSquare(1, highlightedSquares)}
          {this.renderSquare(2, highlightedSquares)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, highlightedSquares)}
          {this.renderSquare(4, highlightedSquares)}
          {this.renderSquare(5, highlightedSquares)}
        </div>
        <div className="board-row">
          {this.renderSquare(6, highlightedSquares)}
          {this.renderSquare(7, highlightedSquares)}
          {this.renderSquare(8, highlightedSquares)}
        </div>
      </div>
    );
  }
}

export default Board;
