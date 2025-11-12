import {useState} from 'react';
import './Header.css';

function Header(){
    return(
        <div className ="container">
            <p1>hpome</p1>
            <p2>Marketplace</p2>
            <p3>Trends</p3>
            <p4>About</p4>
            <p5>Contact</p5>
            <button  className="lButton">login</button>
            <button className="RButton">Register</button>
        </div>

    )
}
export default Header;