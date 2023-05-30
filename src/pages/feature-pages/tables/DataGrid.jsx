import React from 'react';
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function GetHeader(arr_rows) {
  let columns = [], count = 0;
  for (let i in arr_rows) {
    let header;
    if (count === 0) {
      header = {    
        field: i,  
        headerName: i,
        sortable: false,
        flex: 1,
        minWidth: 150
      };
      count++;
    }
    else {
      header = {    
        field: i,  
        headerName: i,
        sortable: false,
        width: 150
      };
    }
    columns.push(header);
  }
  return columns;
}

function GetRowId(arr_rows) {
  let uni_key = 0;
  for(let i in arr_rows[0]) {
    let set = new Set();
    let have_uni_kay = 1;
    set.add(arr_rows[0][i]);
    for (let j = 1; j < arr_rows.length; j++) {
      if (set.has(arr_rows[j][i])) {
        have_uni_kay = 0;
        break;
      }
      else {
        set.add(arr_rows[j][i]);
      }
    }
    if (have_uni_kay === 1) {
      uni_key = i;
      break;
    }
  }
  return uni_key;
}

let arr = [];

function Summ_rows(arr_rows) {
  let summing_col= { str: "Баллы" };
  let sum = 0;
  for (let i in arr_rows) {
    for (let j in arr_rows[i]) {
      for (let z in arr) {
        if (arr_rows[i][j] === arr[z]) {
          console.log(arr_rows[i][summing_col.str]);
          sum = sum + Number(arr_rows[i][summing_col.str]);
        }
      }
    }
  }
  return sum;
}

function SelRowToArr (x) {
  arr = x;
}

function GetTextRes(res_rows, x) {
  for (let i = 0; i < res_rows.length; i++) {
    for (let j in res_rows[i]) {
      if (res_rows[i][j] == x) {
        for (let z in res_rows[i]) {
          if (z != j) return res_rows[i][z];
          return res_rows[i][z]
        }
      }
    }
  }
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  }
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#27B49A'),
  backgroundColor: '#27B49A',
  '&:hover': {
    backgroundColor: '#27B49A',
  },
}));


function SelectableDataGrid (props) {

  // const [tableData, setTableData] = useState([])
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((data) => data.json())
  //     .then((data) => setTableData(data))
  // }, [])
  // console.log(tableData)

  const [selectionModel, setSelectionModel] = useState([]);

  let name = "Шкала оценки вероятности ТЭЛА (Revised Geneva Score)";

  const [appState, setAppState] = useState({
    loading: false,
    items: [],
    error: null,
    res: []
  });

  useEffect(() => {
    fetch("https://apu-hd.fun/api/v1/differentials_tables/get_diff_tables/?name=" + name)
      .then((res) => res.json())
      .then(
        (repos) => {
          setAppState({ 
            loading: true, 
            items: repos[name].data[name],
            res: repos[name].data["Интерпретация результата"]
        },
        (error) => {
          this.setState({
            loading: true,
            error
          });
        }
        );
      });
  }, [setAppState]);

  if (appState.error) {
    return <p> Error {appState.error.message} </p>
  }
  else if (!appState.loading) {
    return <p> Loaded... </p>
  }
  else {
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    >
    <div style={{ width: '50%' }}>
	  <h2>Нажатое название таблицы - {props.name_of_table}, по нему делаем API-запрос на получение таблицы</h2>
      <h2>Пример работы с таблицей:</h2>
      <h1>Шкала оценки вероятности ТЭЛА (Revised Geneva Score)</h1>
      <StyledDataGrid
        rows={appState.items}
        columns={GetHeader(appState.items[0])}
        pageSize={12}
        autoHeight={true}
        getRowHeight={() => 'auto'}
        getRowId={(row) => row[GetRowId(appState.items)]}
        checkboxSelection
        //disableMultipleRowSelection={true}
        disableColumnMenu
        hideFooterSelectedRowCount
        //hideFooterPagination 
        hideFooterRowCount
        //hideFooter
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectionModel(newRowSelectionModel);
        }}
        selectionModel={selectionModel}
      />
      {SelRowToArr(selectionModel)}
      <h1>Результат: </h1>
      <Stack spacing={3} direction="column" width={'50%'}>
        <TextField
          id="outlined-controlled"
          label="Сумма"
          value={Summ_rows(appState.items) + " баллов - " + GetTextRes(appState.res, Summ_rows(appState.items))}
        />
        <ColorButton variant="contained">Сохранить</ColorButton>
      </Stack>
    </div>
    </Box>
  )}
}

export default SelectableDataGrid