import React from 'react';
import { useParams } from 'react-router-dom';

import { articleContent } from './mockData-article';

import './DictionaryPage.css';

const ArticlePage = ( ) => {
  const { title } = useParams();

  const article = articleContent.find((item) => item.title === title);

  if (!article) {
    return (
      <div className="page-content">
        <h2>Статья не найдена</h2>
        <p>Данная статья еще не добавлена в справочник.</p>
      </div>
    );
  }

  const { definition, symptoms } = article;

  return (
    <div className="page-content">
      <h2>{title}</h2>
      <p>{definition}</p>
      <ul>
        {symptoms.map((symptom, index) => (
          <li key={index}>{symptom}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlePage;