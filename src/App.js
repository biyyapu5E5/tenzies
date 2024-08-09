import React from 'react';
import './App.css';
import Die from './Die';
import {nanoid} from 'nanoid';
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(newDie())
  const [tenzies, setTenzies] = React.useState(false)
  // const [hold, setHold] = React.useState([])
  // const [val, setVal] = React.useState([])
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
    // dice.map(die => {
    //           if(die.isHeld) 
    //           {
    //             hold.push(true) 
    //           }
    //           if(die.value === dice[0].value){
    //             val.push(die.value)
    //           }
    //         })
    // setHold(hold)
    // setVal(val)
    // // console.log(hold)
    // // console.log(val)
    // if(hold.length === 10 && val.length === 10){
    //   setTenzies(true)
    //   console.log("You won")
    // }
    // else{
    //   setHold([])
    //   setVal([])
    // }
  },[dice])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function newDie() {
    const arr = []
    for(let i=0; i<10; i++) {
      arr.push(generateNewDie())
    }
    return arr
  }

  function rollDie() {
    if(tenzies){
      setDice(newDie())
      setCount(0)
      setTenzies(false)
    }
    else{
      setDice(prevDie => prevDie.map(die => {
         return die.isHeld ? die : generateNewDie()
        })
      )
      setCount(count + 1)
    }
  }

  function holdDice(id) {
    // console.log(id)
    setDice(dice.map(prevDie => {
        return(
          prevDie.id === id ? {...prevDie, isHeld : !prevDie.isHeld} : prevDie
          )
      })
    )
  }
  const diceElements = dice.map(die => 
    <Die 
      key = {die.id}
      value = {die.value} 
      isHeld = {die.isHeld}
      holdDice = {() => holdDice(die.id)}
      />
    )

  return (
    <main className='container'>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="die-container">
          {diceElements}
      </div>
      {tenzies && <p className='count'>Number Of Rolls : {count}</p>}
      <button onClick = {rollDie}>{tenzies ? 'Reset': 'Roll' }</button>
    </main>
  );
}

export default App;
