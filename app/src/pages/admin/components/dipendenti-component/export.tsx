import * as React from 'react';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Button, Fade, Typography } from "@mui/material";


export default function CustomToolbar() {
  return (
    <>
        <GridToolbarContainer>
        <AggiungiDipendente/>
        <GridToolbarExport csvOptions={{
          fileName: "Dipendenti",
          delimiter: ';'
        }} />
        </GridToolbarContainer>

    </>
  );
}

const AggiungiDipendente = () => {
  return (
    <div>
       
    
    <a href="add_dipendenti">
    <Button>
      +Aggiungi Dipendente
    </Button>
    </a>
    </div>
  )
}




