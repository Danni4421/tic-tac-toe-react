import React from 'react'
import { useState } from 'react';
import './../App.css'

const getPlayerFirst = () => {
    const randomMath = Math.floor(Math.random() * 10);
    if (randomMath <= 5) {
        return 'x';
    } else {
        return 'o';
    }
}

const TicTacToe = () => {
    
    const [turn, setTurn] = useState(getPlayerFirst());
    const [history, setHistory] = useState(Array(9).fill(''));
    const [player, updatePlayer] = useState('You');
    let winner;

    const checkWinner = (square) => {
        let comboWin = {
            horizon: [
                [0,1,2],
                [3,4,5],
                [6,7,8]
            ],
            vertical: [
                [0,3,6],
                [1,4,7],
                [2,5,8]
            ],
            diagonal: [
                [0,4,8],
                [2,4,6]
            ]
        };

        for (let combo in comboWin) {
            comboWin[combo].forEach(el => {
                const [a, b, c] = el;
                if (
                    square[a] === '' ||
                    square[b] === '' ||
                    square[c] === ''
                ) {
                    return;
                } else if (
                    square[a] === square[b] &&
                    square[b] === square[c]
                ) {
                    setWinner(square[a]);
                }
            })
        }
    }

    const setWinner = (res) => {
        if (res === 'x') {
            winner = 'Player';
        } else {
            winner = 'Computer';
        }

        alert(`Winner is ${winner}`)
    }

    const handlerClick = (num) => {

        if (history[num] !== '') {
            return;
        }

        let square = [...history];
        const player = 'x';
        const comp = 'o';

        square[num] = player;
        setTurn(comp);
        updatePlayer('Computer');
        square = setCompTurn(square)
        if (turn === comp) {
            setTurn(player);
            updatePlayer('Player');
        }
        
        // update squares
        setHistory(square);

        // check winner
        checkWinner(square);
    }

    const setCompTurn = (square) => {
            if (square[randomNumber] !== '') {
                while (true) {
                    const newRandom = Math.floor(Math.random() * 9) - 1;
                    if (square[newRandom] === '') {
                        square[newRandom] = 'o';
                        break;
                    }
                }
            }
        return square;
    }

    const clearTerain = () => {
        setHistory(Array(9).fill(''))
    }

    const randomNumber = () => {
        return Math.floor(Math.random() * 9) - 1;
    }

    const Square = ({ind, squareClass}) => {
        return <td className={squareClass} onClick={() => handlerClick(ind)}>{history[ind]}</td>;
    }

    return (
        <div>
            <button className='btn' onClick={clearTerain}>Reset Game</button>
            <table>
                Turn : {player + ' turn'}
                <tr>
                    <Square ind={0} />
                    <Square ind={1} />
                    <Square ind={2} />
                </tr>
                <tr>
                    <Square ind={3} />
                    <Square ind={4} />
                    <Square ind={5} />
                </tr>
                <tr>
                    <Square ind={6} />
                    <Square ind={7} />
                    <Square ind={8} />
                </tr>
            </table>
        </div>
    )
}

export default TicTacToe;