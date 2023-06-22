import { useState } from 'react';
import { Cell } from '../components/Cell';
import styles from './index.module.css';
const Home = () => {
  const [turncolor, setTurncolor] = useState(1);
  //prettier=ignore
  const [board, setboard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [pass, setpass] = useState(0);
  function erase() {
    for (let allx = 0; allx <= 7; allx += 1) {
      for (let ally = 0; ally <= 7; ally += 1) {
        if (board[ally][allx] >= 3) {
          board[ally][allx] = 0;
        }
      }
    }
  }
  let stopx = 0;
  let stopy = 0;
  let turn_num = 0;
  function red() {
    for (let allx = 0; allx <= 7; allx += 1) {
      for (let ally = 0; ally <= 7; ally += 1) {
        if (board[ally][allx] === 0) {
          for (let movey = -1; movey <= 1; movey += 1) {
            for (let movex = -1; movex <= 1; movex += 1) {
              if (
                board[ally + movey] !== undefined &&
                board[allx + movex] !== undefined &&
                board[ally + movey][allx + movex] === 3 - turncolor
              ) {
                for (let distance = 2; distance <= 7; distance += 1) {
                  if (
                    board[ally + distance * movey] !== undefined &&
                    board[allx + distance * movex] !== undefined &&
                    board[ally + distance * movey][allx + distance * movex] === 0
                  ) {
                    break;
                  }
                  if (stopx === movex && stopy === movey) {
                    stopx = 50;
                    stopy = 50;
                    break;
                  }
                  if (
                    board[ally + distance * movey] !== undefined &&
                    board[allx + distance * movex] !== undefined &&
                    board[ally + distance * movey][allx + distance * movex] === turncolor
                  ) {
                    turn_num += distance - 1;
                    stopx = movex;
                    stopy = movey;
                  }
                }
              }
            }
          }
          if (turn_num > 0) {
            board[ally][allx] = 2 + turn_num;
            turn_num = 0;
          }
        }
      }
    }
  }
  erase();
  red();

  function find_red(rednum = 0) {
    for (let allx = 0; allx <= 7; allx += 1) {
      for (let ally = 0; ally <= 7; ally += 1) {
        if (board[ally][allx] === 3) {
          rednum += 1;
        }
      }
    }
    return rednum;
  }
  const x = find_red();
  if (x === 0 && pass <= 1) {
    setTurncolor(3 - turncolor);
    setpass(pass + 1);
  } else if (x > 0 && pass >= 1) {
    setpass(pass - pass);
  }

  stopx = 0;
  stopy = 0;
  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    if (board[y][x] === 0 || board[y][x] >= 3) {
      for (let movey = -1; movey <= 1; movey += 1) {
        for (let movex = -1; movex <= 1; movex += 1) {
          if (
            board[y + movey] !== undefined &&
            board[x + movex] !== undefined &&
            board[y + movey][x + movex] === 3 - turncolor
          ) {
            for (let distance = 2; distance <= 7; distance += 1) {
              if (
                board[y + distance * movey] !== undefined &&
                board[x + distance * movex] !== undefined &&
                board[y + distance * movey][x + distance * movex] === 0
              ) {
                break;
              }
              if (stopx === movex && stopy === movey) {
                stopx = 50;
                stopy = 50;
                break;
              }
              if (
                board[y + distance * movey] !== undefined &&
                board[x + distance * movex] !== undefined &&
                board[y + distance * movey][x + distance * movex] === turncolor
              ) {
                for (let flip = 0; flip <= distance; flip += 1) {
                  newBoard[y + flip * movey][x + flip * movex] = turncolor;
                  stopx = movex;
                  stopy = movey;
                  setboard(newBoard);
                  setTurncolor(3 - turncolor);
                }
              }
            }
          }
        }
      }
    }
  };
  let white_num = 0;
  for (let x = 0; x <= 7; x += 1) {
    for (let y = 0; y <= 7; y += 1) {
      if (board[y][x] === 2) {
        white_num += 1;
      }
    }
  }

  let black_num = 0;
  for (let x = 0; x <= 7; x += 1) {
    for (let y = 0; y <= 7; y += 1) {
      if (board[y][x] === 1) {
        black_num += 1;
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <Cell key={`${x}-${y}`} color={color} onClick={() => onClick(x, y)}></Cell>
          ))
        )}
      </div>
      <div className={styles.turndetails}>
        <h1>{turncolor === 1 ? '黒' : '白'}の番です</h1>
        <h1>白 {white_num}</h1>
        <h1>{black_num} 黒</h1>
        <h1>{pass}</h1>
        <h1>{x}</h1>
      </div>
    </div>
  );
};
export default Home;
