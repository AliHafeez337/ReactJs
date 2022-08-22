import React, { useState, useCallback, useMemo } from 'react';

import './App.css';
import DemoList from './components/Demo/DemoList';
import Button from './components/UI/Button/Button';
import BasicForm from './components/BasicForm';

function App() {
  const [counter, setCounter] = useState(0);
  const [counter1, setCounter1] = useState(0);
  const [listTitle, setListTitle] = useState('My List');

  const changeTitleHandler = useCallback(() => {
    setListTitle('New Title');
    setCounter(prev => prev + 1)
  }, []);
  // const changeTitleHandler = () => {
  //   setListTitle('New Title');
  // };

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);
  const sx1 = useMemo(() => {
    console.log('sx1 runs')
    return {
      height: '80%',
      width: '80%',
      margin: 'auto',
      backgroundColor: 'white'
    };
  }, []);
  // const listItems = [5, 3, 1, 10, 9];

  return (
    <div className="app">
      <BasicForm />
      {counter}
      <DemoList sx1={sx1} title={listTitle} items={listItems}>
        {/* {counter1} */}
        <div>{counter1}</div>
      </DemoList>
      {/* <DemoList items={listItems} /> */}
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;
