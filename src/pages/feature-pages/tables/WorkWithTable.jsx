import React from 'react';
import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';

import data from './Шкала оценки вероятности ТЭЛА (Revised Geneva Score).json'

let arr_rows = data.data;

let json_data = arr_rows[0];
let result = [];

for(let i in json_data) 
  result.push([i, json_data[i]]);

  
let new_prod = arr_rows.shift();

function count(obj) {
  let i = 0;
  for (let x in obj)
    if (obj.hasOwnProperty(x))
      i++;
  return i;
}

let count_col = count(arr_rows[0]);

const columns = [];

for (let i = 0; i < count_col; i++) {
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

let arr = [];
let summing_col= { str: "points" };

function Summ_rows() {
  let sum = 0;
  for (let i in arr_rows) {
    for (let j in arr_rows[i]) {
      for (let z in arr) {
        if (arr_rows[i][j] === arr[z]) {
          console.log(arr_rows[i][summing_col.str]);
          sum = sum + arr_rows[i][summing_col.str];
        }
      }
    }
  }
  return sum;
}

function SelRowToArr (x) {
  arr = x;
}

let res = data.res;

function GetTextRes (x) {
  for (let i in res[0]) {
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

const SelectableDataGrid = (props) => {

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
    <div style={{ width: '50%' }}>
	  <h2>Нажатое название таблицы - {props.name_of_table}, по нему делаем API-запрос на получение таблицы</h2>
      <h2>Пример работы с таблицей:</h2>
      <h1>Шкала оценки вероятности ТЭЛА (Revised Geneva Score)</h1>
      <StyledDataGrid
        rows={arr_rows}
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
      <TextField
        id="outlined-controlled"
        label="Сумма"
        value={Summ_rows() + " баллов - " + GetTextRes(Summ_rows())}
      />
    </div>
    </Box>
  )
}

class App extends React.Component {

	constructor(props){
        super(props);
        this.state={
            value:this.props.location.state,
        }

    }

	render() {
		return (
				<div>
					<SelectableDataGrid name_of_table={this.props.location.state} />
				</div>
		);
	}
}
export default App;