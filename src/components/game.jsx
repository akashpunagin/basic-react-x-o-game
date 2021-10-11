import React from "react";
import Board from "./board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      isXNext: true,
      stepNumber: 0,
      indexClickedHistory: [{ index: Array(9).fill(null) }],
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentSquareObj = history[history.length - 1];
    const squares = currentSquareObj.squares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.isXNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares }]),
      stepNumber: history.length,
      isXNext: !this.state.isXNext,
      indexClickedHistory: this.state.indexClickedHistory.concat([i]),
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      isXNext: step % 2 === 0 ? "X" : "O",
    });
  }

  getMovesFromHistory(history) {
    return history.map((step, index) => {
      let desc = index ? "Go to Move:" + index : "Go to the Game Start";

      let rowAndColDescriptions = step.squares.map(
        (squareValue, squareIndex) => {
          if (squareValue !== null) {
            let row = squareIndex % 3;
            let col = parseInt(squareIndex / 3);

            return squareValue === "X"
              ? `X Position: (${row}, ${col})`
              : `O Position: (${row}, ${col})`;
          } else {
            return "";
          }
        }
      );

      let buttonClasses = "btn btn-primary btn-sm my-1".split(" ");

      if (index === this.state.stepNumber) {
        buttonClasses.push("fw-bold");
      }

      return (
        <li key={index}>
          <button
            onClick={() => this.jumpTo(index)}
            className={buttonClasses.join(" ")}
          >
            <div className="col">
              <span>{desc}</span>
              <span className="mx-2">::</span>
              <span>
                {rowAndColDescriptions[this.state.indexClickedHistory[index]]}
              </span>
            </div>
          </button>
        </li>
      );
    });
  }

  render() {
    const history = this.state.history;
    const currentSquareObj = history[this.state.stepNumber];
    const winner = this.calculateWinner(currentSquareObj.squares);
    const moves = this.getMovesFromHistory(history);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.isXNext ? "X" : "O");
    }

    return (
      <div className="container mt-5 game">
        <div className="game-board">
          <Board
            squares={currentSquareObj.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="my-2">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
