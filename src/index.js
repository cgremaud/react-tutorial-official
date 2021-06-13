import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}> 
      {props.value}
    </button>
  ); 
  //no need to use this.props if props is just an argument param. 
  //also, since props.onClick is now a function variable (or whatever that's called), there's no need to use arrow function syntax
}
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
      };
      
    }

    handleClick(i) {
      const squares = this.state.squares.slice(); //this creates a copy for immutability reasons
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O'; //this syntax seems common. I think it works like booleanValue ? ifBoolTrueDo : ifBoolFalseDo
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }

    renderSquare(i) {
      return (
        <Square 
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)} 
        /> //so anything passed in here will be accessible in Square by using this.props.whatever
      );
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next Player: ' + (this.state.xIsNext ? "X" : "O");
      }
  
      return (
        <div>
          <div className="status">{status}</div> 
          <div className="board-row">
          {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]; //these are all of the possible combinations of matching indexes that would indicate winning values of a 3x3 grid, 
    //i.e. 0,1,2 represents the top row of the grid
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];//declares an array of [a = lines[i][0], b = lines[i][1] . . .)
      //checks if squares[a] first to make sure that it's not 3 missing nulls. 
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  //Ok so here's what I think is happening based on just skimming the code
  //1. the classes are defined as extensions of React.Component, (which includes a .render() method which is being overridden?)
  