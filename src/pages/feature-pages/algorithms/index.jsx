import React, {useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {InputBase, IconButton, Snackbar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import SearchComponent from './Search';
import {data} from "./MOC_DATA.jsx";

const AlgorithmsPage = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchResults, setSearchResults] = useState(data);
  const [searchValue, setSearchValue] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const uncheckedSubItems = searchResults.flatMap((item, index) =>
      item.sub_diagnoses.flatMap((subItem, subIndex) =>
        Array.isArray(subItem.medicine_help)
          ? subItem.medicine_help
              .map((_, helpIndex) => `${index}-${subIndex}-${helpIndex}`)
              .filter((item) => !checkedItems.includes(item))
          : !checkedItems.includes(`${index}-${subIndex}-0`) ? [`${index}-${subIndex}-0`] : []
      )
    );

    if (uncheckedSubItems.length > 0) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [checkedItems, searchResults]);

  const handleCheckboxChange = (itemIndex) => {
    if (checkedItems.includes(itemIndex)) {
      setCheckedItems(checkedItems.filter((index) => index !== itemIndex));
    } else {
      setCheckedItems([...checkedItems, itemIndex]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    performSearch(event.target.value);
  };

  const performSearch = (value) => {
    const filteredData = data.filter((item) => item.mkb_code.toLowerCase().includes(value.toLowerCase()));
    setSearchResults(filteredData);
  };

  const handleCloseWarning = () => {
    setShowWarning(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <InputBase
          placeholder="Введите код МКБ"
          value={searchValue}
          onChange={handleSearchChange}
          startAdornment={
            <IconButton disabled>
              <SearchIcon />
            </IconButton>
          }
          style={{ flex: 1 }}
        />
      </div>
      {searchResults.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant = "h5">{item.mkb_code}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {item.sub_diagnoses.map((subItem, subIndex) => (
              <Accordion key={subIndex}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography variant="h5" >{subItem.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <Typography variant="h6">Медицинская помощь</Typography>
                    {Array.isArray(subItem.medicine_help) ? (
                      <ul style={{ listStyleType: 'none' }}>
                        {subItem.medicine_help.map((helpItem, helpIndex) => (
                          <li key={helpIndex}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={checkedItems.includes(`${index}-${subIndex}-${helpIndex}`)}
                                  onChange={() => handleCheckboxChange(`${index}-${subIndex}-${helpIndex}`)}
                                />
                              }
                              label={helpItem}
                            />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Typography>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkedItems.includes(`${index}-${subIndex}-0`)}
                              onChange={() => handleCheckboxChange(`${index}-${subIndex}-0`)}
                            />
                          }
                          label={subItem.medicine_help}
                        />
                      </Typography>
                    )}
                    <Typography variant="h6">Тактика</Typography>
                    <Typography>{subItem.taktik}</Typography>
                    <Typography variant="h6">Рекомендации</Typography>
                    <Typography>{subItem.recomendation}</Typography>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Snackbar
        open={showWarning}
        message="Не вcя оказанная помощь. Пожалуйста, проверьте пункты перед переходом на другую страницу."
        autoHideDuration={5000}
        onClose={handleCloseWarning}
      />
    </div>
  );
};

export default AlgorithmsPage;