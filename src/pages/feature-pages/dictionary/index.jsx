import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  InputBase,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import './DictionaryPage.css';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import AddArticleDialog from './AddArticleDialog';
import EditArticleDialog from './EditArticleDialog';
import { createArticleData } from './ArticleModel';

const DictionaryPage = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [expandedAccordions, setExpandedAccordions] = useState([]);
  const [apiData, setApiData] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteArticleTitle, setDeleteArticleTitle] = useState('');
  const [addArticleOpen, setAddArticleOpen] = useState(false);
  const [newArticleData, setNewArticleData] = useState({
    category: '',
    title: '',
    description: '',
    symptoms: '',
    period: '',
    forms: '',
    formDescriptions: '',
    formSymptoms: '',
  });
  const [errors, setErrors] = useState({
    category: false,
    title: false,
  });
  const [editArticleErrors, setEditArticleErrors] = useState({
    category: false,
    title: false,
  });;
  const [editArticleOpen, setEditArticleOpen] = useState(false);
  const [editArticleData, setEditArticleData] = useState({
    category: '',
    title: '',
    description: '',
    symptoms: '',
    period: '',
    forms: '',
    formDescriptions: '',
    formSymptoms: '',
  });
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://apu-hd.fun/api/v1/diseases/get_diseases/',
          {
            headers: {
              accept: 'application/json',
              'X-CSRFToken': 'FtJWOFXABsp47XlnfediBKT2ReP83UEOoujvNZLjjzCcbF7iHAKlHesnsWtl33Sg',
            },
          }
        );
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setSearchQuery(value);

    const filteredAccordions = Object.keys(apiData)
      .filter((key) => key.toLowerCase().includes(value.toLowerCase()))
      .map((key) => apiData[key].tag);

    const filteredTitles = Object.keys(apiData).filter((key) =>
      key.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredTitles(filteredTitles);
    setExpandedAccordions(filteredAccordions);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setSearchQuery('');
    setFilteredTitles([]);
    setExpandedAccordions([]);
  };

  const handleAccordionChange = (tag) => (event, isExpanded) => {
    const isFilteredAccordion = expandedAccordions.includes(tag);
    let updatedAccordions = [];

    if (isExpanded && !isFilteredAccordion) {
      updatedAccordions = [...expandedAccordions, tag];
    } else if (!isExpanded && isFilteredAccordion) {
      updatedAccordions = expandedAccordions.filter(
        (accordion) => accordion !== tag
      );
    }

    setExpandedAccordions(updatedAccordions);

    const filteredTitles = Object.keys(apiData)
      .filter((key) => key.toLowerCase().includes(searchValue.toLowerCase()))
      .filter((key) => {
        const accordionTag = apiData[key].tag;
        return (
          (expandedAccordions.includes(accordionTag) &&
            key.toLowerCase().includes(searchValue.toLowerCase())) ||
          (!isExpanded && accordionTag === tag)
        );
      });

    setFilteredTitles(filteredTitles);
  };

  const handleItemClick = (tag, title, event) => {
    event.preventDefault();
    const articleData = createArticleData(title, apiData);

    if (apiData[title]) {
      sessionStorage.setItem('articleData', JSON.stringify(articleData));
      const url = `/dictionary/article/${encodeURIComponent(title)}`;

      const newWindow = window.open(url, '_blank');
      newWindow.opener = null;
    } else {
      history.push('/dictionary/article-not-found');
    }
  };

  const handleToggleAllAccordions = () => {
    const allAccordionsOpen = expandedAccordions.length === Object.keys(apiData).length;

    if (allAccordionsOpen) {
      setExpandedAccordions([]);
    } else {
      setExpandedAccordions(Object.keys(apiData).map((key) => apiData[key].tag));
    }

    const filteredTitles = Object.keys(apiData)
      .filter((key) => key.toLowerCase().includes(searchValue.toLowerCase()))
      .filter((key) => {
        const accordionTag = apiData[key].tag;
        return (
          (expandedAccordions.includes(accordionTag) &&
            key.toLowerCase().includes(searchValue.toLowerCase())) ||
          (!allAccordionsOpen && accordionTag === apiData[key].tag)
        );
      });

    setFilteredTitles(filteredTitles);
  };

  const handleDeleteArticle = (title) => {
    const updatedApiData = { ...apiData };
    delete updatedApiData[title];
    setApiData(updatedApiData);

    const updatedFilteredTitles = filteredTitles.filter((t) => t !== title);
    setFilteredTitles(updatedFilteredTitles);
  };

  const handleOpenDeleteConfirmation = (title) => {
    setDeleteArticleTitle(title);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteArticleTitle('');
    setDeleteConfirmationOpen(false);
  };

  const handleConfirmDeleteArticle = () => {
    handleDeleteArticle(deleteArticleTitle);
    handleCloseDeleteConfirmation();
  };

  const handleOpenAddArticle = () => {
    setNewArticleData({
      category: '',
      title: '',
      description: '',
      symptoms: '',
      period: '',
      forms: '',
      formDescriptions: '',
      formSymptoms: '',
    });
    setAddArticleOpen(true);
  };

  const handleCloseAddArticle = () => {
    setAddArticleOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'category' || name === 'title') {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setNewArticleData((prevData) => ({
        ...prevData,
        [name]: capitalizedValue,
      }));
    } else {
      setNewArticleData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === '',
    }));
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.category.trim()) {
      errors.category = true;
    }
    if (!data.title.trim()) {
      errors.title = true;
    }
    return errors;
  };
  
  const handleOpenEditArticle = (title) => {
    const articleData = apiData[title];
  
    setEditingTitle(title);
    setEditArticleData({
      category: articleData.tag,
      title: title,
      description: articleData.description,
      symptoms: articleData.symptomps.join(', '),
      period: articleData.period,
      forms: articleData.forms.join(', '),
      formDescriptions: articleData['form descriptions'].join(', '),
      formSymptoms: articleData['form symptomps'].join(', '),
    });
    setEditArticleOpen(true);
  };
  
  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'category' || name === 'title') {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setEditArticleData((prevData) => ({
        ...prevData,
        [name]: capitalizedValue,
      }));
    } else {
      setEditArticleData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setEditArticleErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === '',
    }));
  };  

  const handleCloseEditArticle = () => {
    setEditArticleOpen(false);
  };
  
  const handleEditArticle = () => {
    const validationErrors = validateForm(editArticleData);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      const { category, title, description, symptoms, period, forms, formDescriptions, formSymptoms } = editArticleData;
      
      const updatedApiData = {
        ...apiData,
        [title]: {
          tag: category,
          description,
          period,
          symptomps: symptoms ? symptoms.split(",").map((item) => item.trim()) : [],
          forms: forms ? forms.split(",").map((item) => item.trim()) : [],
          "form descriptions": formDescriptions ? formDescriptions.split(",").map((item) => item.trim()) : [],
          "form symptomps": formSymptoms ? formSymptoms.split(",").map((item) => item.trim()) : [],
        },
      };
  
      setApiData(updatedApiData);
      handleCloseEditArticle();
    }
  };

  const handleAddArticle = () => {
    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors && newArticleData.title && newArticleData.category) {
      const {
        category,
        title,
        description,
        symptoms,
        period,
        forms,
        formDescriptions,
        formSymptoms,
      } = newArticleData;
    
      const updatedApiData = {
        ...apiData,
        [title]: {
          tag: category,
          description,
          period,
          symptomps: symptoms ? symptoms.split(",").map((item) => item.trim()) : [],
          forms: forms ? forms.split(",").map((item) => item.trim()) : [],
          "form descriptions": newArticleData.formDescriptions
            ? newArticleData.formDescriptions.split(",").map((item) => item.trim())
            : [],
            "form symptomps": newArticleData.formSymptoms
            ? newArticleData.formSymptoms.split(",").map((item) => item.trim())
            : [],
        },
      };
    
      setApiData(updatedApiData);
      setAddArticleOpen(false);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: !newArticleData.title,
        category: !newArticleData.category,
      }));
    }
  };  

  const filteredMockData = [];

  Object.keys(apiData).forEach((key) => {
    const tag = apiData[key].tag;
    const title = key;

    const foundCategory = filteredMockData.find((item) => item.tag === tag);

    if (foundCategory) {
      foundCategory.titles.push(title);
    } else {
      filteredMockData.push({
        tag: tag,
        titles: [title],
      });
    }
  });

  return (
    <div className="dictionary-page">
      <div className="search-bar">
        <div className="search-bar-inner">
          <SearchIcon />
          <InputBase
            className="search-input"
            placeholder="Поиск по названию статьи"
            value={searchValue}
            onChange={handleSearchChange}
          />
          {searchValue && (
            <IconButton onClick={handleClearSearch}>
              <ClearIcon />
            </IconButton>
          )}
          <Button onClick={handleToggleAllAccordions}>
            {expandedAccordions.length === Object.keys(apiData).length ? (
              <UnfoldLessIcon className="search-icon" />
            ) : (
              <UnfoldMoreIcon className="search-icon" />
            )}
          </Button>
          <Button onClick={handleOpenAddArticle}>
            <AddIcon htmlColor="#3B3B3B" />
          </Button>
        </div>
      </div>
      {searchQuery && (
        <div className="search-redirect">
          Поиск по справочнику MSD (переход на сторонний сайт):{' '}
          <a
            href={`https://www.msdmanuals.com/ru-ru/профессиональный/SearchResults?query=${encodeURIComponent(
              searchQuery
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {searchQuery}
          </a>
        </div>
      )}
      <div className="accordion-container">
        {filteredMockData.map((category) => (
          <Accordion
            key={category.tag}
            expanded={expandedAccordions.includes(category.tag)}
            onChange={handleAccordionChange(category.tag)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {category.tag}
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {category.titles
                  .filter((title) =>
                    title.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((title) => (
                    <li key={title}>
                      <Link 
                        to="#"
                        onClick={(event) =>
                          handleItemClick(category.tag, title, event)
                        }
                      >
                        <span className="accordion-details-list">{title}</span>
                      </Link>
                      <IconButton
                        edge="end"
                        onClick={() => handleOpenEditArticle(title)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleOpenDeleteConfirmation(title)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </li>
                  ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <AddArticleDialog
        open={addArticleOpen}
        handleClose={handleCloseAddArticle}
        handleInputChange={handleInputChange}
        handleAddArticle={handleAddArticle}
        newArticleData={newArticleData}
        errors={errors}
      />
      <DeleteConfirmationDialog
          open={deleteConfirmationOpen}
          handleClose={handleCloseDeleteConfirmation}
          handleConfirmDelete={handleConfirmDeleteArticle}
          deleteArticleTitle={deleteArticleTitle}
      />
      <EditArticleDialog
          open={editArticleOpen}
          handleClose={handleCloseEditArticle}
          handleEditInputChange={handleEditInputChange}
          handleEditArticle={handleEditArticle}
          editArticleData={editArticleData}
          errors={editArticleErrors}
      />
    </div>
  );
};

export default DictionaryPage;