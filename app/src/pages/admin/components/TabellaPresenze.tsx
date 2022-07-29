import {
  DataGrid,
  GridCellModesModel,
  GridColDef,
  GridRowId,
  GridCellModes,
  GridEventListener,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Box, createTheme, LinearProgress, ThemeProvider } from "@mui/material";
import { motion } from "framer-motion";
import "./css_components/TabellaPresenze.css";
import Button from "@mui/material/Button";

const TabellaPresenze = (props: any) => {
  const [presenze, setPresenze] = useState([]);
  const [editPresenze, setEditPresenze] = useState([]);

  async function getPresenze() {
    axios
      .get(
        `${process.env.REACT_APP_FASTAPI_URL}/presence/all/first_name/last_name/`
      )
      .then((res) => {
        setPresenze(res.data.data);
      });
  }

  async function editGetPresenze() {
    axios
      .get(`${process.env.REACT_APP_FASTAPI_URL}/presence/employee/`)
      .then((res) => {
        setEditPresenze(res.data.data);
      });
  }

  interface SelectedCellParams {
    id: GridRowId;
    field: string;
  }

  interface EditToolbarProps {
    selectedCellParams?: SelectedCellParams;
    cellModesModel: GridCellModesModel;
    setCellModesModel: (value: GridCellModesModel) => void;
    cellMode: "view" | "edit";
  }

  function EditToolbar(props: EditToolbarProps) {
    const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } =
      props;

    const handleSaveOrEdit = () => {
      if (!selectedCellParams) {
        return;
      }
      const { id, field } = selectedCellParams;
      if (cellMode === "edit") {
        setCellModesModel({
          ...cellModesModel,
          [id]: {
            ...cellModesModel[id],
            [field]: { mode: GridCellModes.View },
          },
        });
      } else {
        setCellModesModel({
          ...cellModesModel,
          [id]: {
            ...cellModesModel[id],
            [field]: { mode: GridCellModes.Edit },
          },
        });
      }
    };

    const handleCancel = () => {
      if (!selectedCellParams) {
        return;
      }
      const { id, field } = selectedCellParams;
      setCellModesModel({
        ...cellModesModel,
        [id]: {
          ...cellModesModel[id],
          [field]: { mode: GridCellModes.View, ignoreModifications: true },
        },
      });
    };

    const handleMouseDown = (event: React.MouseEvent) => {
      // Keep the focus in the cell
      event.preventDefault();
    };

    return (
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          p: 1,
        }}
      >
        <Button
          onClick={handleSaveOrEdit}
          onMouseDown={handleMouseDown}
          disabled={!selectedCellParams}
          variant="outlined"
        >
          {cellMode === "edit" ? "Save" : "Edit"}
        </Button>
        <Button
          onClick={handleCancel}
          onMouseDown={handleMouseDown}
          disabled={cellMode === "view"}
          variant="outlined"
          sx={{ ml: 1 }}
        >
          Cancel
        </Button>
      </Box>
    );
  }

  useEffect(() => {
    getPresenze();
    editGetPresenze();
  }, []);

  let list = presenze.map((el) => {
    return {
      date_presence: el["date_presence"],
      first_name: el["first_name"],
      hours: el["hours"],
      id: el["id_employee"],
      last_name: el["last_name"],
      nome_azienda: el["nome_azienda"],
      tipoPresenza: el["tipoPresenza"],
    };
  });

  const rows = list;

  const columns: GridColDef[] = [
    {
      field: "first_name",
      headerName: "First name",
      width: 279,
      editable: true,
    },
    { field: "last_name", headerName: "Last name", width: 279, editable: true },
    {
      field: "tipoPresenza",
      headerName: "tipoPresenza",
      type: "string",
      width: 279,
      editable: true,
    },
    { field: "hours", headerName: "Ore", width: 279, editable: true },
    {
      field: "nome_azienda",
      headerName: "Commessa",
      width: 279,
      editable: true,
    },
    { field: "date_presence", headerName: "Data", width: 279, editable: true },
  ];

  const [selectedCellParams, setSelectedCellParams] =
    React.useState<SelectedCellParams | null>(null);
  const [cellModesModel, setCellModesModel] =
    React.useState<GridCellModesModel>({});

  const handleCellFocus = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const row = event.currentTarget.parentElement;
      const id = row!.dataset.id!;
      const field = event.currentTarget.dataset.field!;
      setSelectedCellParams({ id, field });
    },
    []
  );

  const cellMode = React.useMemo(() => {
    if (!selectedCellParams) {
      return "view";
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || "view";
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = React.useCallback<GridEventListener<"cellKeyDown">>(
    (params, event) => {
      if (cellMode === "edit") {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode]
  );

  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      style={{ height: 400, width: "100%" }}
      className="custom-grid"
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        checkboxSelection
        sx={{
          boxShadow: 20,
        }}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: {
            cellMode,
            selectedCellParams,
            setSelectedCellParams,
            cellModesModel,
            setCellModesModel,
          },
          cell: {
            onFocus: handleCellFocus,
          },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </motion.div>
  );
};

export default TabellaPresenze;
