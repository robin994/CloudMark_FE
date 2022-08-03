import axios from "axios";
import { useState, useEffect } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  MuiEvent,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { motion } from "framer-motion";

import "../styles/PresenceTable.css";
import { randomId } from "@mui/x-data-grid-generator";
import { Button } from "@mui/material";

const types: { [key: string]: string } = {
  "ca34d37e-600c-452e-a8e4-2efb53161812": "Standard",
  "6dc55260-7150-4f76-8251-adc4c3fc15b4": "Assenza",
  "a8fd713d-36e8-440f-81e1-6e7314a3c417": "Festivo",
  "b867b283-38a0-4eb3-8df1-55ccb5f310df": "Malattia",
};

const PresenceTable = (props: any) => {
  const [id_account, setIdAccount] = useState(sessionStorage.id_account);
  const [id_employee, setIdEmployee] = useState(sessionStorage.id_employee);
  const [orders, setOrders] = useState([]);
  const [ date, setDate ] = useState({ month: props.month, year: props.year })
  const initialState: GridRowsProp = [];
  const [presenze, setPresenze] = useState([]);
  const [open, setOpen] = useState<any>(false);
  const [IDRowToDelete, setIDRowToDelete] = useState<GridRowId>();
  const [rowsBuffer, setRowsBuffer] = useState<GridRowsProp>([]);
  const [rowsMode, setRowsMode] = useState<GridRowModesModel>({});

  const heading: GridColumns = [
    {
      field: "date_presence",
      headerName: "Data",
      type: "date",
      width: 279,
      editable: true,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "hours",
      headerName: "Ore",
      type: "number",
      width: 279,
      editable: true,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "type",
      headerName: "Tipo Presenza",
      type: "singleSelect",
      width: 279,
      editable: true,
      valueOptions: Object.keys(types).map((element) => {
        return { label: types[element], value: element };
      }),
      valueFormatter: ({ value, field, api }) => {
        const colDef = api.getColumn(field);
        const option = colDef.valueOptions.find((el: any, val: any) => {
          if (el.value === value) return el;
        });
        return option && option.label ? option.label : null;
      },
      align: "right",
      headerAlign: "right",
    },
    {
      field: "order",
      headerName: "Commessa",
      type: "singleSelect",
      width: 279,
      editable: true,
      valueOptions: Object.values(orders).map((element) => {
        return {
          label: element[`id_order`],
          value: element[`id_order`],
        };
      }),
      valueFormatter: ({ value, field, api }) => {
        const colDef = api.getColumn(field);
        const option = colDef.valueOptions.find((el: any, val: any) => {
          if (el.value === value) return el;
        });
        return option && option.label ? option.label : null;
      },
      align: "right",
      headerAlign: "right",
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
    },
  ];

  // Getters ----------------------------------------------------------------------------|
  async function getRows() {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_FASTAPI_URL}/presence/load`,
        {
          id_employee: sessionStorage.id_employee,
          year: props.year,
          month: props.month,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        "PresenceTable ----> AXIOS RESPONSE [data]: ",
        resp.data.data
      );
      setRowsBuffer(
        resp.data.data.map((e: any) => {
          e["id"] = e["id_presence"];
          e["type"] = types[e["id_tipoPresenza"]];
          e["order"] = e["id_order"]
          console.log("PresenceTable ----> PARSED resp: ", [e]);
          return e;
        })
      );
    } catch (error) {
      throw error;
    }
  }

/*   async function getOrders() {
    console.log("ID EMPLOYE IN GETORDERS: ", id_employee);
    console.log(
      `${process.env.REACT_APP_FASTAPI_URL}/orders/employee/${id_employee}`
    );
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_FASTAPI_URL}/orders/employee/${id_employee}`
      );
      console.log("ORDERS FETCHED: ", Object.values(resp.data.data));
      setOrders(Object.values(resp.data.data));
    } catch (err) {
      console.log(err);
    }
  } */

  // Initializing base data on first render
  async function initDataFetch() {
    try {
      console.log("STORED ACCOUNT ID: ", id_account);
      // Fetches id_employee by its id_account
      const resp0 = await axios.get(
        `${process.env.REACT_APP_FASTAPI_URL}/employee/account/${id_account}`
      );
      console.log(
        "FETCHED EMPLOYEE ID: ",
        resp0.data.data.employee.id_employee
      );
      let id_employee = resp0.data.data.employee.id_employee;

      // Once id_employee is fetched, fetch its orders
      const resp1 = await axios.get(
        `${process.env.REACT_APP_FASTAPI_URL}/orders/employee/${id_employee}`
      );
      console.log("FETCHED ORDERS ARRAY: ", Object.values(resp1.data.data));
      setOrders(Object.values(resp1.data.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    initDataFetch();
    getRows();
  }, [props]);

  // Handlers ----------------------------------------------------------------------------|
  const handleAdd = () => {
    const id = randomId();
    setRowsBuffer((rowsBuffer) => [
      ...rowsBuffer,
      { id, date_presence: "", hours: "", type: "", order: orders[0], isNew: true },
    ]);
    handleEditClick(id);
    setRowsMode((rowsMode) => ({
      ...rowsMode,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "hours" },
    }));
  };

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = () => {};

  const handlePushChanges = () => {};

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

  // TODO: Adapt editing request, ternary operator?
  const processRowUpdate = (newRow: GridRowModel) => {
    console.log([newRow]);
    newRow.isNew && createPresence(newRow);
    const updatedRow = { ...newRow, isNew: false };
	editPresence(updatedRow);
  };

  async function createPresence(newRow: GridRowModel) {
    console.log("ATTEMPTING TO CREATE NEW PRESENCE...", [newRow]);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_FASTAPI_URL}/presence/create`,
        {
          id_employee: id_employee,
          date_presence: `${newRow.date_presence.getFullYear()}-${newRow.date_presence.getMonth()+1}-${newRow.date_presence.getDate()}`,
          id_tipoPresenza: newRow.type,
          id_order: newRow.order,
          hours: newRow.hours,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      console.log("CREATION REQUEST SUCCESSFUL: ---->", res);
      getRows();
    } catch (err) {
      console.log(err);
    }
  }

  async function editPresence(updatedRow: GridRowModel) {
    console.log("ATTEMPTING TO UPDATE PRESENCE...", [updatedRow]);
    try {
      	const res = await axios.post(
			`${process.env.REACT_APP_FASTAPI_URL}/presence/update`,
        {
          id_employee: id_employee,
          date_presence: `${updatedRow.date_presence.getFullYear()}-${updatedRow.date_presence.getMonth()+1}-${updatedRow.date_presence.getDate()}`,
          id_tipoPresenza: updatedRow.type,
          id_order: updatedRow.order,
          hours: updatedRow.hours,
          id_presence: updatedRow.id,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      console.log("UPDATE REQUEST SUCCESSFUL: ---->", res);
      getRows();
    } catch (err) {
      console.log(err);
    }
  }

  const CustomToolbar = () => {
    return (
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
  };

  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      className="custom-grid"
      style={{ height: "80vh", width: "100%" }}
    >
      <DataGrid
        autoHeight
        // components={{
        //     LoadingOverlay: LinearProgress
        // }}
        // loading
        rows={rowsBuffer}
        columns={heading}
        pageSize={20}
        editMode="row"
        rowModesModel={rowsMode}
        onRowEditStart={handleRowEditStart}
        processRowUpdate={processRowUpdate}
		onProcessRowUpdateError={console.log}
        rowsPerPageOptions={[20]}
        checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
        experimentalFeatures={{ newEditingApi: true }}
        /*             editable={{
                    onRowAdd: (),
                    onRowEdit: (),
                    onRowDelete: ()
                }} */
      />
    </motion.div>
  );
};

export default PresenceTable;
