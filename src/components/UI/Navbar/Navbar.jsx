import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";
import AboutUs from "../../../pages/AboutUs";

const Navbar = () => {

    const {isAuth, setIsAuth}= useContext(AuthContext);
    const logout = () =>{
        setIsAuth(false);
        localStorage.removeItem('auth')
    }
    return (
        <div className="navbar">
            <div className="navbar-wrapper">
            <ul className="navbar-info">
                <li><a className="navbar-info__item" > <Link to= "/aboutUs" > О нас </Link></a></li>
                <li><a className="navbar-info__item"> <Link to="/posts">Блог</Link></a></li>
            </ul>
                <MyButton onClick={logout} className="button-Out">Выйти</MyButton>
        </div>
        </div>
    );
};

export default Navbar;

