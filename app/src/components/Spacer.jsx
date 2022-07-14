import React from 'react'
import Container from 'react-bootstrap/Container';

const spacingStyle = {
  'margin-top': '100px',
  'margin-bottom': '100px'
}

export default function Spacer(props) {
  return (
    <>
        <Container fluid style={spacingStyle} {...props} />
    </>
  )
}
