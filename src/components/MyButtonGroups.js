import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function MyButtonGroups() {
  const [count , setCount] = React.useState(0)
  const [disable, SetDisable] = React.useState(false)

  function add() {
    const newCount = count + 1
    setCount(newCount)
  }
  function clear() {
    setCount(0)
  }
  function clickDisable() {
    const newDisable = !disable
    SetDisable(newDisable)
  }
  return (
    <>
    <ButtonGroup color='primary' size='large' orientation='vertical' sx={{Button:{fontWeight: 'bold',width: '110px'}}}
    >
        <Button onClick={()=>{add()}} disabled={disable} >CLICK:{count}</Button>
        <Button onClick={()=>{clear()}} disabled={disable}>CLEAR</Button>
        <Button onClick={()=>{clickDisable()}}>{disable? 'ABLE':'DISABLE'}</Button>
    </ButtonGroup>
    </>
  );
}

export default MyButtonGroups;
