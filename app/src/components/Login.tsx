import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    if (sessionStorage.auth !== "true") {
        navigate("/login")
    }
    const onSubmit = () => {
        let email = document.getElementById("emailLogin") as HTMLInputElement
        let psw = document.getElementById("pswLogin") as HTMLInputElement
        sessionStorage.auth = "true"
        sessionStorage.account_id = '1'
        sessionStorage.account_psw = psw.value
        sessionStorage.account_username = "TestAuthenticatedUser"
        sessionStorage.account_data = "2022/08/19 18:10:59:345" // datetime stringified
        sessionStorage.dipendente_email = email.value
        sessionStorage.azienda_nome = "TestAzienda"
        sessionStorage.azienda_id = "1"
        sessionStorage.azienda_p_iva = "12345687901"
        sessionStorage.azienda_indirizzo = "Via Sardegna, 29"
        sessionStorage.azienda_iban = "123123123123123123123123123"
        sessionStorage.azienda_telefono = "+3923334444"
        sessionStorage.azienda_fax = "+063923334444"
        sessionStorage.azienda_email = "info.mail@visioture.com"
        sessionStorage.azienda_pec = "info.pec@visioture.com"
        navigate("/", {replace: true})
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