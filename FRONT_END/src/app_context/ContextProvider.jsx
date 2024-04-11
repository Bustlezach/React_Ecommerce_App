import React, {useState} from 'react';
import { MyContext } from "./Context";


function ContextProvider({children}) {
  const [name, setName] = useState(undefined);
  const [school, setSchool] = useState(undefined);
  const [color, setColor] = useState("white");

  const myStates = {
    name,
    setName,
    school,
    setSchool,
    color,
    setColor,
  }

  return (
    <MyContext.Provider value={myStates} >
      {children}
    </MyContext.Provider>
  )
}


export default  ContextProvider;
