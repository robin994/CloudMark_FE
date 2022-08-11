import * as React from "react";
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
import axios from "axios";
import Axios from 'axios';

const initialRows: GridRowsProp = [];

const Accounts = () => {
    const [pageSize, setPageSize] = React.useState<number>(14);
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    async function getAccounts() {
        axios.get(`${process.env.REACT_APP_FASTAPI_URL}/account`).then((res) => {
            let arr: any = [];
            let id = 1;
            Object.values(res.data.data).forEach((el: any) => {
                arr.push({
                    id: id,
                    id_account: el.id_account,
                    user: el.user,
                    abilitato: el.abilitato,
                    id_tipo_account: el.id_tipo_account,
                });
                id += 1;
            });
            setRows(arr);
        });
    }
    //  === 1 ? "Si" : "No"

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

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        Axios(
            `${process.env.REACT_APP_FASTAPI_URL}/account/update/`,
            {
                method: 'PATCH',
                headers: { 
                    accept: 'application/json',
                },
                params: {
                    session: sessionStorage.bearer
                },
                data: {
                    id_account: updatedRow.id_account,
                    user: updatedRow.user,
                    abilitato: updatedRow.abilitato,
                    id_tipo_account: updatedRow.id_tipo_account
                }
            }
            //  === 'Si' ? 1 : 0
            
        ).catch((err) => {
            console.log(err);
        })

        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

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

    React.useEffect(() => {
        getAccounts();
    }, []);

    const columns: GridColumns = [
        {
            field: "id_account",
            headerName: "id account",
            width: 350,
            editable: false,
            hide: true,
        },
        {
            field: "user",
            headerName: "nome utente",
            width: 350,
            editable: true,
            hide: false,
        },
        {
            field: "abilitato",
            headerName: "abilitato",
            width: 350,
            editable: true,
            hide: false,
        },
        {
            field: "id_tipo_account",
            headerName: "id tipo account",
            width: 350,
            editable: true,
            hide: true,
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
                ];
            },
        },
    ];

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
        </Box>
    );
};

export default Accounts;
