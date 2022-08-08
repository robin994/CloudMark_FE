import * as React from 'react';
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColumns,
  GridRowsProp,
} from "@mui/x-data-grid";
import axios from "axios";

const initialRows: GridRowsProp = [];

const TipoContratto = () => {

    const [pageSize, setPageSize] = React.useState<number>(14);
    const [rows, setRows] = React.useState(initialRows);

    async function getTypeContracts() {
        axios
        .get(
            `${process.env.REACT_APP_FASTAPI_URL}/type/contract`).then((res) => {
                let arr: any = [];
                let id = 1
                Object.values(res.data.data).forEach((el: any) => {
                    arr.push({
                        id: id, 
                        name: el.name, 
                        info: el.info === null ? "Non vi sono presenti informazioni al momento" : el.info,
                        id_contract_type: el.id_contract_type
                    });
                    id += 1
                });
                setRows(arr)
        });
    }


    React.useEffect(() => {
        getTypeContracts();
    }, []);

    const columns: GridColumns = [
        {
            field: "name",
            headerName: "Nome",
            width: 350,
            editable: false,
            hide: false,
        },
        {
            field: "info",
            headerName: "Info",
            width: 350,
            editable: false,
            hide: false,
        },
        {
            field: "id_contract_type",
            headerName: "id tipo contratto",
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

export default TipoContratto