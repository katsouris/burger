import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer=(props)=>{
    let attachedClasses=[classes.SideDrawer, classes.Close];
    if (props.opened){
        attachedClasses=[classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backrop show={props.opened} clicked={props.closed}/>
                <div className={attachedClasses.join(' ')}>
                    <div className={classes.Logo}>
                    <Logo />
                    </div>
                    <nav className={classes.DesktopOnly}>
                        <NavigationItems
                            isAuthenticated={props.isAuth}
                        />
                    </nav>


                </div>
        </Aux>
    );

}


export default sideDrawer;