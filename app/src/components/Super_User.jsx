import React,{useState} from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';








const SuperUser = ({placeholder,data}) => {
  

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const Filter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
          return value.azienda.toLowerCase().includes(searchWord.toLowerCase());
        });
    
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          setFilteredData(newFilter);
        }
      };

 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
    <>



<div className="search">
<p className="hello">Ciao</p>
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={Filter}
        />
      
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              
                <p className="azienda_p">{value.azienda} </p>
              
            );
          })}
        </div>
      )}
    </div>







    <div className="mybox">
  
       
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