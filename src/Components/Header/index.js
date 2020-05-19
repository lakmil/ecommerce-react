import React from 'react';
import './styles.scss';
import Logo from '../../assets//mslogo.png'
import { Link } from 'react-router-dom';
import {auth} from '../../firebase/utils';
import { connect } from 'react-redux';

const Header = (props) => {
    const { currentUser } =props;
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="ms logo" />
                    </Link>
                </div>
                <div className="callToActions">
                    {currentUser && (
                        <ul>
                            <li>
                                <Link onClick={() => auth.signOut()}>
                                    LOGOUT
                                </Link>
                            </li>
                        </ul>
                    )}
                    {!currentUser && (
                    <ul>
                        <li>
                            <Link to="/Registration">
                                REGISTER
                            </Link>
                        </li>
                        <li>
                            <Link to="/Login">
                                LOGIN
                            </Link>
                        </li>
                    </ul>
                    )}
                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    currentUser: null
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
})
export default connect(mapStateToProps, null)(Header);