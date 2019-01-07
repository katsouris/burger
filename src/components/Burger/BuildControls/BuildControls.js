import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls=[
    {label:"Salad", types:"salad"},
    {label:"Meat", types:"meat"},
    {label:"Cheese", types:"cheese"},
    {label:'Bacon', types:"bacon"}
];
const buildControls= (props)=>(

    <div className={classes.BuildControls}>
        <p>Current Price: <strorng>{props.price.toFixed(2)}</strorng></p>
        {controls.map(ctrl=>(
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
            added={()=>props.ingredientAdded(ctrl.types)}
            removed={()=>props.ingredientRemoved(ctrl.types)}
            disabled={props.disabled[ctrl.types]}/>


        ))}
        <button className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>Order now</button>

    </div>




);



export default buildControls;