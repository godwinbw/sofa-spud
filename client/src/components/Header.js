import React from 'react';
// import { Route, NavLink, HashRouter, Switch } from 'react-router-dom';
// import Login from '../pages/Login';
// import Signup from '../pages/signup';
import { Link } from 'react-router-dom';

// import Auth from '../utils/auth';

const Header = () => {
    // const logout = event => {
    //     event.preventDefault();
    //     Auth.logout();
    // };

    return (
        <header>
            <div>
                <Link to="/">
                    <h1>Movies</h1>
                </Link>

                <nav>
                    {/* {Auth.loggedIn() ? ( */}
                        <>
                        {/* link to whatever wec all it will need to be changed from profile */}
                            <Link to="/profile">??</Link>
                            {/* add onClick={logout} */}
                            <a href="/" >
                                Logout
                            </a>
                        </>
                    {/* ) : ( */}
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    {/* )} */}
                </nav>
            </div>
        </header>
    );
};

export default Header;