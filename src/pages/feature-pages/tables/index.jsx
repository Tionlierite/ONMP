import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { DataGridPro } from '@mui/x-data-grid-pro'
import {styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';

import data from './Шкала оценки вероятности ТЭЛА (Revised Geneva Score).json'

// for {"data":[]} json 
var products = data.data;

// for [] json
// var products = data;

var json_data = products[0];
var result = [];

for(var i in json_data) 
  result.push([i, json_data [i]]);

  
var new_prod = products.shift();

function count(obj) {
  var i = 0;
  for (var x in obj)
    if (obj.hasOwnProperty(x))
      i++;
  return i;
}

var count_col = count(products[0]);

const columns = [];

for (var i = 0; i < count_col; i++) {
  let header;
  if (i === 0) {
     header = {    
      field: result[i][0],  
      headerName: result[i][1],
      sortable: false,
      flex: 1,
      minWidth: 150
      
    };
  }
  else {
     header = {    
      field: result[i][0],  
      headerName: result[i][1],
      sortable: false,
      width: 150
    };
  }

  columns.push(header);
}

var uni_key = 0;
for(var i in products[0]) {
  let set = new Set();
  var have_uni_kay = 1;
  set.add(products[0][i]);
  for (var j = 1; j < products.length; j++) {
    if (set.has(products[j][i])) {
      have_uni_kay = 0;
      break;
    }
    else {
      set.add(products[j][i]);
    }
  }
  if (have_uni_kay === 1) {
    uni_key = i;
    break;
  }
}

// const columns = [
//   { field: result[0][0], headerName: result[0][1] },
//   { field: result[1][0], headerName: result[1][1] },
//   { field: result[2][0], headerName: result[2][1]}
// ]

let arr = [];
var ss = 4;
let s = { str: "points" };

function Summ_rows() {
  var sum = 0;
  for (var i in products) {
    for (var j in products[i]) {
      for (var z in arr) {
        if (products[i][j] === arr[z]) {
          console.log(products[i][s.str]);
          sum = sum + products[i][s.str];
        }
      }
    }
  }
  return sum;
}

function SelRowToArr (x) {
  arr = x;
}

var res = data.res;

function GetTextRes (x) {
  for (var i in res[0]) {
    if (i == x) {
      return res[0][i];
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

const SelectableDataGrid = () => {

  // const [tableData, setTableData] = useState([])
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((data) => data.json())
  //     .then((data) => setTableData(data))
  // }, [])
  // console.log(tableData)

  const [selectionModel, setSelectionModel] = useState([]);

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    >
    <div style={{/*width: 150*count_col+52*/ width: '50%' }}>
      <StyledDataGrid
        rows={products}
        columns={columns}
        pageSize={12}
        autoHeight={true}
        getRowHeight={() => 'auto'}
        getRowId={(row) => row[uni_key]}
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
      {console.log(arr)}
      {<h1>Результат: </h1>}
      {/*(ss = Summ_rows())*/}
      <TextField
        id="outlined-controlled"
        label="Сумма"
        value={Summ_rows() + " баллов - " + GetTextRes(Summ_rows())}
      />
    </div>
    </Box>
  )
}

export default SelectableDataGrid