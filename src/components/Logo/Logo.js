import React from 'react';
import classes from './Logo.css';
import Burgerlogo from '../../assets/Image/burger-logo.png';


const logo = () =>(
    <div className={classes.Logo}>
        <img src={Burgerlogo} alt="BurgerLogo"/>

    </div>


);

export default logo;