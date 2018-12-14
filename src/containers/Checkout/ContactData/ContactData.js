import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from "../../../axios-orders";
import Input from '../../../components/UI/Input/Input';


class contactData extends Component{
    state={
        orderForm: {

                name : {
                  elementType: 'input',
                  elementConfig:{
                      type: 'text',
                      placeholder: 'Your name'
                  },
                  value: '',
                  validation: {
                      required:true
                  },
                    valid:false,
                    touched: false
                },
                surname: {
                    elementType: 'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Your surname'
                    },
                    value: '',
                    validation: {
                        required:true
                    },
                    valid:false,
                    touched: false
                },
                age: {
                    elementType: 'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Your age'
                    },
                    value: '',
                    validation: {
                        required:true,
                        minLength: 0,
                        maxLength: 2
                    },
                    valid:false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig:{
                        type: 'email',
                        placeholder: 'Your email'
                    },
                    value: '',
                    validation: {
                        required:true
                    },
                    valid:false,
                    touched: false
                },
                deliveryMethod:{
                    elementType: 'select',
                    elementConfig:{
                        options:[
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                            ]
                    },
                    value: 'fastest',
                    validation: { },
                    valid:false,
                    touched: false
                }


        },
        loader: false,
        formIsValid:false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loader:true});
        //alert('THA FAME MAGKES')
        const formData ={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            orderData: formData



        };

        axios.post('/orders.json',order).then(response=>{
            this.setState({ loader: false})
            this.props.history.push('/');
        }).catch(error=>{
            this.setState({ loader: false})
        })
    }

     checkValidity(value,rules){
        let isValid= true;

        if(rules.required){
            isValid =value.trim() !== '' && isValid;
        }

        if (rules.minLength){
            isValid = value.length >=rules.minLength && isValid
        }
        if (rules.maxLength){
            isValid = value.length <=rules.maxLength && isValid
        }
        return isValid;
     }

     inputChangedHandler=(event,inputIndentifier)=>{
        //console.log(event.target.value)
         let updatedOrderForm={
             ...this.state.orderForm
         }

         const updatedOrderFormElement= {
             ...updatedOrderForm[inputIndentifier]
        };
        updatedOrderFormElement.value= event.target.value
        updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation)
        updatedOrderFormElement.touched=true;
        updatedOrderForm[inputIndentifier] = updatedOrderFormElement
         //console.log(updatedOrderFormElement)
         let formIsvalid =true ;
        for(let inputIndentifier in updatedOrderForm){
            formIsvalid= updatedOrderForm[inputIndentifier].valid && updatedOrderForm[inputIndentifier].validation
        }
        console.log(formIsvalid)
         this.setState({
             orderForm: updatedOrderForm,formIsValid:formIsvalid
          })



    }

    render(){
        const formElementsArray= [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form=(
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement=>(
                    <Input
                        key={ formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}/>
                ))}
            <Button Btntype="Success" disabled={!this.state.formIsValid}>Order Now</Button>
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