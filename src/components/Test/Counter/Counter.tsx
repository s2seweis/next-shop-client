import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from '../../../redux/slices/counterSlice';
import styles from '../../../styles/scss/components/test/Counter.module.scss';

export function Counter() {
  const count = useAppSelector(selectCount);
  console.log('line:100', count);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState<string>('2');
  console.log('line:200', incrementAmount);

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      {/* ### - more complex in its logic */}
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
      {/* ### */}
    </div>
  );
}
