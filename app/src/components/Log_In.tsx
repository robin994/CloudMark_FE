import React,{useEffect,useState,useRef} from 'react'

const Login = () => {
 

    
  return (
    <div>

       
        <p></p>
        <div className="log-div">
        <h2 className="loggami">Log In</h2>
            <form>
                <p>
                    
                    <input type="email" name="username" placeholder="email"required id="email" className="form-control"/>
                </p>
                <p>
                  
                    <input type="password" name="password" placeholder="password"required className="form-control"/>
                </p>
                <p>
                    <button id="sub_btn" type="submit" className="btn btn-outline-primary logbtn">Log In</button>
                </p>
                
            </form>
        </div>

     
        
        
            
    </div>
  )
}

export default Login