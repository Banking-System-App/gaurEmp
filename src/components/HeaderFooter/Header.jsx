import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

const Header = () => {
    const navigate = useNavigate();

    const { user, logoutUser } = useAuth()



    return (
        <div className="header position-fixed fixed-top">
            <div>
                <Link id="header-logo" to="/">
                    LOGO
                </Link>
            </div>

            <div className="links--wrapper">
                {user ? (
                    <>
                        <NavLink to="/" className="header--link">
                            Home
                        </NavLink>
                       

                        <NavLink to="/about" className="header--link">
                            About US
                        </NavLink>

                        <NavLink to="/contact" className="header--link">
                            Contact US
                        </NavLink>

                        <button onClick={logoutUser} className="btn">
                            Logout
                        </button>
                    </>
                ) : (

                    <Link className="btn" to="/login">Login</Link>

                )}
            </div>
        </div>
    );
};

export default Header;
