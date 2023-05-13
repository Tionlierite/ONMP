import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom'

import names_of_tables from './names_of_tables.json'

let Names_of_tables = names_of_tables.sort()

function CustomizedInputBase() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  React.useEffect(() => {
    const results = Names_of_tables.filter(person =>
      person.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    >
    <div style={{ width: '50%' }}>
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '80%' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Введите название таблицы"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={searchTerm}
        onChange={handleChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
    <ul>
      {searchResults.map(item => (
        <li style={{margin: 5 }}>
          <Link to={{ pathname: "/tables/WorkWithTable", state: item}}>{item}</Link>
        </li>
        
      ))}
    </ul>
    </div>
    </Box>
  );
}

export default CustomizedInputBase