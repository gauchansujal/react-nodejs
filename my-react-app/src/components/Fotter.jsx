import {useState} from "react";
import "./Fotter.css";
function Footer (){
    return (
        <div className ="box" >
            <section class="head">
                <h1>EcoTrade</h1>
                <p className="paragraph">
                <span className="break-after">smart recycling marktetplace </span> 
                <span className="break-after">connecting individuasl and bussinesses</span>
                <span className = "break-after">for sustainable material exchange.</span></p>
                     
          
            
            <aside class = "head2">
                <h1>Quick Links</h1>
                <ol className="list">
                 <li>Home</li>
                 <li>Marketplace</li>
                 <li>Price Trends</li>
                 <li>Request Pcikup</li>
                 <li>Become a Colection</li>
                 </ol>
            </aside>
            <aside className="head3">
                <h1>Materials</h1>
                <ol className="list">
                    <li>Plastic</li>
                    <li>Metal</li>
                    <li>Paper</li>
                    <li>Glass</li>
                    <li>Electronics</li>
                </ol>
            </aside>

            </section>
    
            
       

        </div>

    )
}
export default Footer;