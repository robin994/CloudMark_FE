import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Card, Form, Table, Dropdown } from 'react-bootstrap'

import './css_components/PresenceTable.css';

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
    position: '#',
    date_presence: "Data",
    hours: "Ore",
    type: "Tipo Presenza",
    id_presence: "ID presenza"
}

const types: any = {
    'ca34d37e-600c-452e-a8e4-2efb53161812': 'Standard',
    '6dc55260-7150-4f76-8251-adc4c3fc15b4': 'Assenza',
    'a8fd713d-36e8-440f-81e1-6e7314a3c417': 'Festivo',
    'b867b283-38a0-4eb3-8df1-55ccb5f310df': 'Malattia'
}

export default function EditableTable(props: DataTableProps) {
    const [rows, setRows] =  useState(props.rows);
    const [presenceChecked, setPresenceChecked] = useState([]);

    const DataColumn = ({element}: {element: string})=> {
        return element === heading['id_presence'] && !props.showID ? <></> : <>{element}</>
    }
    const DataRow = ({element, index}: any)=> {
        const isChecked = (id: string) => id === element['id_tipoPresenza'] ? true : false;
        console.log(`ROWID  item-${element[props.id]}`);

        return(
            <React.Fragment key={`item-${element[props.id]}-row`}>
                <td>
                    {index}
                </td>
                <td>
                    <Form.Group>
                        <Form.Control
                            type="date" value={element.date_presence} onChange={()=> false} />
                    </Form.Group>
                </td>
                <td>
                    <Form.Group>
                        <Form.Control type="number" value={element.hours} onChange={()=> false} />
                    </Form.Group>
                </td>
                <td>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {types[element['id_tipoPresenza']]}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {Object.values(types).map((element: any)=> {
                            return(
                                <Dropdown.Item href="#/action-1">{element}</Dropdown.Item>
                            )
                        } )}
                    </Dropdown.Menu>
                </Dropdown>
                </td>
                {props.showID && <td>{element[`${'id_presence'}`]}</td>}
            </React.Fragment>
        )
    }

    // This return needs to be cleaned up for readability
    return (
        <>
            <Card>
                <Card.Body>
                        <Table striped bordered hover responsive className="vh-100">
                            <thead>
                                <tr>
                                    {Object.values(heading).map((element: string)=> {
                                                return(
                                                    <React.Fragment key={`col-${element}`}>
                                                        <th>
                                                            <DataColumn element={element} />
                                                        </th>
                                                    </React.Fragment>
                                                )
                                            }
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {props.rows.map((element: any, key: number)=> {
                                    console.log(key)
                                    return(
                                        <>
                                            <React.Fragment key={`item-${element[props.id]}`}>
                                                    <tr className='dataRow'>
                                                        <DataRow element={element} index={key} />
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
