import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Pagination from 'react-bootstrap/Pagination'

/* DOESN'T CURRENTLY SUPPORT NESTED OBJECTS */

interface DataTableProps {
    id: string,
    col: string[],
    rows: DynamicObject
}

/* In this case can accept any field with a string key and store any value,
this solution is extremely elegant and can include TypeSafe fields */
interface DynamicObject {
    [key: string]: any
}

/* Using maps i populate first all the columns, and then start filling in each row,
mapping each {} in rows[] to its own row, and subsequently filling in each field */
export default function DataTable(props: DataTableProps) {

    // Returns a table column populated with the column name from col[]
    const Column = ({element}: {element: string})=> <th>{element}</th>
    // Returns a row corrisponding to the element being mapped
    const Row = ({element}: {element: DynamicObject})=> {
        // This maps the col[] and returns all the row populated fields
        return(
            <tr>
                {props.col.map((column: string)=> <td id={element['id']}>{element[`${column}`]}</td>)}
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

    return (
        <>
            <Card>
                <Card.Body>
                    {paginationBLock}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {props.col.map((element)=> <Column element={element} />)}
                            </tr>
                        </thead>
                        <tbody>
                            {props.rows.map((element: object)=> <Row element={element} />)}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
  )
}
