import React from 'react'





const SuperUser = () => {
    
   

  return (
    <>
        
        <div>
        <h2 className="modify_azienda">Modifica Azienda</h2>
        <h2 hidden>Super User</h2>
            <form action="">

                <p>
                <input type="text"  placeholder="cerca azienda per nome"  className="form-control"/>
               
                </p>
                <p>
                    
                    <input type="text"  placeholder="id_azienda"  className="form-control"/>
                </p>
                <p>
                  
                    <input type="text"  placeholder="p_iva" className="form-control"/>
                </p>

                <p>
                    
                    <input type="text"  placeholder="iban"  className="form-control"/>
                </p>
                <p>
                  
                    <input type="text"  placeholder="indirizzo" className="form-control"/>
                </p>

                <p>
                    
                    <input type="tel"  placeholder="telefono"  className="form-control"/>
                </p>
                <p>
                  
                    <input type="email"  placeholder="email" className="form-control"/>
                </p>
                <p>
                    
                    <input type="email"  placeholder="pec" className="form-control"/>
                </p>
                <p>
                  
                    <input type="tel" placeholder="fax" className="form-control"/>
                </p>
                <p>
                    <button type="submit" className="btn btn-outline-primary">Conferma Modifica</button>
                </p>
                <p>
                    <button  type="button" className="btn btn-outline-primary">Elimina Azienda</button>
                </p>

                





             
                
            </form>
        </div>
    </>
  )
}







export default SuperUser