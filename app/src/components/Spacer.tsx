import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface SpacerProps {
  margin: string;
}

export default function Spacer(props: SpacerProps) {
  const divStyle = {
    margintop: props.margin,
    marginBottom: props.margin
  }

  return (
    <>
      <div style={divStyle}>
        <Container fluid />
      </div>
    </>
  )
}
