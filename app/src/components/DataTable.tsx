import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Pagination from 'react-bootstrap/Pagination'
import { Button, InputGroup, Form, Container, Row, Col } from 'react-bootstrap'

/* DOESN'T CURRENTLY SUPPORT NESTED OBJECTS!!,
IT WILL JUST SKIP THEM AND RENDER THE NEXT ONE

Props: (id, col, rows)

    -id : string --> A string that dictates which columns to use as the row ID

    -col: { string : string } --> An object containing { propertyName : columnName }

    -rows: [{}, {}, {},...] --> An array of equal objects, each element being a row
    
*/

interface DataTableProps {
    id: string,
    col: DynamicObject,
    rows: DynamicObject,
    setInputField: Function
}
/* In this case can accept any field with a string key and store any value,
this solution is extremely elegant and can include TypeSafe fields */
interface DynamicObject {
    [key: string]: any
}

/* Using maps i populate first all the columns, and then start filling in each row,
mapping each {} in rows[] to its own row, and subsequently filling in each field */
export default function DataTable(props: DataTableProps) {

    // Returns a table column populated with the column name from col{}
    const DataColumn = ({element}: {element: string})=> <>{element}</>
    // Returns a row corrisponding to the element being mapped
    const DataRow = ({element}: {element: DynamicObject})=> {
        // If the current value is an object skip! (Could be more elegant)
        const DataItem = ({item}: any)=> {
            if(!(typeof item === 'string')) return <></>
            // Otherwise return the populated field
            return (<>{element[`${item}`]}</>)
        }

        // This maps the col{keys} and calls <Item> to populate each column
        return(
        <tr>
            {Object.keys(props.col).map((item: any)=> <td><div key={`item-${element['id']}-${item}`}><DataItem item={item}/></div></td>)}
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
            <Card>
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
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    {Object.values(props.col).map((element: string)=> <th><div key={`col-${element}`}><DataColumn element={element} /></div></th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {props.rows.map((element: { [key: string]: any })=> <DataRow element={element} />)}
                            </tbody>
                        </Table>
                </Card.Body>
            </Card>
        </>
  )
}
