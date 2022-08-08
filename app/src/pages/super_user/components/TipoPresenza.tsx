import * as React from 'react';
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColumns,
  GridRowsProp,
} from "@mui/x-data-grid";
import axios from "axios";

const initialRows: GridRowsProp = [];

const TipoPresenza = () => {

    const [pageSize, setPageSize] = React.useState<number>(14);
    const [rows, setRows] = React.useState(initialRows);

    async function getTypePresences() {
        axios
        .get(
            `${process.env.REACT_APP_FASTAPI_URL}/type/presence`).then((res) => {
                let arr: any = [];
                let id = 1
                Object.values(res.data.data).forEach((el: any) => {
                    arr.push({
                        id: id, 
                        name: el.name, 
                        percentage_increase: el.percentage_increase,
                        hourly_pay: el.hourly_pay === null ? "Non presente" : el.hourly_pay,
                        id_presence_type: el.id_presence_type
                    });
                    id += 1
                });
                setRows(arr)
        });
    }


    React.useEffect(() => {
        getTypePresences();
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
            field: "percentage_increase",
            headerName: "Percentuale maggiorazione",
            width: 350,
            editable: false,
            hide: false,
        },
        {
            field: "hourly_pay",
            headerName: "Paga oraria",
            width: 350,
            editable: false,
            hide: false,
        },
        {
            field: "id_presence_type",
            headerName: "id tipo presenza",
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

export default TipoPresenza