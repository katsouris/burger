import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';




class BurgerBuilder extends Component{
    state={
        purchasing: false

    };

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey];


            })
            .reduce((sum, el)=>{
                return sum +el;
        },0);
            return  sum > 0;
    }

    purchasingHandler=()=>{

        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else{
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }



    };
    cancelHandler=()=>{
        this.setState({purchasing: false})
    };
    continueHandler =()=>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    };
    componentDidMount=()=>{
        console.log(this.props);
        this.props.onFetchIngredients();
    };


    render() {
        const disabledInfo={
            ...this.props.ing
        };
        for(let key in disabledInfo){
        disabledInfo[key]= disabledInfo[key]<=0;

        }
        let orderSummary = null;
        let burger =this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner />;
        if(this.props.ing) {
            burger = (<Aux>
                <Burger ingredients={this.props.ing}/>

                <BuildControls
                    disabled={disabledInfo}
                    ingredientAdded={this.props.onAddedingredient}
                    ingredientRemoved={this.props.onRemovedingredient}
                    price={this.props.toPr}
                    purchasable={this.updatePurchaseState(this.props.ing)}
                    auth={this.props.isAuthenticated}
                    ordered={this.purchasingHandler}/>
            </Aux>);
            orderSummary= (
                        <OrderSummary ingredients={this.props.ing}
                          continued={this.continueHandler}
                          canceled={this.cancelHandler}
                          price={this.props.toPr}/>);
        }


        return(

            <Aux>
                <Modal show={this.state.purchasing}  ModalClosed={this.cancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>

        );
    }


}
const mapStateToProps = state =>{
    return{
        ing: state.burgerBuilder.ingredients,
        toPr: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token

    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onAddedingredient:(name) => dispatch(actions.addIngredient(name)),
        onRemovedingredient:(name) => dispatch(actions.removeIngredient(name)),
        onFetchIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit()),
        onSetRedirectPath:(path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));