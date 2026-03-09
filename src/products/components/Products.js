import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Container } from '@mui/material';
import Alert from '@mui/material/Alert';

import { useAuth } from '../../AuthContext';
import { createProduct, getAllProducts } from '../services/Services';

import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = Math.floor(Math.random() * 100) + 1;
        setRows((oldRows) => [
            ...oldRows,
            { id, productName: '', categoryName: '', description: '', price: 'null', isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

export default function Products() {
    const { isAuthenticated, isAdmin } = useAuth();
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'success',
    });

    useEffect(() => {
        if (!isAuthenticated || !isAdmin) {
            return;
        }
        getAllProducts()
            .then(res => {
                setRows(res);
            }).catch(err => {
                console.log('err', err)
            })
    }, [isAuthenticated, isAdmin])

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        try {
            const res = await createProduct(newRow);
            setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
            setSnackbar({
                open: true,
                message: typeof res === 'string' && res ? res : 'Product saved successfully.',
                severity: 'success',
            });
            return updatedRow;
        } catch (error) {
            console.error('Failed to save product', error);
            const msg = error.response?.data?.message
                || (typeof error.response?.data === 'object' ? JSON.stringify(error.response.data) : error.response?.data)
                || error.message
                || 'Failed to save product.';
            setSnackbar({
                open: true,
                message: msg,
                severity: 'error',
            });
            throw error;
        }
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 150,
            editable: true
        },
        {
            field: 'productName',
            headerName: 'ProductName',
            type: 'text',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'categoryName',
            headerName: 'CategoryName',
            type: 'text',
            width: 200,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
            editable: true,
            type: 'text',
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{ color: 'primary.main' }}
                            onClick={handleSaveClick(id)}
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
        },
    ];

    if (!isAuthenticated) {
        return (
            <Container style={{ color: "#708090" }}>
                <h3 style={{ color: "gray" }}><u>Product Admin</u></h3>
                <Alert severity="info">Please log in to access admin product management.</Alert>
            </Container>
        );
    }

    if (!isAdmin) {
        return (
            <Container style={{ color: "#708090" }}>
                <h3 style={{ color: "gray" }}><u>Product Admin</u></h3>
                <Alert severity="error">You are not authorized to manage products. ADMIN role required.</Alert>
            </Container>
        );
    }

    return (
        <Container style={{ color: "#708090" }}>
            <h3 style={{ color: "gray" }}><u>Product List</u></h3>
            {snackbar.open && (
                <Alert
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    sx={{ mb: 2 }}
                >
                    {snackbar.message}
                </Alert>
            )}
            <Box sx={{ height: 400, width: '96%', color: '#DCDCDC' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{ toolbar: EditToolbar }}
                    slotProps={{ toolbar: { setRows, setRowModesModel } }}
                />
            </Box>
        </Container>
    );
}
