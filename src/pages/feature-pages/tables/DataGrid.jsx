import React from 'react';
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import data from './Шкала оценки вероятности ТЭЛА (Revised Geneva Score).json'

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
        // width: i.length*12,
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

function SummRows(arr_rows, arr, sum_col) {
  let sum = 0;
  for (let i in arr_rows) {
    for (let j in arr_rows[i]) {
      for (let z in arr) {
        if (arr_rows[i][j] === arr[z]) {
          console.log(arr_rows[i][sum_col]);
          sum = sum + Number(arr_rows[i][sum_col]);
        }
      }
    }
  }
  return sum;
}

function SelRowToArr (x) {
  let arr = [];
  arr = x;
  return arr;
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

function ShowTable(table, type_table, selectionModel, setSelectionModel) {
  if (type_table == 1 || type_table == 2) return (
    <StyledDataGrid
      sx={{
        "& .MuiDataGrid-columnHeaderTitle": {
          whiteSpace: "normal",
          lineHeight: "normal"
        },
        "& .MuiDataGrid-columnHeader": {
          // Forced to use important since overriding inline styles
          height: "unset !important"
        },
        "& .MuiDataGrid-columnHeaders": {
          // Forced to use important since overriding inline styles
          maxHeight: "168px !important"
        }
      }}
      rows={table}
      columns={GetHeader(table[0])}
      autoHeight={true}
      getRowHeight={() => 'auto'}
      getRowId={(row) => row[GetRowId(table)]}
      disableColumnMenu
      hideFooterSelectedRowCount
      hideFooterRowCount
      hideFooter
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setSelectionModel(newRowSelectionModel);
      }}
      selectionModel={selectionModel}
    />
  )
  if (type_table == 3) {
    return (
      <StyledDataGrid
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            whiteSpace: "normal",
            lineHeight: "normal"
          },
          "& .MuiDataGrid-columnHeader": {
            // Forced to use important since overriding inline styles
            height: "unset !important"
          },
          "& .MuiDataGrid-columnHeaders": {
            // Forced to use important since overriding inline styles
            maxHeight: "168px !important"
          }
        }}
        rows={table}
        columns={GetHeader(table[0])}
        autoHeight={true}
        getRowHeight={() => 'auto'}
        getRowId={(row) => row[GetRowId(table)]}
        checkboxSelection
        disableColumnMenu
        hideFooterSelectedRowCount
        hideFooterRowCount
        hideFooter
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectionModel(newRowSelectionModel);
        }}
        selectionModel={selectionModel}
      />
    )
  }
  if (type_table == 4) {
    let arr_pol = []
    for (let i in table)  {
      if (i != "Интерпретация результата")
      arr_pol.push(i)
    }
    if (arr_pol.length == 1) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
      </div>
    )
    if (arr_pol.length == 2) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel, setSelectionModel)}
      </div>
    )
    if (arr_pol.length == 3) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[2], selectionModel, setSelectionModel)}
      </div>
    )
    if (arr_pol.length == 4) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[2], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[3], selectionModel, setSelectionModel)}
      </div>
    )
    if (arr_pol.length == 5) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[2], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[3], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[4], selectionModel, setSelectionModel)}
      </div>
    )
    if (arr_pol.length == 6) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[2], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[3], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[4], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[5], selectionModel, setSelectionModel)}
      </div>
    )
    if (arr_pol.length == 7) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[2], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[3], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[4], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[5], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[6], selectionModel, setSelectionModel)}
      </div>
    )
    if (arr_pol.length == 8) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[2], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[3], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[4], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[5], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[6], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[7], selectionModel, setSelectionModel)}
      </div>
    )
    if (arr_pol.length == 9) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[2], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[3], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[4], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[5], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[6], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[7], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[8], selectionModel, setSelectionModel)}
      </div>
    )
    if (arr_pol.length == 10) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[2], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[3], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[4], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[5], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[6], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[7], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[8], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[9], selectionModel, setSelectionModel)}
      </div>
    )
    
    if (arr_pol.length == 11) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[2], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[3], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[4], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[5], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[6], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[7], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[8], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[9], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[10], selectionModel, setSelectionModel)}
      </div>
    )
  }
}

function OneSubTable (table, i, selectionModel, setSelectionModel) {
  return (
    <div>
      <h3>{i}</h3>
      <StyledDataGrid
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            whiteSpace: "normal",
            lineHeight: "normal"
          },
          "& .MuiDataGrid-columnHeader": {
            // Forced to use important since overriding inline styles
            height: "unset !important"
          },
          "& .MuiDataGrid-columnHeaders": {
            // Forced to use important since overriding inline styles
            maxHeight: "168px !important"
          }
        }}
        rows={table[i]}
        columns={GetHeader(table[i][0])}
        autoHeight={true}
        getRowHeight={() => 'auto'}
        getRowId={(row) => row[GetRowId(table[i])]}
        disableColumnMenu
        hideFooterSelectedRowCount
        hideFooterRowCount
        hideFooter
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectionModel(newRowSelectionModel);
        }}
        selectionModel={selectionModel}
      />
    </div>
  )
}

function ShowResult(table, type_result, selectionModel, res_table, part_name) {
  if (type_result == 2) return (
    <div>
      <h1>Результат: </h1>
      <Stack spacing={3} direction="column" width={'50%'}>
        <TextField
          id="outlined-controlled"
          label="Сумма"
          value={selectionModel}
          multiline
        />
        <ColorButton variant="contained">Сохранить</ColorButton>
      </Stack>
    </div>
  )
  if (type_result == 3) return (
    <div>
      <h1>Результат: </h1>
      <Stack spacing={3} direction="column" width={'50%'}>
        <TextField
          id="outlined-controlled"
          label="Сумма"
          value={part_name + " - " + selectionModel + " баллов"}
          multiline
        />
        <ColorButton variant="contained">Сохранить</ColorButton>
      </Stack>
    </div>
  )
  if (type_result == 4) return (
    <div>
      <h1>Результат: </h1>
        <Stack spacing={3} direction="column" width={'50%'}>
          <TextField
            id="outlined-controlled"
            label="Сумма"
            value={part_name + ": " + Number(SummRows(table, SelRowToArr(selectionModel), "5 лет")) + " %"}
            multiline
          />
          <ColorButton variant="contained">Сохранить</ColorButton>
        </Stack>
    </div>
  )
  if (type_result == 5) return (
    <div>
      <h1>Результат: </h1>
        <Stack spacing={3} direction="column" width={'50%'}>
          <TextField
            id="outlined-controlled"
            label="Сумма"
            value={part_name + ": " + Number(SummRows(table, SelRowToArr(selectionModel), "Баллы")) + " баллов - " + GetTextRes(res_table, SummRows(table, SelRowToArr(selectionModel), "Баллы"))}
            multiline
          />
          <ColorButton variant="contained">Сохранить</ColorButton>
        </Stack>
    </div>
  )
}


function SelectableDataGrid (props) {

  // const [tableData, setTableData] = useState([])
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((data) => data.json())
  //     .then((data) => setTableData(data))
  // }, [])
  // console.log(tableData)

  const [selectionModel, setSelectionModel] = useState([]);

  // let name = "Шкала комы FOUR";
  let name = props.name_of_table;

  const [appState, setAppState] = useState({
    loading: false,
    items: [],
    error: null,
    res: [],
    type_table: null,
    type_result: null,
    note: null,
    part_name: null
  });

  useEffect(() => {
    fetch("https://apu-hd.fun/api/v1/differentials_tables/get_diff_tables/?name=" + name)
      .then((res) => res.json())
      .then(
        (repos) => {
          setAppState({ 
            loading: true, 
            items: repos[name].data,
            res: repos[name].data["Интерпретация результата"],
            type_table: repos[name].type_table,
            type_result: repos[name].type_result,
            note: repos[name].note,
            part_name: repos[name].part_name
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

  if (name == "Шкала оценки вероятности ТЭЛА (Revised Geneva Score)") {
    for (let i in appState.items) {
      if (i == name) {
        appState.items = appState.items[i]
      }
    }
  }

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
        <h1>{props.name_of_table}</h1>
        {ShowTable(appState.items, appState.type_table, selectionModel, setSelectionModel)}
        {ShowResult(appState.items, appState.type_result, selectionModel, appState.res, appState.part_name)}
      </div>
      </Box>
    )
  }
}

export default SelectableDataGrid