import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Header = () => {
    const navigate = useNavigate();

    const { user, logoutUser } = useAuth()



    return (
        <div className="header">
            <div>
                <Link id="header-logo" to="/">
                    LOGO
                </Link>
            </div>

            <div className="links--wrapper">
                {user ? (
                    <>
                        <Link to="/" className="header--link">
                            Home
                        </Link>
                        <Link to="/profile" className="header--link">
                            Profile
                        </Link>

                        {/* <Link to="/employees" className="header--link">
                            Employees
                        </Link> */}

                        <button onClick={logoutUser} className="btn">
                            Logout
                        </button>
                    </>
                ) : (

                    <Link className="btn" to="/login">Login</Link>

                )}

                {/* Uncomment the following lines to include a Login link */}
                {/* <>
          <Link className="btn" to="/login">
            Login
          </Link>
        </> */}
            </div>
        </div>
    );
};

export default Header;