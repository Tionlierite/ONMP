import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  TextField,
  Grid,
  IconButton,
  Button,
  InputAdornment,
  Snackbar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import AlgorithmDialogAdd from './AlgorithmDialogAdd';
import { useDispatch} from 'react-redux'
import { addTablesResult } from '../../../shared/store/actions/algorithmsActions.js';
import { useHistory } from "react-router-dom";
//import AlgorithmDialogDelete from './AlgorithmDialogDelete';


const AlgorithmsPage = () => {
  const [data, setData] = useState(null);
  const [selectedOMPs, setSelectedOMPs] = useState({});
  const [selectedSubOMPs, setSelectedSubOMPs] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDiagnosis, setExpandedDiagnosis] = useState(null);
  const [expandedSubDiagnosis, setExpandedSubDiagnosis] = useState(null);
  const [expandedCode, setExpandedCode] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedHelp, setSelectedHelp] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
 // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [algorithmForm, setAlgorithmForm] = useState({
    mkbCode: '',
    diagnosis: '',
    omps: [''],
    tactics: [''],
    recommendation: '',
    subDiagnoses: [
      {
        name: '',
        omps: [''],
        recommendation: '',
      },
    ],
  }); // Добавлено

 /*const handleCheckboxChange = (mkbCode, diagnosisName, ompIndex, checked) => {
    setSelectedOMPs((prevState) => {
      const key = `${mkbCode}_${diagnosisName}_${ompIndex}`;
      return {
        ...prevState,
        [key]: checked,
      };
    });
  };

  const handleSubCheckboxChange = (mkbCode, diagnosisName, subDiagName, ompIndex, checked) => {
    setSelectedSubOMPs((prevState) => {
      const key = `${mkbCode}_${diagnosisName}_${subDiagName}_${ompIndex}`;
      return {
        ...prevState,
        [key]: checked,
      };
    });
  };
  */ 

  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = 'https://apu-hd.fun/api/v1/diagnoses/get_diagnoses/';
    const headers = {
      accept: 'application/json',
      'X-CSRFToken': 'ZhH3QqCxWudfHk1Pj3o1OwPMGJ4fLIKfCdXxSvTWrV2eb6MbosdD2wgN9KAPfETr',
    };

    fetch(url, { headers })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при выполнении запроса');
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDiagnosisAccordionChange = (diagnosisKey) => (event, isExpanded) => {
    setExpandedDiagnosis(isExpanded ? diagnosisKey : null);
  };

  const handleSubDiagnosisAccordionChange = (subDiagnosisKey) => (event, isExpanded) => {
    setExpandedSubDiagnosis(isExpanded ? subDiagnosisKey : null);
  };

  const handleCodeAccordionChange = (code) => (event, isExpanded) => {
    setExpandedCode(isExpanded ? code : null);
  };

  const filteredData = data
    ? Object.entries(data).filter(([mkbCode]) =>
        mkbCode.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleAddOMPs = () => {
    setAlgorithmForm((prevAlgorithm) => {
      const newOMPs = [...prevAlgorithm.omps, ''];
      return {
        ...prevAlgorithm,
        omps: newOMPs,
      };
    });
  };

  const handleRemoveOMPs = (ompIndex) => {
    setAlgorithmForm((prevAlgorithm) => {
      const newOMPs = [...prevAlgorithm.omps];
      newOMPs.splice(ompIndex, 1);
      return {
        ...prevAlgorithm,
        omps: newOMPs,
      };
    });
  };

  const handleAddTactics = () => {
    setAlgorithmForm((prevAlgorithm) => {
      const newTactics = [...prevAlgorithm.tactics, ''];
      return {
        ...prevAlgorithm,
        tactics: newTactics,
      };
    });
  };

  const handleRemoveTactics = (tacticsIndex) => {
    setAlgorithmForm((prevAlgorithm) => {
      const newTactics = [...prevAlgorithm.tactics];
      newTactics.splice(tacticsIndex, 1);
      return {
        ...prevAlgorithm,
        tactics: newTactics,
      };
    });
  };

  const handleAddSubDiagnosis = () => {
    setAlgorithmForm((prevAlgorithm) => {
      const newSubDiagnoses = [
        ...prevAlgorithm.subDiagnoses,
        {
          name: '',
          omps: [''],
          recommendation: '',
        },
      ];
      return {
        ...prevAlgorithm,
        subDiagnoses: newSubDiagnoses,
      };
    });
  };

  const handleRemoveSubDiagnosis = (subDiagnosisIndex) => {
    setAlgorithmForm((prevAlgorithm) => {
      const newSubDiagnoses = [...prevAlgorithm.subDiagnoses];
      newSubDiagnoses.splice(subDiagnosisIndex, 1);
      return {
        ...prevAlgorithm,
        subDiagnoses: newSubDiagnoses,
      };
    });
  };

  const handleRemoveSubDiagnosisOMPs = (subDiagnosisIndex, ompIndex) => {
  setAlgorithmForm((prevAlgorithm) => {
    const newSubDiagnoses = [...prevAlgorithm.subDiagnoses];
    newSubDiagnoses[subDiagnosisIndex].omps.splice(ompIndex, 1);
    return {
      ...prevAlgorithm,
      subDiagnoses: newSubDiagnoses,
    };
  });
};

const handleAddSubDiagnosisOMPs = (subDiagnosisIndex) => {
  setAlgorithmForm((prevAlgorithm) => {
    const newSubDiagnoses = [...prevAlgorithm.subDiagnoses];
    newSubDiagnoses[subDiagnosisIndex].omps.push('');
    return {
      ...prevAlgorithm,
      subDiagnoses: newSubDiagnoses,
    };
  });
};


  const handleAlgorithmInputChange = (event) => {
    const { name, value } = event.target;
    setAlgorithmForm((prevAlgorithm) => ({
      ...prevAlgorithm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(algorithmForm);
    
  
    // Добавляем новый алгоритм в массив filteredData
    const newAlgorithm = {
      [algorithmForm.mkbCode]: {
        [algorithmForm.diagnosis]: {
          omps: algorithmForm.omps.filter(Boolean),
          tactics: algorithmForm.tactics.filter(Boolean),
          diagnose_recommendation: algorithmForm.recommendation,
          sub_diagnoses: algorithmForm.subDiagnoses.reduce((acc, subDiagnosis) => {
            if (subDiagnosis.name.trim() !== '') {
              acc[subDiagnosis.name] = {
                sub_diag_omps: subDiagnosis.omps.filter(Boolean),
                sub_diag_recommendation: subDiagnosis.recommendation,
              };
            }
            return acc;
          }, {}),
        },
      },
    };

    setData((prevData) => ({ ...prevData, ...newAlgorithm }));
    const clearForm = () => {
      setAlgorithmForm({
        mkbCode: '',
        diagnosis: '',
        omps: [''],
        tactics: [''],
        recommendation: '',
        subDiagnoses: [
          {
            name: '',
            omps: [''],
            recommendation: '',
          },
        ],
      });
    };
    
    // Вызов функции clearForm для очистки значений полей формы
    clearForm();
    setDialogOpen(false);
  };

  const handleCheckboxChange = (mkbCode, diagnosisName, ompIndex, checked) => {
    setSelectedOMPs((prevState) => {
      const diagnosisData = data[mkbCode][diagnosisName];
      const value = diagnosisData.omps[ompIndex];
      return {
        ...prevState,
          [value]: checked,
     //   [`${mkbCode}_${diagnosisName}_${ompIndex}`]: checked,
      };
    });
  };
  
  const handleSubCheckboxChange = (mkbCode, diagnosisName, subDiagName, ompIndex, checked) => {
    setSelectedSubOMPs((prevState) => {
      const subDiagnosisData = data[mkbCode][diagnosisName].sub_diagnoses[subDiagName];
      const value = subDiagnosisData.sub_diag_omps[ompIndex];
      return {
        ...prevState,
          [value]: checked,
     //  [`${mkbCode}_${diagnosisName}_${subDiagName}_${ompIndex}`]: checked,
      };
    });
  };
  const dispatch = useDispatch()
  const history = useHistory()
  
  let selected = [];

  const handleSave = () => {
    const selectedHelps = Object.entries(selectedOMPs)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    const selectedSubHelps = Object.entries(selectedSubOMPs)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    const selected = [...selectedHelps, ...selectedSubHelps];
    setSelectedHelp(selected);

    const selectedString = selected.join('. ');
  
    if (selected.length > 0) {
      setSnackbarOpen(true);
      dispatch(addTablesResult(selectedString));
      history.push("/createCard");
    } else {
      setSnackbarOpen(false);
    }

  };  
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className="algorithms-page" style={{ width: '75%', margin: '0 auto' }}>
      <Grid container alignItems="center" mb={2}>
        <Grid item xs>
          <TextField
            label="Поиск по коду МКБ"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <IconButton onClick={handleDialogOpen}>+</IconButton>
        </Grid>
      </Grid>

      {filteredData.map(([mkbCode, diagnosisData]) => (
        <Accordion
          key={mkbCode}
          expanded={expandedCode === mkbCode}
          onChange={handleCodeAccordionChange(mkbCode)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">{mkbCode}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {Object.entries(diagnosisData).map(([diagnosisName, diagnosisDetails]) => (
                <Accordion
                  key={diagnosisName}
                  expanded={expandedDiagnosis === diagnosisName}
                  onChange={handleDiagnosisAccordionChange(diagnosisName)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">{diagnosisName}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Typography variant="h6">Объем медицинской помощи</Typography>
                      {diagnosisDetails.omps && diagnosisDetails.omps.length > 0 && diagnosisDetails.omps.map((omp, index) => {
                           const key = `${mkbCode}_${diagnosisName}_${index}`;
                           const isChecked = selected.includes(omp);

                          return (
                            <div
                              key={key}
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <Checkbox
                             //   checked={selectedOMPs[key] || false}
                                checked={isChecked}
                                onChange={(event) =>
                                  handleCheckboxChange(
                                    mkbCode,
                                    diagnosisName,
                                    index,
                                    event.target.checked
                                  )
                                }
                              />
                              <Typography style={{ marginLeft: '8px' }}>
                                {omp !== null ? omp : 'Объема медицинской помощи не существует'}
                              </Typography>
                            </div>
                          );
                        })}
                      <Typography variant="h6">Тактика</Typography>
                      {diagnosisDetails.tactics && diagnosisDetails.tactics.length > 0 && (
                        <div>
                          {diagnosisDetails.tactics
                            .sort()
                            .map((tactic, index) => (
                              <Typography key={index}>{tactic}</Typography>
                            ))}
                        </div>
                      )}

                      <Typography variant="h6">Рекомендации</Typography>
                      <Typography>{diagnosisDetails.diagnose_recommendation}</Typography>

                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="h5">Поддиагнозы</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {Object.entries(diagnosisDetails.sub_diagnoses).map(
                            ([subDiagName, subDiagData]) => (
                              <Accordion
                                key={subDiagName}
                                expanded={expandedSubDiagnosis === subDiagName}
                                onChange={handleSubDiagnosisAccordionChange(subDiagName)}
                              >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                  <Typography variant="h5">{subDiagName}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <div>
                                    <Typography variant="h6">
                                      Объем медицинской помощи
                                    </Typography>
                                    {subDiagData.sub_diag_omps &&
                                      subDiagData.sub_diag_omps.length > 0 &&
                                      subDiagData.sub_diag_omps.map((omp, index) => {
                                        const key = `${mkbCode}_${diagnosisName}_${subDiagName}_${index}`;
                                      // const key = subDiagData.sub_diag_omps[index];
                                        return (
                                          <div
                                            key={key}
                                            style={{ display: 'flex', alignItems: 'center' }}
                                          >
                                            <Checkbox
                                              checked={selectedSubOMPs[key] || false}
                                              onChange={(event) =>
                                                handleSubCheckboxChange(
                                                  mkbCode,
                                                  diagnosisName,
                                                  subDiagName,
                                                  index,
                                                  event.target.checked
                                                )
                                              }
                                            />
                                            <Typography style={{ marginLeft: '8px' }}>
                                              {omp !== null
                                                ? omp
                                                : 'Объема медицинской помощи не существует'}
                                            </Typography>
                                          </div>
                                        );
                                      })}
                                    <Typography variant="h6">Рекомендации</Typography>
                                    <Typography>{subDiagData.sub_diag_recommendation}</Typography>
                                  </div>
                                </AccordionDetails>
                              </Accordion>
                            )
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}

    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Сохранить
      </Button>
    </div>


     <Snackbar
      open={snackbarOpen}
      autoHideDuration={2000}
      onClose={handleCloseSnackbar}
      message={selectedHelp.length > 0 ? 'Ок' : 'Ничего не выбрано'}
    />
      <AlgorithmDialogAdd
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        handleSubmit={handleSubmit}
        algorithmForm={algorithmForm}
        handleAlgorithmInputChange={handleAlgorithmInputChange}
        setAlgorithmForm = {setAlgorithmForm}
        handleAddOMPs = {handleAddOMPs}
        handleRemoveOMPs = {handleRemoveOMPs}
        handleRemoveTactics = {handleRemoveTactics}
        handleAddTactics = {handleAddTactics}
        handleAddSubDiagnosis = {handleAddSubDiagnosis}
        handleRemoveSubDiagnosis = {handleRemoveSubDiagnosis}
        handleRemoveSubDiagnosisOMPs = {handleRemoveSubDiagnosisOMPs}
        handleAddSubDiagnosisOMPs = { handleAddSubDiagnosisOMPs}
      />
    </div>
  );
};

export default AlgorithmsPage;


