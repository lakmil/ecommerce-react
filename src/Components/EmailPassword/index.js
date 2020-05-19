import React , { Component } from 'react';
import './styles.scss';
import AuthWrapper from '../AuthWrapper/index';
import FormInput from '../forms/Input/index';
import Button from '../forms/Button/index';
import { auth } from '../../firebase/utils';
import { withRouter } from 'react-router-dom';

const initialState = {
    email: '',
    errors: []
}

class EmailPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...initialState
        } 
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const { email, errors } =this.state;
            const config = {
                url: 'http://localhost:3000/Login'
            }
            await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                // console.log("Paasword Reset");
                this.props.history.push('/Login');
            })
            .catch(() => {
                // console.log("Something went Wrong");
                const err=['Email dosen\'t exist'];
                this.setState({
                    errors: err
                })
            })
        }
        catch(err){
            alert(err);
        }
    }

    render(){
        const { email, errors } = this.state;
        const configAuthWrapper = {
            headline: 'Email Password'
        }
        return(
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    {errors.length > 0 && (
                        <ul>
                           {errors.map((err,index) => {
                               return (
                                   <li key={index}>
                                       {err}
                                   </li>
                               );
                           })}
                        </ul>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        <FormInput type="email" name="email" value={email} placeholder="Enter Email" onChange={this.handleChange} />
                        <Button type="Submit">
                            Email Password
                        </Button>
                    </form>
                </div>
            </AuthWrapper>
        );
    }
}

export default withRouter(EmailPassword);