import * as React from 'react';
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColumns,
  GridRowsProp,
} from "@mui/x-data-grid";
import axios from "axios";

const initialRows: GridRowsProp = [];

const TipoAccount = () => {

    const [pageSize, setPageSize] = React.useState<number>(14);
    const [rows, setRows] = React.useState(initialRows);

    async function getTypeAccounts() {
        axios
        .get(
            `${process.env.REACT_APP_FASTAPI_URL}/type/account`).then((res) => {
                let arr: any = [];
                let id = 1
                Object.values(res.data.data).forEach((el: any) => {
                    arr.push({
                        id: id, 
                        accountTypeName: el.accountTypeName, 
                        function: el.function,
                        id_account_type: el.id_account_type
                    });
                    id += 1
                });
                setRows(arr)
        });
    }


    React.useEffect(() => {
      getTypeAccounts();
    }, []);

    const columns: GridColumns = [
        {
            field: "accountTypeName",
            headerName: "Nome Tipo Account",
            width: 350,
            editable: false,
            hide: false,
        },
        {
            field: "function",
            headerName: "Funzione",
            width: 350,
            editable: false,
            hide: false,
        },
        {
            field: "id_account_type",
            headerName: "id tipo account",
            width: 350,
            editable: false,
            hide: false,
        }
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
        />
    </Box>
  );
}

export default TipoAccount