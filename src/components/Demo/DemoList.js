import React, { useEffect, useMemo, useState } from 'react';

import classes from './DemoList.module.css';

const DemoList = (props) => {
  const { items } = props;
  const [counter, setCounter] = useState(0);

  const sortedList = useMemo(() => {
    console.log('Items sorted');
    return items.sort((a, b) => a - b);
  }, [items]); 
  // const sortedList = items.sort((a, b) => a - b);
  console.log('DemoList RUNNING');

  useEffect(() => {
    console.log('abc runs');
    setCounter(1);
  }, [props.items])

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div>{counter}</div>
    </div>
  );
};

export default React.memo(DemoList);
