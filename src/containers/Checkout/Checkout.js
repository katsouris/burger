import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

class Checkout extends Component{

    checkoutCanceledHandler=()=>{
        this.props.history.goBack()
    }
    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
    let summary = <Redirect to="/" />;
    if(this.props.ing){
        const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> :null;
       summary=( <div>
           {purchasedRedirect}
            <CheckoutSummary
                checkoutContinued={this.checkoutContinuedHandler}
                checkoutCanceled={this.checkoutCanceledHandler}
                ingredients={this.props.ing}/>
            <Route path={this.props.match.url + "/contact-data"} component={ContactData}   />

        </div>);
    }
        return summary;

    }

}

const mapStateToProps=state=> {
    return {
        ing: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default  connect(mapStateToProps)(Checkout);