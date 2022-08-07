import * as React from 'react';
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColumns,
  GridRowsProp,
} from "@mui/x-data-grid";
import axios from "axios";

const initialRows: GridRowsProp = [];

const Azienda = () => {

    const [pageSize, setPageSize] = React.useState<number>(14);
    const [rows, setRows] = React.useState(initialRows);

    async function getAziende() {
        axios
        .get(
            `${process.env.REACT_APP_FASTAPI_URL}/business`).then((res) => {
                let arr: any = [];
                let id = 1
                Object.values(res.data.data).forEach((el: any) => {
                    arr.push({
                        id: id, 
                        id_business: el.id_business, 
                        name: el.name,
                        p_iva: el.p_iva,
                        address: el.address,
                        cap: el.cap,
                        iban: el.iban,
                        phone: el.phone,
                        email: el.email,
                        pec: el.pec,
                        fax: el.fax
                    });
                    id += 1
                });
                setRows(arr)
        });
    }


    React.useEffect(() => {
        getAziende();
      }, []);

    const columns: GridColumns = [
        {
            field: "id_business",
            headerName: "id azienda",
            width: 210,
            editable: false,
            hide: true,
        },
        {
            field: "name",
            headerName: "nome azienda",
            width: 210,
            editable: false,
            hide: false,
        },
        {
            field: "p_iva",
            headerName: "partita iva",
            width: 210,
            editable: false,
            hide: false,
        },
        {
            field: "address",
            headerName: "indirizzo",
            width: 210,
            editable: false,
            hide: false,
        },
        {
            field: "cap",
            headerName: "cap",
            width: 210,
            editable: false,
            hide: false,
        },
        {
            field: "iban",
            headerName: "iban",
            width: 210,
            editable: false,
            hide: false,
        },
        {
            field: "phone",
            headerName: "numero di telefono",
            width: 210,
            editable: false,
            hide: false,
        },
        {
            field: "email",
            headerName: "email",
            width: 210,
            editable: false,
            hide: false,
        },
        {
            field: "pec",
            headerName: "pec",
            width: 210,
            editable: false,
            hide: false,
        },
        {
            field: "fax",
            headerName: "fax",
            width: 210,
            editable: false,
            hide: false,
        },
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

export default Azienda