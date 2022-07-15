import React from "react"



function Registrazione() {



    return (

        <>

            <h1>Registrati</h1>
            <form action="">

                <div>
                    <input type="text" name="nome" placeholder="digita nome" className="form-control Dim" />
                </div>

                <div>
                    <input type="text" name="cognome" placeholder="digita cognome" className="form-control Dim" />
                </div>

                <div>
                    <input type="text" name="codice fiscale" placeholder="digita codice fiscale" className="form-control Dim" />
                </div>

                <div>
                    <input type="text" name="iban" placeholder="digita iban" className="form-control Dim" />
                </div>

                <div>
                    <input type="email" name="email" placeholder="digita email" id="emailRegistrazione" className="form-control Dim" />
                </div>

                <div>
                    <input type="text" name="telefono" placeholder="digita telefono" className="form-control Dim" />
                </div>
                <div>
                    <input type="text" name="indirizzo" placeholder="digita indirizzo" className="form-control Dim" />
                </div>
                <div>
                    <input type="password" placeholder="digita password" id="pswRegistrazione" className="form-control Dim" />
                </div>

                <button type="submit" className="btn btn-outline-primary">registrati</button>

            </form>


        </>


    )

}



export default Registrazione;