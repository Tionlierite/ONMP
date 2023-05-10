import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import { Link, Route, Switch } from 'react-router-dom'

const people = [
  "Акушерство",
  "ВАШ. НОШ. Шкалы оценки интенсивности боли",
  "Критерии оценки новорождённого по шкале Апгар",
  "Нормы ЧД, ЧСС, АД у детей (в покое)",
  "Определение площади ожогов у детей (по Lund и Browder)",
  "Острая дыхательная недостаточность (Кассиль В.Л. 2004 г.)",
  "Оценка мышечной силы по баллам",
  "Параметры проведения базовой СЛР",
  "Проктокол оценки тяжести состояния пациента (NEWS)",
  "Промывание желудка у детей",
  "Размеры эндотрахеальных трубок у детей",
  "Соответствие размеров ларннгеальных трубок параметрам пациента",
  "ХСН ШОКС (в модификации Мареева В.Ю.)",
  "Шкала Глазго (Glasgow Coma Scale)",
  "Шкала возбуждения-седации Ричмонда (шкала RASS)",
  "Шкала комы FOUR",
  "Шкала моторного дефицита LAMS (Los Angeles Motor Scale)",
  "Шкала оценки вероятности ТЭЛА (Revised Geneva Score)"
];


function CustomizedInputBase() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  React.useEffect(() => {
    const results = people.filter(person =>
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
    <div style={{/*width: 150*count_col+52*/ width: '50%' }}>
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
        <Link to={{ pathname: "/WorkWithTable", state: item}}>{item}</Link>
         </li>
        
      ))}
    </ul>
    </div>
    </Box>
  );
}

export default CustomizedInputBase