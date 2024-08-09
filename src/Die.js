import React from "react";

export default function Die({value, isHeld, holdDice}){
    // console.log(props)
    const styles = {
        backgroundColor : isHeld ? 'lightgreen' : 'white'
    }
    return(
        <div 
            className = 'die' 
            onClick={holdDice}
            style = {styles}
        >
            {/* {value} */}
            <img alt = 'dice' src = {isHeld ? `dice-${value}.png` : `inverted-dice-${value}.png`} width='50px' height='50px'/>
        </div>
    )
}

