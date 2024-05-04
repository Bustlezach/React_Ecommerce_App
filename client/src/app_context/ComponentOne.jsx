import React, { useContext } from 'react';
import { MyContext } from './Context';

function ComponentOne({oruko, oda}) {
  const {name, setName, color, setColor} = useContext(MyContext);
  setName(oruko);
  setColor(oda);
  return (
    <div>
      <h1>The name from context: {name} </h1>
      <h3>The colour from context: {color} </h3>
    </div>
  )
}

export default ComponentOne;
