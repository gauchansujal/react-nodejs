import React from 'react';
import Header from "../components/Header"; // ✅ capital H
import Fotter from "../components/Fotter";

function Home() {
  return (
     
    <div>
     <Header /> 
      <div className='homepage'>
        <h1>hello world</h1>
      </div>
       <Fotter/>
    
    </div>
   

   
  );


}
  

export default Home;
