import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SIdeDrawer/SideDrawer';



class Layout extends Component{
    state={
        showSideDrawer : false

    }


    sideDrawerClosedHandler=()=>{
        this.setState({ showSideDrawer : false});

    }
    sideDrawerOpenedHandler=()=>{
        this.setState({ showSideDrawer : true});

    }



    render() {
        return(
                 <Aux>
                     <Toolbar
                         isAuth={this.props.isAuthenticated}
                         open={this.sideDrawerOpenedHandler}/>
                     <SideDrawer
                         isAuth={this.props.isAuthenticated}
                         opened={this.state.showSideDrawer}
                         closed={this.sideDrawerClosedHandler}/>
                     <main className={classes.Content}>
                         {this.props.children}
                     </main>
                 </Aux>
        );

    }
}


const mapStateToProps = state =>{
    return {
        isAuthenticated : state.auth.token !== null
    }
};

export default withRouter(connect(mapStateToProps,null)(Layout));