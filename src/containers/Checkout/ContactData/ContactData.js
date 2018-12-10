import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from "../../../axios-orders";


class contactData extends Component{
    state={
        name: '',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loader: false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loader:true});
        //alert('THA FAME MAGKES')
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            customer:{
                name : 'Dimitris',
                surname: 'Katsouris',
                age: '10',
                email: 'katsourisdimi@gmail.com'
            }


        };

        axios.post('/orders.json',order).then(response=>{
            this.setState({ loader: false})
            this.props.history.push('/');
        }).catch(error=>{
            this.setState({ loader: false})
        })
    }
    render(){
        let form=(
            <form>
            <input className={classes.Input}  type="text" name="name" placeholder="Your name" ></input>
            <input className={classes.Input} type="email" name="email" placeholder="Your email" ></input>
            <input className={classes.Input} type="text" name="street" placeholder="Your street" ></input>
            <input className={classes.Input} type="text" name="postalcode" placeholder="Your postalCode" ></input>
            <Button Btntype="Success" clicked={this.orderHandler} >Order Now</Button>
        </form>
        );
        if(this.state.loader){
            form= <Spinner />;
        }
        return(
         <div className={classes.ContactData}>
            <h4>Complete your Order</h4>
             {form}
         </div>

        );
    }
}
export default contactData;