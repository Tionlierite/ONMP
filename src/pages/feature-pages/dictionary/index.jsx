import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, InputBase } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

import { categoryData } from './mockData-category';
import { articleContent } from './mockData-article';

import './DictionaryPage.css';

const DictionaryPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [expandedAccordions, setExpandedAccordions] = useState([]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    const filteredAccordions = categoryData
      .filter((category) =>
        category.title.some((title) =>
          title.toLowerCase().includes(value.toLowerCase())
        )
      )
      .map((category) => category.category);

    setExpandedAccordions(filteredAccordions);
  };

  const handleAccordionChange = (category) => (event, isExpanded) => {
    if (isExpanded) {
      setExpandedAccordions((prevAccordions) => [...prevAccordions, category]);
    } else {
      setExpandedAccordions((prevAccordions) =>
        prevAccordions.filter((accordion) => accordion !== category)
      );
    }
  };

  const handleItemClick = (category, title, event) => {
    const foundArticle = articleContent.find(
      (item) => item.category === category && item.title === title
    );

    event.preventDefault();
    let articleUrl = null;

    if (foundArticle) {
      articleUrl = `/dictionary/article/${title}`;
    } else {
      articleUrl = "/dictionary/article-not-found";
    }
    
    window.open(articleUrl, "_blank");
  };

  const handleToggleAllAccordions = () => {
    if (expandedAccordions.length === categoryData.length) {
      setExpandedAccordions([]);
    } else {
      setExpandedAccordions(categoryData.map((category) => category.category));
    }
  };

  const filteredCategoryData = categoryData.map((category) => {
    const filteredTitles = category.title.filter((title) =>
      title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return {
      ...category,
      title: filteredTitles,
    };
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
            {expandedAccordions.length === categoryData.length ? 'Закрыть все' : 'Открыть/Закрыть все'}
          </Button>
        </div>
      </div>

      <div className="accordion-container">
        {filteredCategoryData.map((category) => (
          <Accordion
            key={category.category}
            expanded={expandedAccordions.includes(category.category)}
            onChange={handleAccordionChange(category.category)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {category.category}
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {category.title.map((title) => (
                  <li 
                    key={title}
                    onClick={(event) =>
                      handleItemClick(category.category, title, event)
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
        ))}
      </div>
    </div>
  );
};

export default DictionaryPage;