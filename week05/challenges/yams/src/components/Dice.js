import './Dice.css'
import React from 'react';

function Yams(props) {
    if (props.value === '') return (null)

    //! Dice border if selected
    var diceStyle = {
        margin: '10px',
        width: '100px'
    }
    if (props.selected) {
        diceStyle = {
            margin: '10px',
            width: '100px',
            border: '2px red solid'
        }
    }

    //! Handler for dice selector
    var diceSelector = (index) => {
        props.diceSelector(index)
    }

    return (
        <div>
            <img style={diceStyle} onClick={() => diceSelector(props.index)} src={"/img/" + props.value + ".png"} alt="Dice pic" />
        </div>
    )
}

export { Yams };