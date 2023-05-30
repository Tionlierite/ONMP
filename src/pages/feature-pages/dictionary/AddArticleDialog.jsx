import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const AddArticleDialog = ({
  open,
  handleClose,
  handleInputChange,
  handleAddArticle,
  newArticleData,
  errors
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Добавить статью</DialogTitle>
      <DialogContent>
          <DialogContentText>
            Заполните данные для добавления новой статьи.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="category"
            label="Категория"
            type="text"
            value={newArticleData.category}
            onChange={handleInputChange}
            fullWidth
            error={errors.category}
            helperText={errors.category ? 'Пожалуйста, заполните категорию' : ''}
          />
          <TextField
            margin="dense"
            name="title"
            label="Название"
            type="text"
            value={newArticleData.title}
            onChange={handleInputChange}
            fullWidth
            error={errors.title}
            helperText={errors.title ? 'Пожалуйста, заполните название' : ''}
          />
          <TextField
            margin="dense"
            name="description"
            label="Описание"
            type="text"
            value={newArticleData.description}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="symptoms"
            label="Симптомы (через ;)"
            type="text"
            value={newArticleData.symptoms}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="period"
            label="Период"
            type="text"
            value={newArticleData.period}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="forms"
            label="Формы (через ;)"
            type="text"
            value={newArticleData.forms}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="formDescriptions"
            label="Описания форм (через ;)"
            type="text"
            value={newArticleData.formDescriptions}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="formSymptoms"
            label="Симптомы форм (через ;)"
            type="text"
            value={newArticleData.formSymptoms}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleAddArticle}>Добавить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddArticleDialog;