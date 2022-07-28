import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Card, Form, Table } from 'react-bootstrap'

interface DataTableProps {
    id: string,
    rows: Presenza[],
    btnCallback?: Function,
    showID?: boolean
}

interface DynamicObject {
    [ key: string ]: any
}

interface Presenza {
    data: string,
    ore: number
}

const heading = {
    date_presence: "Data",
    hours: "Ore",
    standard: "Standard",
    festivo: "Festivo",
    malattia: "Malattia",
    assenza: "Assenza",
    id_presence: "ID presenza"
}

export default function EditableTable(props: DataTableProps) {
    const [rows, setRows] =  useState(props.rows);
    const [presenceTypes, setPresenceTypes] = useState([]);
    const [presenceChecked, setPresenceChecked] = useState([]);

    async function getPresenceTypes() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_FASTAPI_URL}/type/presence`);
            console.log('TIPI PRESENZE', response.data.data);
            setPresenceTypes(response.data.data);
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(()=> {
        getPresenceTypes();
    }, [])

    const DataColumn = ({element}: {element: string})=> {
        return element === heading['id_presence'] && !props.showID ? <></> : <>{element}</>
    }
    const DataRow = ({element}: {element: DynamicObject})=> {
        const isChecked = (id: string) => id === element['id_tipoPresenza'] ? true : false

        return(
            <>
                <td>
                    <Form.Group>
                        <Form.Control type="date" value={element.date_presence} onChange={()=> false} />
                    </Form.Group>
                </td>
                <td>
                    <Form.Group>
                        <Form.Control type="number" value={element.hours} onChange={()=> false} />
                    </Form.Group>
                </td>
                {presenceTypes.map((element: any, key: number)=> {
                        return(
                            <td>
                                <Form.Group>
                                    <Form.Check
                                        inline
                                        name="group1"
                                        type="radio"
                                        id={`radio-${key}-${element['id_presence_type']}`}
                                        key={`radio-${key}-${element['id_presence_type']}`}
                                        defaultChecked={isChecked(element['id_presence_type'])}
                                    />
                                </Form.Group>
                            </td>
                        )}
                    )
                }
                <td>
                    {props.showID && element[`${'id_presence'}`]}
                </td>
            </>
        )
    }

    // This return needs to be cleaned up for readability
    return (
        <>
            <Card className="vh-100">
                <Card.Body>
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    {Object.values(heading).map((element: string)=> <React.Fragment key={`col-${element}`}><th><DataColumn element={element} /></th></React.Fragment>)}
                                </tr>
                            </thead>
                            <tbody>
                                {props.rows.map((element: { [key: string]: any })=> {
                                    return(
                                        <>
                                            <React.Fragment key={`item-${element[props.id]}`}>
                                                    <tr>
                                                        <DataRow element={element} />
                                                        {props.btnCallback && <td><Button onClick={()=> props.btnCallback?.(element[props.id])} variant="outline-primary">Modifica</Button></td>}
                                                    </tr>
                                            </React.Fragment>
                                        </>
                                    )})
                                }
                            </tbody>
                        </Table>
                </Card.Body>
            </Card>
        </>
  )
}
