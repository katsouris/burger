import React from 'react';

import classes from './Button.css';

const button = (props) =>(
    <button onClick={props.clicked} disabled={props.disabled} className={[classes.Button, classes[props.Btntype]].join(' ')}>
        {props.children}
    </button>


);

export default button;