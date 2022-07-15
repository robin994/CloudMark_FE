const defaultSpacing = {
  'margin-top': '100px',
  'margin-bottom': '100px'
}

export default function Spacer(props) {
  const spacerElement = (
    <div style={defaultSpacing} />
  )

  return (
    <>
      {spacerElement}
    </>
  )
}
