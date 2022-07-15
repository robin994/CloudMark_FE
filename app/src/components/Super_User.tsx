import React,{useState} from 'react'
import AziendaData from './DataAzienda.json'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';





const SuperUser = () => {
    const [search,setSearch]= useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
    <>
    <div className="mybox">
    <div className="search">
        <div className="searchInputs">
         <input type="text" className="form-control cerca_azienda"placeholder="Search.."  onChange={event =>{setSearch(event.target.value)}}/>
          
        </div>
        <div className="dataResult">
           
            {AziendaData.filter((val)=> {
                  if(search === ''){
                    return val
                  }
                  else if(val.nome_azienda.includes(search)){
                    return val
                  }
                }).map((val) => {
                  return<div>{val.nome_azienda} </div>
            })}
          
          
        </div>
    </div>
       
        <div>
        <h2 className="modify_azienda">Modifica Azienda</h2>
        <h2 hidden>Super User</h2>
        <form action="">
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
                <Button variant="primary" onClick={handleShow}>
                    Conferma Modifica
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifica Azienda</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Sicuro di modificare l'azienda?
                   
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                            Sì
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
                </p>

                <p>
             
                    
                </p>
                
            </form>


            
        </div>
    </div>
    
    </>
  )
}







export default SuperUser