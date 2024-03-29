import { ListGroup } from "react-bootstrap"
import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button, Dialog, DialogTitle, DialogActions,
  DialogContent, DialogContentText, TextField, Divider, Tooltip
} from "@mui/material"
import Spacer from "../../components/Spacer";

let newCustomer = { id_business: sessionStorage.getItem("business_id") }

export default function Clienti() {
  const id_business = sessionStorage.getItem("business_id")
  const navigate = useNavigate()
  const [refresh, pressRefresh] = useState(false)
  const [customers, setCustomers] = useState({})
  const [id_customer, setId_customer] = useState("")
  const [openAddCustomer, setOpenAddCustomer] = useState(false)
  useEffect(() => {
    getClienti()

  }, [refresh])

  const handleEdit = id_customer => {
    setId_customer(id_customer)
    navigate(`/clienti/${id_customer}`)
  }
  const handleDelete = id_customer => {
    axios.post(`${process.env.REACT_APP_FASTAPI_URL}/customer/delete/`, null, {
      headers: { accept: "application/json" },
      params: { id_customer: id_customer , id_business : sessionStorage.getItem("business_id")}
    }).then(() => {
      pressRefresh(!refresh)
    }).catch(err => {
      console.log("errore ", err)
    })
  }
  const handleAddCustomer = () => {
    setOpenAddCustomer(true)
  }
  const handleClose = () => {
    setOpenAddCustomer(false)
    getClienti()
  }
  const columns = [
    {
      field: 'name',
      renderHeader() {
        return (
          <strong className=""> Nome </strong>
        )
      },
      flex: 1,
    },
    {
      field: 'actions',
      renderHeader() {
        return (
          <strong className=""> Actions </strong>
        )
      },
      type: "actions",
      flex: 1,
      getActions: customer_row => [
        <Tooltip title = "Visualizza dettagli Cliente">
        <GridActionsCellItem icon={<VisibilityIcon />} label="Info"
          onClick={() => handleEdit(customer_row.id)}
        />
        </Tooltip>,
        <Tooltip title = "Cancella Cliente">
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete"
          onClick={() => handleDelete(customer_row.id)}
        />
        </Tooltip>
      ]
    }
  ];
  let rowsArr = []
  for (const [id_customer, detailsObj] of Object.entries(customers)) {
    rowsArr.push({ id: id_customer, name: detailsObj.name })
  }
  const rows = rowsArr
  async function getClienti() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_FASTAPI_URL}/customer/business/${id_business}`);
      setCustomers(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <AddCustomerDialog onClose={handleClose} open={openAddCustomer} />

      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddCustomer}>
        ADD CUSTOMER
      </Button>
      <ListGroup horizontal style={{ height: '90vh' }} >
        <Divider style={{display:'flex', width:''}}>
          <div className="m-auto" style={{ display: 'flex', height: '90vh' }}>
            <DataGrid style={{ borderRadius: '.5rem' }} disableSelectionOnClick={true} rows={rows} columns={columns} />
          </div>
        </Divider>
        <Outlet context={getClienti} />
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
    const { id, value } = e.target
    console.log(id, value)
    newCustomer[id] = value
  }
  const handleAdd = () => {
    axios.post(`${process.env.REACT_APP_FASTAPI_URL}/customer/create/`, newCustomer, {
      headers: { accept: "application/json", "Content-Type": "application/json" }
    }).then(resp => {
      onClose()
    }).catch(err => {
      console.log("errore", err)
    })
  }

  const inputsAttrs = [
    { type: "text", id: "name", label: "Name" },
    { type: "text", id: "p_iva", label: "IVA" },
    { type: "text", id: "address", label: "Address" },
    { type: "text", id: "cap", label: "CAP" },
    { type: "text", id: "iban", label: "IBAN" },
    { type: "email", id: "email", label: "Email Address" },
    { type: "email", id: "pec", label: "PEC Address" },
    { type: "text", id: "fax", label: "FAX" },
    { type: "text", id: "phone", label: "Phone" }
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