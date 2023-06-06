import React from 'react';
import {Button, IconButton, Typography, TextField} from '@mui/material';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const AlgorithmDialogAdd = ({
  dialogOpen,
  handleDialogClose,
  algorithmForm,
  handleAlgorithmInputChange,
  setAlgorithmForm,
  handleAddOMPs,
  handleRemoveOMPs,
  handleRemoveTactics,
  handleAddTactics,
  handleAddSubDiagnosis,
  handleAddSubDiagnosisOMPs,
  handleRemoveSubDiagnosis,
  handleRemoveSubDiagnosisOMPs,
  handleSubmit
}) => {
  return(
    dialogOpen && ( <Dialog open={dialogOpen} onClose={handleDialogClose} onSubmit={handleSubmit}
      PaperProps={{
        style: {
          width: '600px', 
          height: 'auto', 
        },
      }}>
      <DialogTitle>Добавить новый алгоритм</DialogTitle>
      <DialogContent>
        <TextField
          label="Код МКБ"
          name="mkbCode"
          value={algorithmForm.mkbCode}
          onChange={handleAlgorithmInputChange}
          fullWidth
          margin="normal"
          autoComplete="off"
        />
        <TextField
          label="Диагноз"
          name="diagnosis"
          value={algorithmForm.diagnosis}
          onChange={handleAlgorithmInputChange}
          fullWidth
          margin="normal"
          autoComplete="off"
        />
        <Typography variant="h6">Объем медицинской помощи</Typography>
        {algorithmForm.omps.map((omp, ompIndex) => (
          <div key={ompIndex} style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Объем медицинской помощи"
              value={omp}
              onChange={(e) => {
                const newOMPs = [...algorithmForm.omps];
                newOMPs[ompIndex] = e.target.value;
                setAlgorithmForm((prevAlgorithm) => ({
                  ...prevAlgorithm,
                  omps: newOMPs,
                }));
              }}
              fullWidth
              margin="normal"
              autoComplete="off"
              style={{ marginRight: '10px' }}
            />
            <IconButton onClick={() => handleRemoveOMPs(ompIndex)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <IconButton onClick={handleAddOMPs}>
          <AddIcon />
        </IconButton>
        <Typography variant="h6">Тактика</Typography>
        {algorithmForm.tactics.map((tactic, tacticsIndex) => (
          <div key={tacticsIndex} style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Тактика"
              value={tactic}
              onChange={(e) => {
                const newTactics = [...algorithmForm.tactics];
                newTactics[tacticsIndex] = e.target.value;
                setAlgorithmForm((prevAlgorithm) => ({
                  ...prevAlgorithm,
                  tactics: newTactics,
                }));
              }}
              fullWidth
              margin="normal"
              autoComplete="off"
              style={{ marginRight: '10px' }}
            />
            <IconButton onClick={() => handleRemoveTactics(tacticsIndex)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <IconButton onClick={handleAddTactics}>
          <AddIcon />
        </IconButton>
        
        <TextField
          label="Рекомендации"
          name="recommendation"
          value={algorithmForm.recommendation}
          onChange={handleAlgorithmInputChange}
          fullWidth
          margin="normal"
          autoComplete="off"
        />
        <Typography variant="h6">Случаи диагноза</Typography>
        {algorithmForm.subDiagnoses.map((subDiagnosis, subDiagnosisIndex) => (
          <div key={subDiagnosisIndex}>
            <TextField
              label="Название случая"
              value={subDiagnosis.name}
              onChange={(e) => {
                const newSubDiagnoses = [...algorithmForm.subDiagnoses];
                newSubDiagnoses[subDiagnosisIndex].name = e.target.value;
                setAlgorithmForm((prevAlgorithm) => ({
                  ...prevAlgorithm,
                  subDiagnoses: newSubDiagnoses,
                }));
              }}
              fullWidth
              margin="normal"
              autoComplete="off"
            />
          <Typography variant="h6">Медицинская помощь</Typography>
            {subDiagnosis.omps.map((omp, ompIndex) => (
              <div key={ompIndex} style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label="Объем медицинской помощи"
                  value={omp}
                  onChange={(e) => {
                    const newSubDiagnoses = [...algorithmForm.subDiagnoses];
                    newSubDiagnoses[subDiagnosisIndex].omps[ompIndex] = e.target.value;
                    setAlgorithmForm((prevAlgorithm) => ({
                      ...prevAlgorithm,
                      subDiagnoses: newSubDiagnoses,
                    }));
                  }}
                  fullWidth
                  margin="normal"
                  autoComplete="off"
                  style={{ marginRight: '10px' }}
                />
                <IconButton
                  onClick={() => handleRemoveSubDiagnosisOMPs(subDiagnosisIndex, ompIndex)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
              <IconButton onClick={() => handleAddSubDiagnosisOMPs(subDiagnosisIndex)}>
              <AddIcon />
            </IconButton>
              <TextField
              label="Рекомендации"
              value={subDiagnosis.recommendation}
              onChange={(e) => {
                const newSubDiagnoses = [...algorithmForm.subDiagnoses];
                newSubDiagnoses[subDiagnosisIndex].recommendation = e.target.value;
                setAlgorithmForm((prevAlgorithm) => ({
                  ...prevAlgorithm,
                  subDiagnoses: newSubDiagnoses,
                }));
              }}
              fullWidth
              margin="normal"
              autoComplete="off"
            />
            <Typography variant="h6">Добавить/удалить случай</Typography>
            <IconButton onClick={() => handleRemoveSubDiagnosis(subDiagnosisIndex)}>
              <DeleteIcon />
            </IconButton>
          </div>
          ))}        
          <IconButton onClick={handleAddSubDiagnosis}>
            <AddIcon />
          </IconButton>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Сохранить
        </Button>
      </DialogActions>
        </Dialog>
    )
  );
};

export default AlgorithmDialogAdd;