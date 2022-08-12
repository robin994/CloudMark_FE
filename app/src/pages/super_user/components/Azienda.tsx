import * as React from 'react';
import Box from "@mui/material/Box";
import {
    DataGrid,
    GridActionsCellItem,
    GridColumns,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowParams,
    GridRowsProp,
    MuiEvent,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Button, Fade, Typography } from "@mui/material";
import axios from "axios";
import Axios from 'axios';

const initialRows: GridRowsProp = [];

const Azienda = () => {

    const [pageSize, setPageSize] = React.useState<number>(14);
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

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

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        Axios(
            `${process.env.REACT_APP_FASTAPI_URL}/business/update/`,
            {
                method: 'POST',
                headers: { 
                    accept: 'application/json',
                },
                data: {
                    name: updatedRow.name,
                    p_iva: updatedRow.p_iva,
                    address: updatedRow.address,
                    cap: updatedRow.cap,
                    iban: updatedRow.iban,
                    phone: updatedRow.phone,
                    email: updatedRow.email,
                    pec: updatedRow.pec,
                    fax: updatedRow.fax,
                    id_business: updatedRow.id_business
                }
            }
            
        ).catch((err) => {
            console.log(err);
        })

        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleDeleteClick = () => () => {
        let id: GridRowId = "";
        let id_business = "";
        if (IDRowToDelete !== undefined) {
            id = IDRowToDelete;
            for (let row of rows) {
                if (row["id"] === id) {
                    id_business = row["id_business"];
                }
            }
            axios
            .request({
                url: `${process.env.REACT_APP_FASTAPI_URL}/business/delete/`,
                method: "post",
                params: {
                    id_business: id_business,
                },
            }).then(() => {
                setRows(rows.filter((row) => row.id !== id));
                setOpen(false);
            });
        }
    };

    const handleRowEditStart = (
        params: GridRowParams,
        event: MuiEvent<React.SyntheticEvent>
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (
        params,
        event
    ) => {
        event.defaultMuiPrevented = true;
    };


    React.useEffect(() => {
        getAziende();
    }, []);

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const columns: GridColumns = [
        {
            field: "id_business",
            headerName: "id azienda",
            width: 200,
            editable: true,
            hide: true,
        },
        {
            field: "name",
            headerName: "nome azienda",
            width: 200,
            editable: true,
            hide: false,
        },
        {
            field: "p_iva",
            headerName: "partita iva",
            width: 200,
            editable: true,
            hide: false,
        },
        {
            field: "address",
            headerName: "indirizzo",
            width: 200,
            editable: true,
            hide: false,
        },
        {
            field: "cap",
            headerName: "cap",
            width: 200,
            editable: true,
            hide: false,
        },
        {
            field: "iban",
            headerName: "iban",
            width: 200,
            editable: true,
            hide: false,
        },
        {
            field: "phone",
            headerName: "numero di telefono",
            width: 200,
            editable: true,
            hide: false,
        },
        {
            field: "email",
            headerName: "email",
            width: 200,
            editable: true,
            hide: false,
        },
        {
            field: "pec",
            headerName: "pec",
            width: 200,
            editable: true,
            hide: false,
        },
        {
            field: "fax",
            headerName: "fax",
            width: 200,
            editable: true,
            hide: false,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

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
    ]

    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "10px",
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState<any>(false);
    const [IDRowToDelete, setIDRowToDelete] = React.useState<GridRowId>();
    const handleOpen = (id: GridRowId) => {
        setOpen(true);
        setIDRowToDelete(id);
    };
       
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
            rowModesModel={rowModesModel}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            experimentalFeatures={{ newEditingApi: true }}
        />
        {open && (
            <div>
                <Fade in={open}>
                    <Box sx={style}>
                    <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Vuoi cancellarlo?
                    </Typography>
                    <div style={{ display: "flex" }}>
                        <Button
                        onClick={handleDeleteClick()}
                        style={{ margin: "10px", height: "40px", width: "90px" }}
                        variant="outlined"
                        >
                        SI
                        </Button>
                        <Button
                        onClick={() => setOpen(false)}
                        style={{ margin: "10px", height: "40px", width: "90px" }}
                        variant="outlined"
                        >
                        NO
                        </Button>
                    </div>
                    </Box>
                </Fade>
            </div>
        )}
    </Box>
  );
}

export default Azienda