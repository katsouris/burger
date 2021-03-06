import React from'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary =(props) =>{
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it taste good</h1>
            <div style={{width:'100%', margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
            </div>
            <Button Btntype="Danger" clicked={props.checkoutCanceled}> CANCEL</Button>
            <Button Btntype="Success" clicked={props.checkoutContinued}> OK</Button>

        </div>

    );
}
export default checkoutSummary;