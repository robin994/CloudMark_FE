import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Pagination from 'react-bootstrap/Pagination'
import { Button, InputGroup, Form, Container } from 'react-bootstrap'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface DataTableProps {
    id: string,
    col: DynamicObject,
    rows: DynamicObject,
    baseSlug?: string,
    setInputField: Function
}
/* In this case can accept any field with a string key and store any value,
this solution is extremely elegant and can include TypeSafe fields */
interface DynamicObject {
    [key: string]: any
}

/* Maps col[] as the Heading of the table, then maps every row in rows[{} */
export default function DataTable(props: DataTableProps) {
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
            <tr onClick = {()=> props.baseSlug ? handleRowClick(`${props.baseSlug}/${element[props.id]}`) : undefined}>
                {Object.keys(props.col).map((item: any)=> <React.Fragment key={`item-${element[props.id]}-${item}`}><td><DataItem item={item}/></td></React.Fragment>)}
            </tr>
        )
    }

    const paginationBLock = (
        <>
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </>
    )

    // This return needs to be cleaned up for readability
    return (
        <>
            <Card className="vh-100">
                <Card.Header>
                    <InputGroup>
                        <Form.Control onChange={(str)=> props.setInputField({ str: str.target.value })}/>
                        <Button variant="outline-secondary" id="button-addon1">
                            Cerca
                        </Button>
                    </InputGroup>
                </Card.Header>
                <Card.Body>
                    <Container className='d-flex justify-content-between align-items-center' fluid >
                        {paginationBLock}
                        <Button variant="primary">
                            + Aggiungi
                        </Button>
                    </Container>
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    {Object.values(props.col).map((element: string)=> <React.Fragment key={`col-${element}`}><th><DataColumn element={element} /></th></React.Fragment>)}
                                </tr>
                            </thead>
                            <tbody>
                                {props.rows.map((element: { [key: string]: any })=> <React.Fragment key={`item-${element[props.id]}`}><DataRow element={element} /></React.Fragment>)}
                            </tbody>
                        </Table>
                </Card.Body>
            </Card>
        </>
  )
}
