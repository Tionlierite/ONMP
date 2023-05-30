import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';

const EditArticleDialog = ({
    open,
    handleClose,
    handleEditInputChange,
    handleEditArticle,
    editArticleData,
    errors,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Редактировать статью</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Измените данные статьи.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        name="category"
        label="Категория"
        type="text"
        value={editArticleData.category}
        onChange={handleEditInputChange}
        fullWidth
        error={errors.category}
        helperText={errors.category ? 'Пожалуйста, заполните категорию' : ''}
      />
      <TextField
        margin="dense"
        name="title"
        label="Название"
        type="text"
        value={editArticleData.title}
        onChange={handleEditInputChange}
        fullWidth
        error={errors.title}
        helperText={errors.title ? 'Пожалуйста, заполните название' : ''}
      />
      <TextField
        margin="dense"
        name="description"
        label="Описание"
        type="text"
        multiline
        rows={4}
        value={editArticleData.description}
        onChange={handleEditInputChange}
        fullWidth
      />
      <TextField
        margin="dense"
        name="symptoms"
        label="Симптомы"
        type="text"
        value={editArticleData.symptoms}
        onChange={handleEditInputChange}
        fullWidth
      />
      <TextField
        margin="dense"
        name="period"
        label="Период"
        type="text"
        value={editArticleData.period}
        onChange={handleEditInputChange}
        fullWidth
      />
      <TextField
        margin="dense"
        name="forms"
        label="Формы"
        type="text"
        value={editArticleData.forms}
        onChange={handleEditInputChange}
        fullWidth
      />
      <TextField
        margin="dense"
        name="formDescriptions"
        label="Описания форм"
        type="text"
        multiline
        rows={4}
        value={editArticleData.formDescriptions}
        onChange={handleEditInputChange}
        fullWidth
      />
      <TextField
        margin="dense"
        name="formSymptoms"
        label="Симптомы форм"
        type="text"
        multiline
        rows={4}
        value={editArticleData.formSymptoms}
        onChange={handleEditInputChange}
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Отмена
      </Button>
      <Button onClick={handleEditArticle} color="primary">
        Сохранить
      </Button>
    </DialogActions>
  </Dialog>
  );
};

export default EditArticleDialog;