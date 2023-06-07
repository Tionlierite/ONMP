import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import names_of_tables from './names_of_tables.json'
import item_logo from './table.png'

let Names_of_tables = names_of_tables.sort()

const linkStyle = {
  textDecoration: "none",
  color: 'blue'
};

const StyledButton = styled(Button)({
  textTransform: 'none',
  // backgroundColor: '#e8e8e8',
});

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
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
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
    <List >
      {searchResults.map(item => (
       <ListItem style={{margin: -9 }} >
          <StyledButton variant="outlined">
            <img src={item_logo} width={'40'} style={{margin: 5 }}  alt = "Иконка"/>
            <Link to={{ pathname: "/tables/WorkWithTable", state: item}} style={linkStyle}>{item}</Link>
          </StyledButton>
        </ListItem>
        
      ))}
    </List>
    </div>
    </Box>
  );
}

export default CustomizedInputBase