import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { Container,Paper } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { GridColDef, GridValueGetter } from '@mui/x-data-grid';

import { createProduct,getAllProducts } from './services/Services';


import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';


// const roles = ['Market', 'Finance', 'Development'];
// const randomRole = () => {
//   return randomArrayItem(roles);
// };

const initialRows = [
 
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Math.floor(Math.random() * 100) + 1;
        setRows((oldRows) => [
      ...oldRows,
      { id, name: '', type: '', color: '',price:'null', isNew: true },
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

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
       
      },
    },
  }));

export default function Product1() {

    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const [name,setName] = useState('')
    const [type,setType] = useState('')
    const[products,setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({})
    const [responseMsg, setResponseMsg] = useState("")
    const [errorRes,setErrorMsg] = useState("")
    const classes = useStyles();

    // const handleSubmitForm = async (e) => {
    //     //console.log("=====Req product==",product)
    //     const result = await createProduct(product);
    //     console.log("=====Api response=====",result)
    //     if(result){
    //       setResponseMsg("Successfully created...")
    //     }else{
    //       setErrorMsg("error")
    //     }
    //   }

      useEffect(()=>{
        getAllProducts()
          .then(res=> {
            //setProducts(res)
            setRows(res);
          }).catch(err =>{
            console.log('err',err)
          })
        },[])  

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

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
    const result = await createProduct(newRow);
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'id',
        headerName: 'ID',
        width: 150,
        editable: true },
    {
      field: 'name',
      headerName: 'Name',
      type: 'text',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      type: 'text',
      width: 200,
      editable: true,
    },
    {
      field: 'colour',
      headerName: 'Colour',
      width: 150,
      editable: true,
      type: 'text',
      //valueOptions: ['Market', 'Finance', 'Development'],
    },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 150,
        editable: true,
        type: Number,
        //valueOptions: ['Market', 'Finance', 'Development'],
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
              sx={{
                color: 'primary.main',
              }}
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

  return (
    // <Box
    //   sx={{
    //     height: 500,
    //     width: '100%',
    //     '& .actions': {
    //       color: 'text.secondary',
    //     },
    //     '& .textPrimary': {
    //       color: 'text.primary',
    //     },
    //   }}
    // >
    //   <DataGrid
    //     rows={rows}
    //     columns={columns}
    //     editMode="row"
    //     rowModesModel={rowModesModel}
    //     onRowModesModelChange={handleRowModesModelChange}
    //     onRowEditStop={handleRowEditStop}
    //     processRowUpdate={processRowUpdate}
    //     slots={{ toolbar: EditToolbar }}
    //     slotProps={{
    //       toolbar: { setRows, setRowModesModel },
    //     }}
    //   />
    // </Box>

<Container style={{color: "#708090"}}>
<h2 style={{ color: "gray"}}><u>Product List</u></h2>
<Paper elevation={3} style={paperStyle}>
<Box sx={{ height: 400, width: '100%', color: '#DCDCDC' }}>
<DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
</Box>
</Paper>
</Container>
  );
}
