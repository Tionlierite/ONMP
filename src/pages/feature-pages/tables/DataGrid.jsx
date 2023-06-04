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

function SelRowToArr (x) {
  let arr = [];
  arr = x;
  return arr;
}

function SummRows(table, selected_str, age) {
  let sum_col = 0;
  if (age != null) {
    sum_col = age
  }
  else {
    for (let i in table) {
      for (let j in table[i]) {
        sum_col = j;
      }
    }
  }
  let sum = 0;
  for (let i in table) {
    for (let j in table[i]) {
      for (let z in selected_str) {
        if (table[i][j] === selected_str[z]) {
          console.log(table[i][sum_col]);
          sum = sum + Number(table[i][sum_col]);
        }
      }
    }
  }
  return sum;
}

function GetTextRes(res_rows, x) {
  for (let i = 0; i < res_rows.length; i++) {
    for (let j in res_rows[i]) {
      if (res_rows[i][j] == x) {
        for (let z in res_rows[i]) {
          if (z != j) return res_rows[i][z];
        }
      }
    }
  }
  return ""
}

function InterpretationPercent(table, selected_str, age) {
  let res_string = "("
  let sum_col_start = 0;
  let sum_col_end = 0;
  for (let i in table) {
    for (let j in table[i]) {
      sum_col_start = j;
      break;
    }
  }
  if (age != null) {
    sum_col_end = age
  }
  else {
    for (let i in table) {
      for (let j in table[i]) {
        sum_col_end = j;
      }
    }
  }
  for (let i in table) {
    for (let j in table[i]) {
      for (let z in selected_str) {
        if (table[i][j] === selected_str[z]) {
          res_string += table[i][sum_col_end] + "% - " + table[i][sum_col_start].toLowerCase() + ", ";
        }
      }
    }
  }
  res_string = res_string.substring(0, res_string.length - 2)
  if (res_string.length !== 0) res_string += ")"
  return res_string
}

function InterpretationBall(arr_pol, arr_selectionModel, age) {
  let res_string = "("
  for (let i = 0; i < arr_pol.length; i++) {
    res_string += String(arr_pol[i]).toLowerCase() + " - " + String(arr_selectionModel[i]).toLowerCase() + ", "
  }
  res_string = res_string.substring(0, res_string.length - 2)
  res_string += ")"
  return res_string
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

function ShowTable(name, table, type_table, age_column, selectionModel, setSelectionModel, 
  selectionModel1, setSelectionModel1, selectionModel2, setSelectionModel2, selectionModel3, setSelectionModel3, 
  selectionModel4, setSelectionModel4, selectionModel5, setSelectionModel5, selectionModel6, setSelectionModel6, 
  selectionModel7, setSelectionModel7, selectionModel8, setSelectionModel8, selectionModel9, setSelectionModel9, 
  selectionModel10, setSelectionModel10) {
  if (type_table === 1 || type_table === 2) return (
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
  if (type_table === 3) {
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
  if (type_table === 4) {
    if (name === "Шкала Глазго (Glasgow Coma Scale)") {
      table = table[age_column]
    }
    let arr_pol = []
    for (let i in table)  {
      if (i !== "Интерпретация результата")
      arr_pol.push(i)
    }
    if (arr_pol.length === 1) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
      </div>
    )
    if (arr_pol.length === 2) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel1, setSelectionModel1)}
      </div>
    )
    if (arr_pol.length === 3) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel1, setSelectionModel1)}
        {OneSubTable(table, arr_pol[2], selectionModel2, setSelectionModel2)}
      </div>
    )
    if (arr_pol.length === 4) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel1, setSelectionModel1)}
        {OneSubTable(table, arr_pol[2], selectionModel2, setSelectionModel2)}
        {OneSubTable(table, arr_pol[3], selectionModel3, setSelectionModel3)}
      </div>
    )
    if (arr_pol.length === 5) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel1, setSelectionModel1)}
        {OneSubTable(table, arr_pol[2], selectionModel2, setSelectionModel2)}
        {OneSubTable(table, arr_pol[3], selectionModel3, setSelectionModel3)}
        {OneSubTable(table, arr_pol[4], selectionModel4, setSelectionModel4)}
      </div>
    )
    if (arr_pol.length === 6) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel1, setSelectionModel1)}
        {OneSubTable(table, arr_pol[2], selectionModel2, setSelectionModel2)}
        {OneSubTable(table, arr_pol[3], selectionModel3, setSelectionModel3)}
        {OneSubTable(table, arr_pol[4], selectionModel4, setSelectionModel4)}
        {OneSubTable(table, arr_pol[5], selectionModel5, setSelectionModel5)}
      </div>
    )
    if (arr_pol.length === 7) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel1, setSelectionModel1)}
        {OneSubTable(table, arr_pol[2], selectionModel2, setSelectionModel2)}
        {OneSubTable(table, arr_pol[3], selectionModel3, setSelectionModel3)}
        {OneSubTable(table, arr_pol[4], selectionModel4, setSelectionModel4)}
        {OneSubTable(table, arr_pol[5], selectionModel5, setSelectionModel5)}
        {OneSubTable(table, arr_pol[6], selectionModel6, setSelectionModel6)}
      </div>
    )
    if (arr_pol.length === 8) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel1, setSelectionModel1)}
        {OneSubTable(table, arr_pol[2], selectionModel2, setSelectionModel2)}
        {OneSubTable(table, arr_pol[3], selectionModel3, setSelectionModel3)}
        {OneSubTable(table, arr_pol[4], selectionModel4, setSelectionModel4)}
        {OneSubTable(table, arr_pol[5], selectionModel5, setSelectionModel5)}
        {OneSubTable(table, arr_pol[6], selectionModel6, setSelectionModel6)}
        {OneSubTable(table, arr_pol[7], selectionModel7, setSelectionModel7)}
      </div>
    )
    if (arr_pol.length === 9) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel1, setSelectionModel1)}
        {OneSubTable(table, arr_pol[2], selectionModel2, setSelectionModel2)}
        {OneSubTable(table, arr_pol[3], selectionModel3, setSelectionModel3)}
        {OneSubTable(table, arr_pol[4], selectionModel4, setSelectionModel4)}
        {OneSubTable(table, arr_pol[5], selectionModel5, setSelectionModel5)}
        {OneSubTable(table, arr_pol[6], selectionModel6, setSelectionModel6)}
        {OneSubTable(table, arr_pol[7], selectionModel7, setSelectionModel7)}
        {OneSubTable(table, arr_pol[8], selectionModel8, setSelectionModel8)}
      </div>
    )
    if (arr_pol.length === 10) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel1, setSelectionModel1)}
        {OneSubTable(table, arr_pol[2], selectionModel2, setSelectionModel2)}
        {OneSubTable(table, arr_pol[3], selectionModel3, setSelectionModel3)}
        {OneSubTable(table, arr_pol[4], selectionModel4, setSelectionModel4)}
        {OneSubTable(table, arr_pol[5], selectionModel5, setSelectionModel5)}
        {OneSubTable(table, arr_pol[6], selectionModel6, setSelectionModel6)}
        {OneSubTable(table, arr_pol[7], selectionModel7, setSelectionModel7)}
        {OneSubTable(table, arr_pol[8], selectionModel8, setSelectionModel8)}
        {OneSubTable(table, arr_pol[9], selectionModel9, setSelectionModel9)}
      </div>
    )
    if (arr_pol.length === 11) return (
      <div>
        {OneSubTable(table, arr_pol[0], selectionModel, setSelectionModel)}
        {OneSubTable(table, arr_pol[1], selectionModel1, setSelectionModel1)}
        {OneSubTable(table, arr_pol[2], selectionModel2, setSelectionModel2)}
        {OneSubTable(table, arr_pol[3], selectionModel3, setSelectionModel3)}
        {OneSubTable(table, arr_pol[4], selectionModel4, setSelectionModel4)}
        {OneSubTable(table, arr_pol[5], selectionModel5, setSelectionModel5)}
        {OneSubTable(table, arr_pol[6], selectionModel6, setSelectionModel6)}
        {OneSubTable(table, arr_pol[7], selectionModel7, setSelectionModel7)}
        {OneSubTable(table, arr_pol[8], selectionModel8, setSelectionModel8)}
        {OneSubTable(table, arr_pol[9], selectionModel9, setSelectionModel9)}
        {OneSubTable(table, arr_pol[10], selectionModel10, setSelectionModel10)}
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

function ShowResult(name, table, type_result, selectionModel, arr_selectionModel, res_table, part_name, age) {
  if (part_name === "") part_name = name
  if (name === "Шкала Глазго (Glasgow Coma Scale)") {
    table = table[age]
  }
  if (type_result === 2) return (
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
  if (type_result === 3) return (
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
  if (type_result === 4) return (
    <div>
      <h1>Результат: </h1>
        <Stack spacing={3} direction="column" width={'50%'}>
          <TextField
            id="outlined-controlled"
            label="Сумма"
            value={part_name + ": " + Number(SummRows(table, SelRowToArr(selectionModel), age)) + " % "  
            + InterpretationPercent(table, SelRowToArr(selectionModel), age)}
            multiline
          />
          <ColorButton variant="contained">Сохранить</ColorButton>
        </Stack>
    </div>
  )
  if (name === "Шкала оценки вероятности ТЭЛА (Revised Geneva Score)") return (
    <div>
      <h1>Результат: </h1>
        <Stack spacing={3} direction="column" width={'50%'}>
          <TextField
            id="outlined-controlled"
            label="Сумма"
            value={part_name + ": " + Number(SummRows(table, SelRowToArr(selectionModel))) + " баллов - " 
                  + GetTextRes(res_table, SummRows(table, SelRowToArr(selectionModel))).toLowerCase()}
            multiline
          />
          <ColorButton variant="contained">Сохранить</ColorButton>
        </Stack>
    </div>
  )
  if (type_result === 5) {
    let arr_pol = [];
    for (let i in table) {
      if (i !== "Интерпретация результата")
        arr_pol.push(i)
    }
    let summ = 0;
    for (let i = 0; i < arr_pol.length; i++) {
      for (let j = 0; j < arr_selectionModel.length; j++) {
        summ += Number(SummRows(table[arr_pol[i]], SelRowToArr(arr_selectionModel[j])))
      }
    }
    return (
      <div>
        <h1>Результат: </h1>
          <Stack spacing={3} direction="column" width={'50%'}>
            <TextField
              id="outlined-controlled"
              label="Сумма"
              value={part_name + ": " + summ + " баллов - " + GetTextRes(res_table, summ).toLowerCase()}
              multiline
            />
            <ColorButton variant="contained">Сохранить</ColorButton>
          </Stack>
      </div>
    )
  }
  if (type_result === 6) {
    let arr_pol = [];
    for (let i in table) {
      if (i !== "Интерпретация результата")
        arr_pol.push(i)
    }
    let summ = 0;
    for (let i = 0; i < arr_pol.length; i++) {
      for (let j = 0; j < arr_selectionModel.length; j++) {
        summ += Number(SummRows(table[arr_pol[i]], SelRowToArr(arr_selectionModel[j])))
      }
    }
    return (
      <div>
        <h1>Результат: </h1>
          <Stack spacing={3} direction="column" width={'50%'}>
            <TextField
              id="outlined-controlled"
              label="Сумма"
              value={part_name + ": " + summ + " баллов"}
              multiline
            />
            <ColorButton variant="contained">Сохранить</ColorButton>
          </Stack>
      </div>
    )
  }
  if (type_result === 7) {
    let arr_pol = [];
    for (let i in table) {
      if (i !== "Интерпретация результата")
        arr_pol.push(i)
    }
    let summ = 0;
    for (let i = 0; i < arr_pol.length; i++) {
      summ += SummRows(table[arr_pol[i]], SelRowToArr(arr_selectionModel[i]))
    }
    if (name === "Шкала Глазго (Glasgow Coma Scale)") {
      return (
        <div>
          <h1>Результат: </h1>
            <Stack spacing={3} direction="column" width={'50%'}>
              <TextField
                id="outlined-controlled"
                label="Сумма"
                value={part_name + ": " + summ + " баллов - " + GetTextRes(res_table, summ).toLowerCase() + " " + String(InterpretationBall(arr_pol, arr_selectionModel, age))}
                multiline
              />
              <ColorButton variant="contained">Сохранить</ColorButton>
            </Stack>
        </div>
      )
    }
    else {
      return (
        <div>
          <h1>Результат: </h1>
            <Stack spacing={3} direction="column" width={'50%'}>
              <TextField
                id="outlined-controlled"
                label="Сумма"
                value={part_name + ": " + summ + " баллов " + String(InterpretationBall(arr_pol, arr_selectionModel, age))}
                multiline
              />
              <ColorButton variant="contained">Сохранить</ColorButton>
            </Stack>
        </div>
      )
    }
  }
}

function SelectableDataGrid (props) {

  const [selectionModel, setSelectionModel] = useState([]);
  const [selectionModel1, setSelectionModel1] = useState([]);
  const [selectionModel2, setSelectionModel2] = useState([]);
  const [selectionModel3, setSelectionModel3] = useState([]);
  const [selectionModel4, setSelectionModel4] = useState([]);
  const [selectionModel5, setSelectionModel5] = useState([]);
  const [selectionModel6, setSelectionModel6] = useState([]);
  const [selectionModel7, setSelectionModel7] = useState([]);
  const [selectionModel8, setSelectionModel8] = useState([]);
  const [selectionModel9, setSelectionModel9] = useState([]);
  const [selectionModel10, setSelectionModel10] = useState([]);

  let arr_selectionModel = [selectionModel, selectionModel1, selectionModel2, selectionModel3, selectionModel4, selectionModel5, 
    selectionModel6, selectionModel7, selectionModel8, selectionModel9, selectionModel10]

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
    part_name: null,
    age_column: null
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
            part_name: repos[name].part_name,
            age_column: repos[name].age_column
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

  if (name === "Шкала оценки вероятности ТЭЛА (Revised Geneva Score)") {
    for (let i in appState.items) {
      if (i === name) {
        appState.items = appState.items[i]
      }
    }
  }

  if (name === "Шкала Глазго (Glasgow Coma Scale)")
    appState.age_column = "Взрослые и детей старше 4 лет"

  if (name === "Определение площади ожогов у детей (по Lund и Browder)")
    appState.age_column = "5 лет"

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
        <h1>{props.name_of_table}</h1>
        {ShowTable(name, appState.items, appState.type_table, appState.age_column, selectionModel, setSelectionModel, 
          selectionModel1, setSelectionModel1, selectionModel2, setSelectionModel2, selectionModel3, setSelectionModel3, 
          selectionModel4, setSelectionModel4, selectionModel5, setSelectionModel5, selectionModel6, setSelectionModel6, 
          selectionModel7, setSelectionModel7, selectionModel8, setSelectionModel8, selectionModel9, setSelectionModel9, 
          selectionModel10, setSelectionModel10)}
        {ShowResult(name, appState.items, appState.type_result, selectionModel, arr_selectionModel, appState.res, appState.part_name, appState.age_column)}
        <p>{appState.note}</p>
      </div>
      </Box>
    )
  }
}

export default SelectableDataGrid