import * as React from 'react';
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColumns,
  GridRowsProp,
} from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

const initialRows: GridRowsProp = [];

const Account = () => {

    const [pageSize, setPageSize] = React.useState<number>(14);
    const [rows, setRows] = React.useState(initialRows);

    async function getAccounts() {
        axios
        .get(
            `${process.env.REACT_APP_FASTAPI_URL}/account`).then((res) => {
                let arr: any = [];
                let id = 1
                Object.values(res.data.data).forEach((el: any) => {
                    arr.push({
                        id: id, 
                        id_account: el.id_account, 
                        user: el.user,
                        password: el.password,
                        abilitato: el.abilitato === 1 ? 'Si' : 'No',
                        id_tipo_account: el.id_tipo_account
                    });
                    id += 1
                });
                setRows(arr)
        });
    }


    React.useEffect(() => {
        getAccounts();
      }, []);

    const columns: GridColumns = [
        {
            field: "id_account",
            headerName: "id account",
            width: 350,
            editable: false,
            hide: false,
        },
        {
            field: "user",
            headerName: "nome utente",
            width: 350,
            editable: false,
            hide: false,
        },
        {
            field: "password",
            headerName: "password",
            width: 350,
            editable: false,
            hide: false,
        },
        {
            field: "abilitato",
            headerName: "abilitato",
            width: 350,
            editable: false,
            hide: false,
        },
        {
            field: "id_tipo_account",
            headerName: "id tipo account",
            width: 350,
            editable: false,
            hide: false,
        },
        // {
        //     field: 'actions',
        //     type: 'actions',
        //     headerName: 'Actions',
        //     width: 100,
        //     cellClassName: 'actions',
        //     getActions: ({ id }) => {
        //       const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      
        //       if (isInEditMode) {
        //         return [
        //           <GridActionsCellItem
        //             icon={<SaveIcon />}
        //             label="Save"
        //             onClick={handleSaveClick(id)}
        //           />,
        //           <GridActionsCellItem
        //             icon={<CancelIcon />}
        //             label="Cancel"
        //             className="textPrimary"
        //             onClick={handleCancelClick(id)}
        //             color="inherit"
        //           />,
        //         ];
        //       }
    ]
       
  return (
    <Box
        sx={{
            height: "89vh",
            width: "100%",
            "& .actions": {
            color: "text.secondary",
            },
            "& .textPrimary": {
            color: "text.primary",
            },
        }}
    >
        <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[14]}
            pagination
            rows={rows}
            columns={columns}
            editMode="row"
        />
    </Box>
  );
}

export default Account