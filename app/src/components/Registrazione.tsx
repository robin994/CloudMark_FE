import React from "react"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Spacer from "./Spacer"



function Registrazione() {
    const submit = () => {
        let email = document.getElementById("emailRegistrazione") as HTMLInputElement
        let psw = document.getElementById("pswRegistrazione") as HTMLInputElement
    }

    return (

        <>
            <Spacer margin="20px" />
            <Container>
                <Card style={{ width: '24rem' }} className="mx-auto">
                    <Card.Header className="text-center">
                        <h1>Registrati</h1>
                    </Card.Header>
                    <Card.Body>

                        <form action="">

                            <div>
                                <input type="text" name="nome" placeholder="Nome" className="form-control my-3" />
                            </div>

                            <div>
                                <input type="text" name="cognome" placeholder="Cognome" className="form-control my-3" />
                            </div>

                            <div>
                                <input type="text" name="codice fiscale" placeholder="Codice Fiscale" className="form-control my-3" />
                            </div>

                            <div>
                                <input type="text" name="iban" placeholder="Iban" className="form-control my-3" />
                            </div>

                            <div>
                                <input type="email" name="email" placeholder="Email" id="emailRegistrazione" className="form-control my-3" />
                            </div>

                            <div>
                                <input type="tel" name="telefono" placeholder="Telefono" className="form-control my-3" />
                            </div>
                            <div>
                                <input type="text" name="indirizzo" placeholder="Indirizzo" className="form-control my-3" />
                            </div>
                            <div>
                                <input type="password" placeholder="Password" id="pswRegistrazione" className="form-control my-3" />
                            </div>

                            <button type="submit" className="btn btn-outline-primary" onClick={() => submit()}>registrati</button>

                        </form>
                    </Card.Body>
                </Card>
            </Container>
        </>


    )

}



export default Registrazione;
