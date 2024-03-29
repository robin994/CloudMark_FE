import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridColumns, GridRowId, GridRowsProp } from '@mui/x-data-grid';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
export default function CommesseByCustomer({ id_customer }) {
    const [commesseCustomer, setCommesseCustomer] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_FASTAPI_URL}/orders/customer/`, {
            id_customer: id_customer,
            id_business: sessionStorage.business_id ? sessionStorage.business_id : "124e4567-e85b-1fd3-a456-426614474000"
            // id_business should only get business_id (REMOVE TERNARY ASAP)
        }, {
            headers: { accept: 'application/json', 'Content-Type': 'application/json' }
        }).then(resp => {
            setCommesseCustomer(resp.data)
        })
    }, [id_customer])

    function openDipendenti(id) {
        navigate(`/commesse/dipendenti/${id}`)
    }

    const columns = [
        {
            field: 'descrizione',
            renderHeader() {
                return (
                    <strong> Descrizione </strong>
                )
            },
            width: 150,
            flex: 0.3
        },
        {
            field: 'data_inizio',
            renderHeader() {
                return (
                    <strong> Data Inizio </strong>
                )
            },
            width: 150,
            flex: 0.3
        },
        {
            field: 'data_fine',
            renderHeader() {
                return (
                    <strong> Data Fine </strong>
                )
            },
            width: 150, flex: 0.3
        },
        {
            field: 'actions',
            renderHeader() {
                return (
                    <strong> Actions </strong>
                )
            },
            type: 'actions',
            width: 75,
            flex: 0.1,
            hide: false,
            editable: false,
            cellClassName: "actions",
            getActions: ({ id }) => {
                return [
                    <Tooltip title="Mostra Dipendenti su questa Commessa">
                        <GridActionsCellItem
                            icon={<PeopleIcon />}
                            label="View"
                            className="textPrimary"
                            onClick={() => openDipendenti(id)}
                            color="inherit"
                        />
                    </Tooltip>,
                ]
            }
        },

    ];
    const rows = []
    for (const obj of commesseCustomer) {
        rows.push({
            id: obj.id_commessa,
            descrizione: obj.descrizione,
            data_inizio: obj.data_inizio,
            data_fine: obj.data_fine
        })
    }
    return (
        <>
            <div style={{ display: 'flex', height: '80vh' }}>
                <DataGrid autoHeight rows={rows} columns={columns} />
            </div>
        </>
    )
}