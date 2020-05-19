import React, { Component } from 'react';
import './styles.scss';
import FormInput from '../../Components/forms/Input/index';
import Button from '../../Components/forms/Button/index';
import { auth, handleUserProfile } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper/index';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
}

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };
        this.handelChange = this.handelChange.bind(this);
    }

    handelChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword, errors } = this.state;
        const pass = /^[A-Za-z]{7,14}$/
        if (password !== confirmPassword) {
            const err = ['Passwords Don\'t Match'];
            this.setState({
                errors: err
            })
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, { displayName });
            this.setState({
                ...initialState
            })
        }
        catch (err) {
            console.log(err);
            alert(err);
        }
        // if(!password.match(pass)){
        //     const err = ['Password should be between 7 and 16 characters [Characters, Numneric Digits, Underscore]'];
        //     this.setState({
        //         errors: err
        //     })
        // }


    }
    render() {
        const { displayName, email, password, confirmPassword, errors } = this.state;
        const configAuthWrapper = {
            headline: 'Register'
        }
        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    {errors && (
                        <ul>
                            {errors.map((err, index) => {
                                return (
                                    <li key={index}>
                                        {err}
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="socialSignup">
                            <FormInput type="text" name="displayName" value={displayName} placeholder="Full Name" onChange={this.handelChange} />
                            <FormInput type="email" name="email" value={email} placeholder="Email" onChange={this.handelChange} />
                            <FormInput type="password" name="password" value={password} placeholder="Password" onChange={this.handelChange} />
                            <FormInput type="password" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" onChange={this.handelChange} />
                            <Button type="submit">
                                Register
                        </Button>
                        </div>
                    </form>
                </div>
            </AuthWrapper>


        );
    }
}

export default Signup;