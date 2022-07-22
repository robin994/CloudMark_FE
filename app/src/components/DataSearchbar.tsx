import { InputGroup, Form, Button } from 'react-bootstrap'

interface DataSearchbarProps {
    setInputField: Function
}

export default function DataSearchbar(props: DataSearchbarProps) {
  return (
    <InputGroup>
        <Form.Control onChange={(str)=> props.setInputField({ str: str.target.value })}/>
            <Button variant="outline-secondary" id="button-addon1">
                Cerca
            </Button>
    </InputGroup>
  )
}
