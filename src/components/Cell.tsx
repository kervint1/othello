import styles from './cell.module.css';
export const Cell = (props: { color: number; onClick: () => void }) => {
  return (
    <div className={styles.cell} onClick={props.onClick}>
      {props.color !== 0 && (
        <div
          className={styles.stone}
          style={{
            background: props.color === 1 ? `#000` : props.color === 2 ? `#fff` : '#ff1414b5',
          }}
        >
          {props.color > 2 && (
            <div>
              <h1>{props.color - 2}</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
