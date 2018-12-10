import React,{Component} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';


class Modal extends  Component{
    shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;

    }

    componentWillUpdate(){
        console.log('[Modal] willupdate');

    }
    render(){
        return(
    <Aux>
        <Backdrop show={this.props.show} clicked={this.props.ModalClosed}/>
        <div
            style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'}}
            className={classes.Modal}>
            {this.props.children}
        </div>
    </Aux>

        );

    }


}

export default Modal;