import React, { useState, useEffect, useContext } from "react";
import { Box, useTheme, Select, MenuItem } from "@mui/material";
import Header from "components/Header";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import customFetch from "utils/customFetch";
import AuthContext from "context/AuthContext";

const generateId = () => {
  return [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

const EditToolbar = (props) => {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = generateId();
    setRows((oldRows) => [
      ...oldRows,
      { _id : id, name: '', email: '', transaction: '', role: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add admin
      </Button>
    </GridToolbarContainer>
  );
}


const Admin = () => {
  const theme = useTheme();

  const [rows, setRows] = useState([]);
  const [hasEditPermission, setHasEditpermission] = useState(false);
  const {profile} = useContext(AuthContext);
  
  useEffect(() => {
    const initFetch = async () => {
      const response = await customFetch('management/admins');
      setRows(response);
    }
    initFetch();

    if(profile.role == "superadmin"){
      setHasEditpermission(true);
    }
  },[profile])

  const [rowModesModel, setRowModesModel] = useState({});
  
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id, row) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick =  (id) => async () => {
    const response = await customFetch(`management/admins/${id}`, 'DELETE')
    setRows(response);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRoleChange = (id, newRole) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, role: newRole } : row))
    );
  };

  const processRowUpdate = async (newRow, oldRows) => {
    const updatedRow = { ...newRow, updatedAt: new Date().toISOString() };

    const response = await customFetch('management/admins', 'POST', newRow)
    setRows(response);
    return updatedRow;
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.8,
      editable: hasEditPermission ? true : false
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.8,
      editable: hasEditPermission ? true : false
    },
    {
      field: "password",
      headerName: "Password",
      flex: 0.6,
      editable: hasEditPermission ? true : false,
      renderCell: (params) => {
        return <span>{params.row.isNew ? "" : "********"}</span>
      },
      renderEditCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <input
            type="password"
            aria-invalid="false"
            className="MuiInputBase-input css-znj6fr-MuiInputBase-input"
            onChange={(e) => {
              // Update the value dynamically when the user types
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: e.target.value,
              });
            }}
          />
        </div>
      ),
    },    
    // {
    //   field: "transaction",
    //   type : "date",
    //   headerName: "Transaction",
    //   flex: 0.5,
    //   editable: true,
    //   valueGetter: (params) => {
    //     return new Date(params); 
    //   }
    // },
    {
      field: "role",
      headerName: "Role",
      flex: 0.6,
      editable: hasEditPermission ? true : false,
      renderEditCell: (params) => {
        return (
          <Select
            value={params.value || ""}
            onChange={(e) =>
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: e.target.value,
              })
            }
            fullWidth
          >
            <MenuItem value="admin">admin</MenuItem>
            <MenuItem value="superadmin">superadmin</MenuItem>
          </Select>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 0.8,
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id, row)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    }
  ];

  const columnVisibilityModel = {
    actions: hasEditPermission
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="List of Admins" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          // loading={isLoading || !rows}
          getRowId={(row) => row._id || row._id || row.key}
          rows={Array.isArray(rows) ? rows : []}
          columns={columns}
          rowModesModel={rowModesModel}
          editMode="row"
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={hasEditPermission ? { 
            toolbar: EditToolbar
           } : null}
          slotProps={hasEditPermission ? {
            toolbar: { setRows, setRowModesModel },
          } : null}
          columnVisibilityModel={columnVisibilityModel}  // Use the visibility model
        />
      </Box>
    </Box>
  );
};

export default Admin;
