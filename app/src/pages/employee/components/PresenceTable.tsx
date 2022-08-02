import axios from 'axios'
import { useState, useEffect } from 'react'
import { 
    DataGrid, 
    GridActionsCellItem, 
    GridColDef, 
    GridColumns, 
    GridRowId, 
    GridRowModes, 
    GridRowModesModel, 
    GridRowParams, 
    GridRowsProp, 
    GridToolbarColumnsButton, 
    GridToolbarContainer, 
    GridToolbarDensitySelector, 
    GridToolbarExport, 
    GridToolbarFilterButton, 
    MuiEvent
} from '@mui/x-data-grid';
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { motion } from 'framer-motion';

import "../styles/PresenceTable.css";
import { randomId } from '@mui/x-data-grid-generator';
import { Button } from '@mui/material';


const types: { [key: string]: string } = {
    'ca34d37e-600c-452e-a8e4-2efb53161812': 'Standard',
    '6dc55260-7150-4f76-8251-adc4c3fc15b4': 'Assenza',
    'a8fd713d-36e8-440f-81e1-6e7314a3c417': 'Festivo',
    'b867b283-38a0-4eb3-8df1-55ccb5f310df': 'Malattia'
}

const PresenceTable = (props:any)=> {
    const initialState: GridRowsProp = [];
    const [presenze, setPresenze] = useState([]);
    const [open, setOpen] = useState<any>(false);
    const [IDRowToDelete, setIDRowToDelete] = useState<GridRowId>();
    const [rowsBuffer, setRowsBuffer] = useState<GridRowsProp>([]);
    const [rowsMode, setRowsMode] = useState<GridRowModesModel>({});

    const heading: GridColumns = [
        {   field: 'date_presence',
            headerName: 'Data',
            type: 'date',
            width: 279,
            editable: true,
            align: 'right',
            headerAlign: 'right'
        },
        {   field: 'hours',
            headerName: 'Ore',
            type: 'number',
            width: 279,
            editable: true,
            align: 'right',
            headerAlign: 'right'
        },
        {   field: 'type',
            headerName: 'Tipo Presenza',
            type: 'string',
            width: 279,
            editable: true,
            align: 'right',
            headerAlign: 'right'
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
              const isInEditMode = rowsMode[id]?.mode === GridRowModes.Edit;
              if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    onClick={handleSaveClick(id)}
                  />,
                  <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                  />,
                ];
              }
      
              return [
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
                />,
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={() => handleOpen(id)}
                  color="inherit"
                />,
              ];
            },
          }
    ]

    async function getPresenze() {
        try {
        const response = await axios.post(`${process.env.REACT_APP_FASTAPI_URL}/presence/load`,{
            id_employee: sessionStorage.id_employee,
            year: props.year,
            month: props.month
        }, 
        { 
            headers: {accept: "application/json", "Content-Type": "application/json" }
        })
        console.log('PresenceTable --> AXIOS RESPONSE [data]: ', response.data.data)
        setPresenze(response.data.data.map((e: any)=> {
                e['id'] = e['id_presence']
                e['type'] = types[e['id_tipoPresenza']]
                console.log('PresenceTable --> PARSED RESPONSE: ', [e])
                return e
            }
        ))} catch(error) {
            throw error
        }
    }

    useEffect(()=> {
        getPresenze();
      }, [])

    // Handlers ----------------------------------------------------------------------------|
    const handleAdd =() => {
        const id = randomId();
        setRowsBuffer((rowsBuffer) => [...rowsBuffer, { id, name: "", age: "", isNew: true }]);
        setRowsMode((rowsMode) => ({
            ...rowsMode,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "hours" },
        }));
    };

    const handleRowEditStart = (
        params: GridRowParams,
        event: MuiEvent<React.SyntheticEvent>) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop =()=> {

    }

    const handlePushChanges =()=> {

    }

    const handleEditClick = (id: GridRowId) => () => {
        setRowsMode({ ...rowsMode, [id]: { mode: GridRowModes.Edit } });
    };
    
    const handleSaveClick = (id: GridRowId) => () => {
        setRowsMode({ ...rowsMode, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowsMode({
          ...rowsMode,
          [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    
        const editedRow = rowsBuffer.find((row) => row.id === id);
        if (editedRow!.isNew) {
          setRowsBuffer(rowsBuffer.filter((row) => row.id !== id));
        }
    };

    const handleOpen = (id: GridRowId) => {
        setOpen(true);
        setIDRowToDelete(id);
    };
    

    const CustomToolbar = ()=> {
        return(
            <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <Button color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
                AGGIUNGI
            </Button>
            </GridToolbarContainer>
        );
    }

    return (
        <motion.div 
            initial={{x : 100}}
            animate={{x : 0}}
            className='custom-grid'
            style={{ height: 400, width: '100%' }}>
            <DataGrid
                // components={{
                //     LoadingOverlay: LinearProgress
                // }}
                // loading
                rows={rowsBuffer}
                columns={heading}
                pageSize={5}
                editMode='row'
                rowModesModel={rowsMode}
                onRowEditStart={handleRowEditStart}
                rowsPerPageOptions={[20]}
                checkboxSelection
                components={{
                    Toolbar: CustomToolbar
                }}
    /*             editable={{
                    onRowAdd: (),
                    onRowEdit: (),
                    onRowDelete: ()
                }} */
            />
  </motion.div>
   )
}

export default PresenceTable