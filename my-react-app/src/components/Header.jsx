import {useState} from 'react';
import './header.css';

function Header(){
    return(
        <div className ="container">
            <button  className="lButton">login</button>
            <button className="RButton">Register</button>
        </div>

    )
}
export default Header;