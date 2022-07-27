import React from 'react'
import { Button, Card, Form, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'sassy-datepicker'

interface DataTableProps {
    id: string,
    col: { [ key: string ]: any },
    rows: Presenza[],
    btnCallback?: Function
}
/* In this case can accept any field with a string key and store any value,
this solution is extremely elegant and can include TypeSafe fields */
interface DynamicObject {
    [ key: string ]: any
}

interface Presenza {
    data: string,
    ore: number
}

/* Maps col[] as the Heading of the table, then maps every row in rows[{} */
export default function EditableTable(props: DataTableProps) {
    const navigate = useNavigate();

    async function handleRowClick( slug: string ) {
        navigate(slug);
    }

    // Returns a table column populated with the column name from col{}
    const DataColumn = ({element}: {element: string})=> <>{element}</>
    // Returns a single row corrisponding to the element being mapped
    const DataRow = ({element}: {element: DynamicObject})=> {
        // If the current value is not string skip! (Could be more elegant)
        const DataItem = ({item}: any)=> {
            if(!(typeof item === 'string')) return <></>
            // Otherwise return the populated field
            return (<>{element[`${item}`]}</>)
        }

        return(
            <>
                <td>
                    <Form.Group>
                        <DatePicker />
                    </Form.Group>
                </td>
                {Object.keys(props.col).map((item: any)=> <React.Fragment key={`item-${element[props.id]}-${item}`}><td><DataItem item={item}/></td></React.Fragment>)}
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
                                    {Object.values(props.col).map((element: string)=> <React.Fragment key={`col-${element}`}><th><DataColumn element={element} /></th></React.Fragment>)}
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
