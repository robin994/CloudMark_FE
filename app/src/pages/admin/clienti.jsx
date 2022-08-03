import { ListGroup } from "react-bootstrap"
import { useNavigate, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'
import { DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogTitle, DialogActions, 
         DialogContent, DialogContentText, TextField } from "@mui/material"        
import Spacer from "../../components/Spacer";

let newCustomer = {}

export default function Clienti() {

    const navigate = useNavigate()
    const [refresh, pressRefresh] = useState(false)
    const [customers, setCustomers] = useState({})
    const [id_customer, setId_customer] = useState("")
    const [openAddCustomer, setOpenAddCustomer] = useState(false)
    useEffect( () => {
      getDipendenti()
    }, [refresh])
    useEffect(() => {
      navigate(`/clienti/${id_customer}`)
    }, [id_customer])
    const handleEdit = id_customer => {
        setId_customer(id_customer)
    }
    const handleDelete = id_customer => {
        axios.post(`${process.env.REACT_APP_FASTAPI_URL}/customer/delete/`, null, {
            headers: {accept: "application/json"},
            params: {id_customer: id_customer}
        }).then(() => {
          pressRefresh(!refresh)
        }).catch(err => {
            console.log("errore ", err)
        })
    }
    const handleAddCustomer = () => setOpenAddCustomer(true)
    const handleClose = () => {
        setOpenAddCustomer(false)
        getDipendenti()
    }
    console.log("id_customer = ", id_customer)
    const columns = [
        { field: 'name', headerName: 'Nome', width: 150 },
        { field: 'actions', type: "actions", getActions: customer_row => [
            <GridActionsCellItem icon={<EditIcon />} label="Info"
            onClick={() => handleEdit(customer_row.id)}
            />,
            <GridActionsCellItem icon={<DeleteIcon />} label="Delete"
            onClick={() => handleDelete(customer_row.id)}
            />
        ]}
    ];
    let rowsArr = []
    for (const [id_customer, detailsObj] of Object.entries(customers)) {
        rowsArr.push({id: id_customer, name: detailsObj.name})
    }
    const rows = rowsArr
    async function getDipendenti() {
        try {
          const response = await axios.get(`${process.env.REACT_APP_FASTAPI_URL}/customer`);
          setCustomers(response.data.data)
        } catch (error) {
          console.log(error)
        }
      }
    return (
      <>
        <AddCustomerDialog onClose={handleClose} open={openAddCustomer}/>
        <Spacer margin="1rem" />
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddCustomer}>
            ADD CUSTOMER
        </Button>
        <ListGroup horizontal="md" >
            <ListGroup.Item>
              
                <div style={{ display: 'flex', height: "100%" }}>
                    <DataGrid autoHeight rows={rows} columns={columns}/>
                </div>
            </ListGroup.Item>
            <ListGroup.Item>
                <Outlet context={getDipendenti}/>
            </ListGroup.Item>
        </ListGroup>
        <Spacer margin="1rem" />
      </>
    )
}

function AddCustomerDialog(props) {
  const { onClose, open } = props
  const [missing, setMissing] = useState(false)

  const handleClose = () => {
    onClose()
    setMissing(false)
  }
  const handleChange = (e) => {
    const {id, value} = e.target
    console.log(id, value)
    newCustomer[id] = value
  }
  const handleAdd = () => {
      axios.post(`${process.env.REACT_APP_FASTAPI_URL}/customer/create/`, newCustomer, {
          headers: {accept: "application/json", "Content-Type": "application/json"}
      }).then(resp => {
          onClose()
      }).catch(err => {
          console.log("errore", err)
      })
  }

  const inputsAttrs = [
    {type: "text", id: "name", label: "Name"},
    {type: "text", id: "p_iva", label: "IVA"},
    {type: "text", id: "address", label: "Address"},
    {type: "text", id: "cap", label: "CAP"},
    {type: "text", id: "iban", label: "IBAN"},
    {type: "email", id: "email", label: "Email Address"},
    {type: "email", id: "pec", label: "PEC Address"},
    {type: "text", id: "fax", label: "FAX"},
    {type: "text", id: "phone", label: "Phone"}
  ]
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a customer and its detail here (every field is mandatory)
          </DialogContentText>
          {inputsAttrs.map(attrs => <TextField {...attrs} autoFocus margin="dense"
                                          fullWidth variant="standard" required
                                          onChange={e => handleChange(e)}
                                      />
          )}
          {missing && <h5 className="text-danger">Missing credentials, can't process this form</h5>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}>Confirm</Button>
        </DialogActions>
    </Dialog>
  );
}