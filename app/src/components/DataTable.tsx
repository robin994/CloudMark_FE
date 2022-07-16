import Table from 'react-bootstrap/Table'

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

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        {props.col.map((element)=> <Column element={element} />)}
                    </tr>
                </thead>
                <tbody>
                    {props.rows.map((element: object)=> <Row element={element} />)}
                </tbody>
            </Table>
        </>
  )
}
