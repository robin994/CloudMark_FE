const Login = () => {
    const onSubmit = () => {
        let email = document.getElementById("emailLogin") as HTMLInputElement
        let psw = document.getElementById("pswLogin") as HTMLInputElement
        sessionStorage.email = email.value
        sessionStorage.psw = psw.value
        sessionStorage.auth = true
        sessionStorage.username = "TestAuthenticatedUser"
        
    }
    return (
    <>
        <p></p>
        <div className="log-div">
        <h2 className="loggami">Log In</h2>
            <form action="">
                <p>
                    <input type="email" placeholder="email" required className="form-control" id="emailLogin" />
                </p>
                <p>
                    <input type="password" placeholder="password" required className="form-control" id="pswLogin" />
                </p>
                <p>
                    <button id="sub_btn" type="submit" className="btn btn-outline-primary logbtn" onClick={() => onSubmit()} >Log In</button>
                </p>
                
            </form>
        </div>

     
        
        
            
    </>
  )
}

export default Login