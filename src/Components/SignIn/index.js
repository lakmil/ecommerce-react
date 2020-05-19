import React, { Component } from 'react';
import './styles.scss';
import Button from './../forms/Button/index';
import { signInWithGoogle, auth } from './../../firebase/utils';
import FormInput from '../forms/Input/index'
import AuthWrapper from '../AuthWrapper/index';
import { Link } from 'react-router-dom';

const initialState = {
    email: '',
    password: ''
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            })
        }
        catch (err) {
            alert(err);
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    render() {
        const { email, password } = this.state;
        const configAuthWrapper = {
            headline: 'Login'
        }
        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    <form onSubmit={this.handleSubmit}>
                        <FormInput type="email" name="email" value={email} placeholder="Enter your Email" onChange={this.handleChange} />
                        <FormInput type="password" name="password" value={password} placeholder="Enter your Password" onChange={this.handleChange} />
                        <Button type="submit">
                            Login
                                 </Button>
                        <div className="socialSignin">
                            <div className="row">
                                <Button onClick={signInWithGoogle}>
                                    Sign In With Google
                                    </Button>
                            </div>
                        </div>
                        <div className="links">
                            <Link to="/Recovery">
                                Forgot Password?
                            </Link>
                        </div>
                    </form>
                </div>
            </AuthWrapper>


        );
    }
}

export default SignIn;