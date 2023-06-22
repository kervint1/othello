import { Cell } from '../components/Cell';
import { useGame } from '../hooks/useGame';
import styles from './index.module.css';
const Home = () => {
  const { board, onClick, turncolor, white_num, black_num, pass, x } = useGame();
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <Cell key={`${x}-${y}`} color={color} onClick={() => onClick(x, y)} />
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
