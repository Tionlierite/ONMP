import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, Button, InputBase, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import ClearIcon from '@mui/icons-material/Clear';

import './DictionaryPage.css';
import { createArticleData } from './ArticleModel';

const DictionaryPage = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [expandedAccordions, setExpandedAccordions] = useState([]);
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://188.225.78.148/api/v1/diseases/get_diseases/', {
          headers: {
            accept: 'application/json',
            'X-CSRFToken': 'bg10WExF4otp0fZDnqm164FY4XDFKQpNYT2pJplkvz3zozYHZXWS3VVd3CkzTfRP',
          },
        });
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

    const filteredTitles = Object.keys(apiData)
      .filter((key) => key.toLowerCase().includes(value.toLowerCase()));

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
          (isExpanded && accordionTag === tag)
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
            {expandedAccordions.length === Object.keys(apiData).length ? <UnfoldLessIcon className="search-icon"/> : <UnfoldMoreIcon className="search-icon"/>}
          </Button>
        </div>
      </div>

      {searchQuery && (
        <div className="search-redirect">
          Поиск по справочнику MSD (переход на сторонний сайт):{' '}
          <Link
            to={`https://www.msdmanuals.com/ru-ru/профессиональный/SearchResults?query=${encodeURIComponent(
              searchQuery
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {searchQuery}
          </Link>
        </div>
      )}

      <div className="accordion-container">
        {filteredMockData.map((item) => {
          const isFilteredAccordion = expandedAccordions.includes(item.tag);
          const isAccordionVisible =
            !searchValue.toLowerCase() ||
            item.titles.some((title) => filteredTitles.includes(title));

          const filteredTitlesInAccordion = item.titles.filter((title) =>
            filteredTitles.includes(title)
          );

          return (
            <Accordion
              key={item.tag}
              expanded={isFilteredAccordion}
              onChange={handleAccordionChange(item.tag)}
              hidden={!isAccordionVisible}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <strong>{item.tag}</strong>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {filteredTitlesInAccordion.map((title) => (
                    <li
                      key={title}
                      onClick={(event) =>
                        handleItemClick(item.tag, title, event)
                      }
                    >
                      <span className="accordion-details-list">{title}</span>
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default DictionaryPage;