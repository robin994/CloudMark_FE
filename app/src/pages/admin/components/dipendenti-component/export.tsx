import * as React from 'react';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';


export default function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
