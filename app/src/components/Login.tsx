import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Spacer from "./Spacer"

const Login = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (sessionStorage.auth === "true")
            navigate("/", {replace: true})
    }, [navigate])
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
     <Spacer margin="20vh" />
            <Container>
                <Card style={{ width: '24rem' }} className="mx-auto">
                    <Card.Header className="text-center">
                        <h1>Log In</h1>
                    </Card.Header>
                    <Card.Body>

                      

                    <div className="log-div">
                            
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
                        
                    </Card.Body>
                </Card>
            </Container>
    
        
      

     
        
        
            
    </>
  )
}

export default Login