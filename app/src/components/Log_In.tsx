import React from 'react'

const Login = () => {
 

    
  return (
    <>

       
        <p></p>
        <div className="log-div">
        <h2 className="loggami">Log In</h2>
            <form action="">
                <p>
                    
                    <input type="email" name="username" placeholder="email"required  className="form-control"/>
                </p>
                <p>
                  
                    <input type="password" name="password" placeholder="password"required className="form-control"/>
                </p>
                <p>
                    <button id="sub_btn" type="submit" className="btn btn-outline-primary logbtn">Log In</button>
                </p>
                
            </form>
        </div>

     
        
        
            
    </>
  )
}

export default Login