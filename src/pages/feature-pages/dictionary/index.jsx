import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, Button, InputBase } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

import './DictionaryPage.css';

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

  const handleAccordionChange = (tag) => (event, isExpanded) => {
    const isFilteredAccordion = expandedAccordions.includes(tag);

    if (isExpanded && !isFilteredAccordion) {
      setExpandedAccordions((prevAccordions) => [...prevAccordions, tag]);
    } else if (!isExpanded && isFilteredAccordion) {
      setExpandedAccordions((prevAccordions) =>
        prevAccordions.filter((accordion) => accordion !== tag)
      );
    }

    const filteredTitles = Object.keys(apiData)
      .filter((key) => key.toLowerCase().includes(searchValue.toLowerCase()))
      .filter((key) => apiData[key].tag === tag && key.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredTitles(filteredTitles);
  };

  const handleItemClick = (tag, title, event) => {
    event.preventDefault();

    const articleData = {
      tag: apiData[title].tag,
      title: title,
      description: apiData[title].description,
      symptomps: apiData[title].symptomps,
      period: apiData[title].period,
      forms: apiData[title].forms,
      formDescriptions: apiData[title]['form descriptions'],
      formSymptoms: apiData[title]['form symptomps'],
    };
  
    if (apiData[title]) {
      sessionStorage.setItem('articleData', JSON.stringify(articleData));
      const url = `/dictionary/article/${encodeURIComponent(title)}`;
  
      window.open(url, '_blank');
    } else {
      history.push('/dictionary/article-not-found');
    }
  };  

  const handleToggleAllAccordions = () => {
    if (expandedAccordions.length === Object.keys(apiData).length) {
      setExpandedAccordions([]);
    } else {
      setExpandedAccordions(Object.keys(apiData).map((key) => apiData[key].tag));
    }

    const filteredTitles = Object.keys(apiData)
      .filter((key) => key.toLowerCase().includes(searchValue.toLowerCase()))
      .filter((key) => expandedAccordions.includes(apiData[key].tag) && key.toLowerCase().includes(searchValue.toLowerCase()));
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
          <InputBase
            className="search-input"
            placeholder="Поиск по названию статьи"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <SearchIcon />
          <Button onClick={handleToggleAllAccordions}>
            {expandedAccordions.length === Object.keys(apiData).length ? 'Закрыть все' : 'Открыть/Закрыть все'}
          </Button>
        </div>
      </div>

      {searchQuery && (
        <div className="search-redirect">
          Поиск по справочнику MSD (переход на сторонний сайт):{" "}
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
                {item.tag}
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
                      <a
                        href={`/dictionary/article/${title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {title}
                      </a>
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