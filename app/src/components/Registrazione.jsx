import React from "react"

function Registrazione() {



    return ( 

        <>

            <h1>Registrati</h1>
            <form action="">

                <div>
                    <input type="text" name="nome" placeholder="digita nome" />
                </div>

                <div>
                    <input type="text" cogname="cogname" placeholder="digita cogname" />
                </div>

                <div>
                    <input type="text" codfisc="codice fiscale" placeholder="digita codice fiscale" />
                </div>

                <div>
                    <input type="text" iban="iban" placeholder="digita iban" />
                </div>

                <div>
                    <input type="text" email="email" placeholder="digita email" />
                </div>

                <div>
                    <input type="text" telefono="telefono" placeholder="digita telefono" />
                </div>

                

            </form>


        </>


    )

}

export default Registrazione;