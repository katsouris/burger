import React,{Component} from 'react';
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
                     <Toolbar open={this.sideDrawerOpenedHandler}/>
                     <SideDrawer opened={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                     <main className={classes.Content}>
                         {this.props.children}
                     </main>
                 </Aux>
        );

    }
}

export default Layout;