import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {

    static defaultProps = {
        nrows : 5,
        ncols : 5,
        chanceLightStartsOn : 0.25
    };

    constructor(props) {
        super(props);

        // TODO: set initial state
        this.state = {
            hasWon : false,
            board : this.createBoard()
        };
    }

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

    createBoard() {
        let board = [];
        // TODO: create array-of-arrays of true/false values
        for(let y = 0; y < this.props.nrows ; ++y){
            let row = [];
            for(let x = 0; x < this.props.ncols; ++x){
                row.push(Math.random() < this.props.chanceLightStartsOn)
            }
            board.push(row);
        }
        return board
    }

    /** handle changing a cell: update board & determine if winner */

    flipCellsAround(coord) {
        let {ncols, nrows} = this.props;
        let board = this.state.board;
        let [y, x] = coord.split("-").map(Number);

        function flipCell(y, x) { 
            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                board[y][x] = !board[y][x];
            }
        }

        flipCell(y,x);
        flipCell(y,x - 1);
        flipCell(y,x + 1);
        flipCell(y - 1,x);
        flipCell(y + 1,x);

        let hasWon = board.every(row => row.every(cell => !cell));

        this.setState({ board : board, hasWon : hasWon});
    }

    render() { 
        if(this.state.hasWon){
            return <h1>YOU WON !!!</h1>;
        }

        let tableBoard = [];
        for(let y = 0; y < this.props.nrows; ++y){
            let row = [];
            for(let x = 0; x < this.props.ncols; ++x){
                let coord = `${y}-${x}`
                row.push(<Cell key = {coord} isLit = {this.state.board[y][x]} flipCellsAround = {() => this.flipCellsAround(coord)} />)
         
           }
            tableBoard.push(<tr key = {y}>{row}</tr>)
        }

        return(
            <div>
                {this.state.hasWon ? (
                        <div className = "winner">
                            <span className = "neon-orange">YOU</span>    
                            <span className = "neon-blue">WIN</span>                    
                        </div>
                    ) : (
                        <div>
                            <div className = "Board-title">
                                <div className = "neon-orange">Lights</div>    
                                <div className = "neon-blue">Out</div>                    
                            </div>                   
                            <table className = "Board">
                                <tbody>
                                    {tableBoard}
                                </tbody>
                            </table>
                        </div>                
                    )
                }
            </div>
        );
    }
}


export default Board;